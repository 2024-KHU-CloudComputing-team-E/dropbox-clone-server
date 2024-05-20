import express from "express";
import google from "../env/google.js";
import googleController from "../controllers/googleController.js";

const googleRouter = express.Router();

googleRouter.get("/google", (req, res) => {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=${google.GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${google.GOOGLE_REDIRECT_URI}`;
  url += "&response_type=code";
  url += "&scope=email profile";
  res.redirect(url);
});

googleRouter.get("/google/redirect", async (req, res) => {
  const { code } = req.query;
  const token = await googleController.getToken(code);
  const userinfo = await googleController.getUserinfoByToken(
    token.access_token
  );
  const jwt = await googleController.verifyUser(userinfo);
  res.cookie("x_auth", jwt).send("ok");
});

export default googleRouter;

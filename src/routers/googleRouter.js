// '/api/login'

import express from "express";
import googleController from "../controllers/googleController.js";

const googleRouter = express.Router();

googleRouter.get("/google", (req, res) => {
  const url = googleController.getGoogleAuthURL();
  return res.redirect(url);
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

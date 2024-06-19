// '/api/login'

import express from "express";
import googleController from "../controllers/googleController.js";

const googleRouter = express.Router();

googleRouter.get("/google", (req, res) => {
  try {
    const url = googleController.getGoogleAuthURL();
    return res.redirect(url);
  } catch (err) {
    res.send(err);
  }
});

googleRouter.get("/google/redirect", async (req, res) => {
  try {
    const { code } = req.query;
    const token = await googleController.getToken(code);
    const userinfo = await googleController.getUserinfoByToken(
      token.access_token
    );
    const user = await googleController.verifyUser(userinfo);
    res.cookie("x_auth", user.token).redirect(`/${user.userId}`);
  } catch (err) {
    res.send(err);
  }
});

export default googleRouter;

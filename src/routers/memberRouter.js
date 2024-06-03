import express from "express";
import auth from "../middleware/auth.js";
import memberController from "../controllers/memberController.js";
import cookieParser from "cookie-parser";

const memberRouter = express.Router();
memberRouter.use(cookieParser());

memberRouter.get("/logined", auth, async (req, res) => {
  const object = await memberController.getUserinfoWithToken(req.user.token);
  if (!object) {
    res.send("로그인이 안되어있음");
  } else {
    res.send(object);
  }
});

memberRouter.get("/", (req, res) => {});

export default memberRouter;

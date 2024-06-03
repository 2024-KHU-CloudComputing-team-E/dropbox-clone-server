import express from "express";
import auth from "../middleware/auth.js";
import memberController from "../controllers/memberController.js";
import cookieParser from "cookie-parser";

const memberRouter = express.Router();
memberRouter.use(cookieParser());

memberRouter.get("/logined", auth, async (req, res) => {
  res.send(req.user);
});

memberRouter.get("/:id", async (req, res) => {
  const userinfo = await memberController.getUserinfoById(req.params.id);
  if (!userinfo) {
    res.send({ msg: "그러한 유저가 없습니다~~~" });
  } else {
    res.send(userinfo);
  }
});

export default memberRouter;

import express from "express";

const logoutRouter = express.Router();

logoutRouter.get("/", (req, res) => {
  try {
    res.clearCookie("x_auth");
    res.status(200).send("로그아웃 완료");
  } catch (error) {
    next(error);
  }
});

export default logoutRouter;

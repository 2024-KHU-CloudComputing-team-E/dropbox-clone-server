import express from "express";
import commentController from "../controllers/commentController.js";
import auth from "../middleware/auth.js";
import cookieParser from "cookie-parser";

const commentRouter = express.Router();
commentRouter.use(cookieParser());

commentRouter.post("/create", auth, async (req, res) => {
  const data = { author: req.user.id, content: req.body.content };
  await commentController.postComment(data);
  res.send(data);
});

commentRouter.post("/update", auth, async (req, res) => {
  commentController.updateComment(req.body.id, req.body.content);
  res.send("ok");
});

commentRouter.post("/delete", auth, async (req, res) => {
  commentController.deleteComment(req.body.id);
  res.send("ok");
});

export default commentRouter;

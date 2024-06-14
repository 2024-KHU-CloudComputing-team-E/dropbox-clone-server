import express from "express";
import commentController from "../controllers/commentController.js";
import auth from "../middleware/auth.js";
import cookieParser from "cookie-parser";

const commentRouter = express.Router();
commentRouter.use(cookieParser());

commentRouter.post("/", auth, async (req, res) => {
  const data = {
    author: req.user.id,
    fileId: req.body.fileId,
    comment: req.body.comment,
  };
  await commentController.postComment(data);
  res.send(data);
});

commentRouter.patch("/", auth, async (req, res) => {
  await commentController.updateComment(req.body.fileId, req.body.content);
  res.send("ok");
});

commentRouter.delete("/", auth, async (req, res) => {
  await commentController.deleteComment(req.body.fileId);
  res.send("ok");
});

export default commentRouter;

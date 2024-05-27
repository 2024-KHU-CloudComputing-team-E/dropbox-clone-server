import express from "express";
import commentController from "../controllers/commentController.js";
import auth from "../middleware/auth.js";
import cookieParser from "cookie-parser";

const commentRouter = express.Router();
commentRouter.use(cookieParser());

commentRouter.post("/create", auth, async (req, res) => {
  const data = { author: req.user[0].id, content: req.body.data };
  await commentController.postComment(data);
  res.send(data);
});

commentRouter.post("/update", auth, async (req, res) => {
  const data = { author: req.user.id, content: req.body.data };
  await commentController.postComment(data);
  res.send(data);
});

commentRouter.post("/delete", () => {});

export default commentRouter;

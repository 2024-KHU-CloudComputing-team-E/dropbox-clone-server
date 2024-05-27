import express from "express";
import commentController from "../controllers/commentController.js";
import auth from "../middleware/auth.js";
import cookieParser from "cookie-parser";

const commentRouter = express.Router();
commentRouter.use(cookieParser());

commentRouter.post("/create", auth, async (req, res) => {
  const data = { author: req.user, content: req.body };
  await commentController.postComment(data);
  res.send(data);
});

commentRouter.get("/read", async () => {});

commentRouter.post("/update", async () => {});

commentRouter.post("/delete", () => {});

export default commentRouter;

import express from "express";
import commentController from "../controllers/commentController";
import auth from "../middleware/auth";

const commentRouter = express.Router();

commentRouter.post("/create", auth, async (req, res) => {
  commentController();
});

commentRouter.get("/read", async () => {});

commentRouter.post("/update", async () => {});

commentRouter.post("/delete", () => {});

export default commentRouter;

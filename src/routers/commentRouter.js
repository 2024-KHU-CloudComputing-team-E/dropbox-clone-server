import express from "express";

const commentRouter = express.Router();

commentRouter.post("/create", async () => {});

commentRouter.get("/read", async () => {});

commentRouter.post("/update", async () => {});

commentRouter.post("/delete", () => {});

export default commentRouter;

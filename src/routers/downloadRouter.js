import express from "express";

import connectDB from "../config/mongoClient.js";

const db = await connectDB();

const downloadRouter = express.Router();

downloadRouter.get("/", async (req, res) => {
  console.log(req.query);
});

export default downloadRouterRouter;

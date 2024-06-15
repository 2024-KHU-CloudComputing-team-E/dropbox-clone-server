import express from "express";

const downloadRouter = express.Router();

downloadRouter.get("/", async (req, res) => {
  console.log(req.query);
});

export default downloadRouter;

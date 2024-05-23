import express from "express";
import memberController from "../controllers/memberController.js";

const memberRouter = express.Router();

member.get("/", async (req, res) => {
  const object = await memberController(req.params.email);
  res.send(object);
});

export default memberRouter;

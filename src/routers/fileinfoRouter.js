import express from "express";
import File from "../schemas/file.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

const fileinfoRouter = express.Router();

fileinfoRouter.get("/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  const objectId = new ObjectId(fileId);
  const file = await File.findOne({ _id: objectId });
  res.send(file);
});

export default fileinfoRouter;

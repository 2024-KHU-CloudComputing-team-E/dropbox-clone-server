import express from "express";
import File from "../schemas/file.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

const fileinfoRouter = express.Router();

fileinfoRouter.get("/:fileId", async (req, res) => {
  console.log("fileID 내노셈");
  const fileId = req.params.fileId;
  const objectId = new ObjectId(fileId);
  const file = await File.findOne({ _id: objectId });
  console.log(file);
  res.send(file);
});

export default fileinfoRouter;

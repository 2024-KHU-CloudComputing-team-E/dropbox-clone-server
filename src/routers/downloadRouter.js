import express from "express";
import File from "../schemas/file.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

const downloadRouter = express.Router();

downloadRouter.get("/", async (req, res) => {
  const fileId = req.query.fileId;
  console.log("fileID 내노셈");
  const objectId = new ObjectId(fileId);
  const file = await File.findOne({ _id: objectId });
  console.log(file.url);
  res.send({ fileUrl: file.url });
});

export default downloadRouter;

import express from "express";
import uploadController from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/",
  uploadController.upload.single("file1"),
  uploadController.uploadFile
);

export default uploadRouter;
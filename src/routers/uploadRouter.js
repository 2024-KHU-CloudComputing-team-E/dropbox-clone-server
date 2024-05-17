import express from "express";
import uploadController from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/file",
  uploadController.upload.single("file"),
  uploadController.uploadFile
);

export default uploadRouter;

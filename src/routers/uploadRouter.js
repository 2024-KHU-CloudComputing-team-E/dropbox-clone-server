import express from "express";
import uploadController from "../controllers/uploadController.js";
import auth from "../middleware/auth.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/file",
  auth,
  uploadController.upload.single("file"),
  uploadController.uploadFile
);

export default uploadRouter;

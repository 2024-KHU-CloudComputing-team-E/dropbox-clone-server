import express from "express";
import uploadController from "../controllers/uploadController.js";
import auth from "../middleware/auth.js";
import cookieParser from "cookie-parser";

const uploadRouter = express.Router();
uploadRouter.use(cookieParser());

uploadRouter.post(
  "/file",
  auth,
  uploadController.upload.single("file"),
  uploadController.uploadFile
);

uploadRouter.post(
  "/file/ai",
  auth,
  uploadController.localUpload.single("file"),
  uploadController.localuploadFile
);

export default uploadRouter;

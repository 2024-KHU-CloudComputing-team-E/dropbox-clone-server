import express from "express";
import flaskController from "../controllers/flaskController.js";

const flaskRouter = express.Router();

flaskRouter.post(
  "/",
  flaskController.upload.single("file"),
  flaskController.uploadFile
);

export default flaskRouter;

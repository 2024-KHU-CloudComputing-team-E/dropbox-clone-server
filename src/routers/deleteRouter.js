import express from "express";
import {
  moveFileToRecycleBin,
  deleteFileOnRecycleBin,
  deleteFileAndDocumentAll,
  restore,
} from "../controllers/deleteController.js";
import cookieParser from "cookie-parser";
const deleteRouter = express.Router();
deleteRouter.use(cookieParser);

deleteRouter.post("/moveFileToRecycleBin/:fileId", moveFileToRecycleBin);
deleteRouter.post("/deleteFileOnRecycleBin/:fileId", deleteFileOnRecycleBin);
deleteRouter.post("/deleteAll", deleteFileAndDocumentAll);
deleteRouter.post("/restore/:fileId", restore);

export default deleteRouter;

import express from "express";
import {
  moveFileToRecycleBin,
  deleteFileOnRecycleBin,
  deleteFileAndDocumentAll,
  restore,
} from "../controllers/deleteController.js";
import cookieParser from "cookie-parser";
import auth from "../middleware/auth.js";
const deleteRouter = express.Router();
deleteRouter.use(cookieParser());

deleteRouter.post("/moveFileToRecycleBin/:fileId", auth, moveFileToRecycleBin);
deleteRouter.post(
  "/deleteFileOnRecycleBin/:fileId",
  auth,
  deleteFileOnRecycleBin
);
deleteRouter.post("/deleteAll", auth, deleteFileAndDocumentAll);
deleteRouter.post("/restore/:fileId", auth, restore);

export default deleteRouter;

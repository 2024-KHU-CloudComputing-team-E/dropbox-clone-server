import express from "express";
import { moveFileToRecycleBin, deleteFileOnRecycleBin, deleteFileAndDocumentAll, restore } from "../controllers/deleteController.js";
const deleteRouter = express.Router();

deleteRouter.post('/moveFileToRecycleBin', moveFileToRecycleBin);
deleteRouter.post('/deleteFileOnRecycleBin', deleteFileOnRecycleBin);
deleteRouter.post('/deleteAll', deleteFileAndDocumentAll);
deleteRouter.post('/restore', restore);

export default deleteRouter;
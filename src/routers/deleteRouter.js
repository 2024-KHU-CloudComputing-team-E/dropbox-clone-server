import express from "express";
import { moveFileToRecycleBin, deleteFileOnRecycleBin } from "../controllers/deleteController.js";
const deleteRouter = express.Router();

deleteRouter.post('/api/deletefile/moveFileToRecycleBin', moveFileToRecycleBin);
deleteRouter.post('/api/deletefile/deleteFileOnRecycleBin', deleteFileOnRecycleBin);

export default deleteRouter;
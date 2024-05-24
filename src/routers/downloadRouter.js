import express from "express";
import downloadController from "../controllers/downloadController.js";
const downloadRouter = express.Router();

downloadRouter.get('/api/downloadfile', downloadController.downloadFile);

export default downloadRouter;
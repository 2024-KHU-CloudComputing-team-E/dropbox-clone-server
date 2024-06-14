import express from "express";
import getBinImages from "../controllers/binScrollController.js";
const binScrollRouter = express.Router();

binScrollRouter.get('/', getBinImages);

export default binScrollRouter;
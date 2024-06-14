import express from "express";
import getUserImages from "../controllers/mainScrollController.js";
const mainScrollRouter = express.Router();

mainScrollRouter.get("/", getUserImages);

export default mainScrollRouter;

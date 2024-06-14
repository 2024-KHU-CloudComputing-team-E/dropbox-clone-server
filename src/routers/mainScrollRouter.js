import express from "express";
import getUserImages from "../controllers/mainScrollController.js";
const scrollRouter = express.Router();
const app = express();

mainScrollRouter.get('/', getUserImages);

export default mainScrollRouter;
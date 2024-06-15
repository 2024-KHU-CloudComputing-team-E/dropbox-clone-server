import express from "express";
import getBinImages from "../controllers/binScrollController.js";
import auth from "../middleware/auth.js";
const binScrollRouter = express.Router();

binScrollRouter.get('/', auth, getBinImages);

export default binScrollRouter;
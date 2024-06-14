import express from "express"
import flaskApiController from "../controllers/flaskApiController.js"

const flaskRouter = express.Router();

flaskRouter.post(
  flaskApiController.postTest
);

export default flaskRouter;
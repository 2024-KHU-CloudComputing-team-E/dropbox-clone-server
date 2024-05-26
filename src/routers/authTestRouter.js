import express from "express";
import auth from "../middleware/auth.js";
import cookieParser from "cookie-parser";

const testRouter = express.Router();
testRouter.use(cookieParser());

testRouter.get("/", auth, (req, res) => {
  res.send(req.user);
});

export default testRouter;

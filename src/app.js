//express 애플리케이션을 설정하는 파일
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRouter from "./routers/uploadRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/upload", uploadRouter);

export default app;

//express 애플리케이션을 설정하는 파일
import express from "express";
import cors from "cors";
import uploadRouter from "./routers/uploadRouter.js";
import downloadRouter from "./routers/downloadRouter.js";
import gooogleRouter from "./routers/googleRouter.js";
import logoutRouter from "./routers/logoutRouter.js";
import connectDB from "./config/mongodb.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 데이터베이스 연결 이거 수정해야함
connectDB()
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error("데이터베이스 연결 실패:", err);
  });

app.use("/api/upload", uploadRouter);
app.use("/api/downloadfile", downloadRouter);
app.use("/api/login", gooogleRouter);
app.use("/api/logout", logoutRouter);

export default app;

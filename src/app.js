import express from "express";
import uploadRouter from "./routers/uploadRouter.js";
import deleteRouter from "./routers/deleteRouter.js";
import commentRouter from "./routers/commentRouter.js";
import downloadRouter from "./routers/downloadRouter.js";
import googleRouter from "./routers/googleRouter.js";
import logoutRouter from "./routers/logoutRouter.js";
//import memberRouter from "./routers/memberRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/uploadfile", uploadRouter);
app.use("/api/deletefile", deleteRouter);
app.use("/api/comment", commentRouter);
app.use("/api/downloadfile", downloadRouter);
app.use("/api/login", googleRouter);
app.use("/api/logout", logoutRouter);
//app.use("/api/member", memberRouter);

export default app;

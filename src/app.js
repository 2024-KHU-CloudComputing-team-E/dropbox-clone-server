import express from "express";
import uploadRouter from "./routers/uploadRouter.js";
import googleRouter from "./routers/googleRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/login", googleRouter);
app.use("/api/uploadfile", uploadRouter);

export default app;

import express from "express";
import exampleRouter from "./routers/exampleRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import deleteRouter from "./routers/deleteRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", exampleRouter);
app.use("/api/uploadfile", uploadRouter);
app.use("/api/deletefile", deleteRouter);

module.exports = app;

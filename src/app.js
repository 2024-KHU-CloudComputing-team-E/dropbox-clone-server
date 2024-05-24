import express from "express";
import exampleRouter from "./routers/exampleRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import downloadRouter from "./routers/downloadRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", exampleRouter);
app.use("/api/uploadfile", uploadRouter);
app.use("/api/downloadfile", downloadRouter);

module.exports = app;
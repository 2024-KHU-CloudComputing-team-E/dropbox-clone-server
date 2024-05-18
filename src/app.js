import express from "express";
import exampleRouter from "./routers/exampleRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", exampleRouter);
app.use("/api/uploadfile", uploadRouter);

module.exports = app;

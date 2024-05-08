import express from "express";
import exampleRouter from "./routers/exampleRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", exampleRouter);

export default app;

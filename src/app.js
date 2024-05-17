const express = require("express");
const exampleRouter = require("./routers/exampleRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", exampleRouter);

module.exports = app;

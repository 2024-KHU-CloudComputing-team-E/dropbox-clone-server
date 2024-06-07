import app from "./app.js";
import path from "path";
import express from "express";
import uploadRouter from "./routers/uploadRouter.js";
import deleteRouter from "./routers/deleteRouter.js";
import commentRouter from "./routers/commentRouter.js";
import googleRouter from "./routers/googleRouter.js";
import logoutRouter from "./routers/logoutRouter.js";
import followFollowingRouter from "./routers/followFollowingRouter.js";
//import memberRouter from "./routers/memberRouter.js";

const __dirname = path.resolve();

app.use("/api/uploadfile", uploadRouter);
app.use("/api/deletefile", deleteRouter);
app.use("/api/comment", commentRouter);
app.use("/api/login", googleRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/user", memberRouter);
//app.use("/api/member", memberRouter);
app.use("/api/ff", followFollowingRouter);

// app.get("/", (req, res) => {
//   // res.send(`<a href="/api/login/google'>LogIn</a>
//   // `);
//   res.send(`<h1>Login</h2>
//   <a href='/api/login/google'>Login</a>
//   `);
// });

app.use(express.static(path.join(__dirname, "../dropbox-clone-client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../dropbox-clone-client/build/index.html")
  );
});
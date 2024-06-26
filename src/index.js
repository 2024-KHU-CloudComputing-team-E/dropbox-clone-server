import app from "./app.js";
import path from "path";
import express from "express";
import uploadRouter from "./routers/uploadRouter.js";
import deleteRouter from "./routers/deleteRouter.js";
import commentRouter from "./routers/commentRouter.js";
import googleRouter from "./routers/googleRouter.js";
import logoutRouter from "./routers/logoutRouter.js";
import followFollowingRouter from "./routers/followFollowingRouter.js";
import memberRouter from "./routers/memberRouter.js";
import mainScrollRouter from "./routers/mainScrollRouter.js";
import binScrollRouter from "./routers/binScrollRouter.js";
import downloadRouter from "./routers/downloadRouter.js";
import fileinfoRouter from "./routers/fileinfoRouter.js";
import searchRouter from "./routers/searchRouter.js";
import thumbnailRouter from "./routers/thumbnailRouter.js";

const __dirname = path.resolve();

app.use("/api/uploadFile", uploadRouter);
app.use("/api/deleteFile", deleteRouter);
app.use("/api/comments", commentRouter);
app.use("/api/login", googleRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/user", memberRouter);
app.use("/api/ff", followFollowingRouter);
app.use("/api/files", mainScrollRouter);
app.use("/api/RecycleBin", binScrollRouter);
app.use("/api/downloadFile", downloadRouter);
app.use("/api/file", fileinfoRouter);
app.use("/api/search", searchRouter);
app.use("/api/thumbnail", thumbnailRouter);

app.use(express.static(path.join(__dirname, "../dropbox-clone-client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../dropbox-clone-client/build/index.html")
  );
});

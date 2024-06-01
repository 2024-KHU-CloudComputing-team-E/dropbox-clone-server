import app from "./app.js";

import uploadRouter from "./routers/uploadRouter.js";
import deleteRouter from "./routers/deleteRouter.js";
import commentRouter from "./routers/commentRouter.js";
import googleRouter from "./routers/googleRouter.js";
import logoutRouter from "./routers/logoutRouter.js";
//import memberRouter from "./routers/memberRouter.js";

app.use("/api/uploadfile", uploadRouter);
app.use("/api/deletefile", deleteRouter);
app.use("/api/comment", commentRouter);
app.use("/api/login", googleRouter);
app.use("/api/logout", logoutRouter);
//app.use("/api/member", memberRouter);

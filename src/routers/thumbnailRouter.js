import express from "express";
import path from "path";
const __dirname = path.resolve();
const thumbnailRouter = express.Router();

thumbnailRouter.get("/", getUserImages);
thumbnailRouter.get("/:fileId", (req, res) => {
  const fileId = req.params.fileId;
  res.sendFile(path.join(__dirname, `./thumbnails/${fileId}.jpg`));
});

export default thumbnailRouter;

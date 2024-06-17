import express from "express";
import path from "path";
const __dirname = path.resolve();
const thumbnailRouter = express.Router();

thumbnailRouter.get("/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  console.log(fileName);
  res.sendFile(path.join(__dirname, `./thumbnails/${fileName + ext}`));
});

export default thumbnailRouter;

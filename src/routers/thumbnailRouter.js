import express from "express";
import path from "path";
const __dirname = path.resolve();
const thumbnailRouter = express.Router();

thumbnailRouter.get("/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const baseName = path.basename(fileName);

  console.log(fileName);
  res.sendFile(path.join(__dirname, `./thumbnails/${baseName}.jpg`));
});

export default thumbnailRouter;

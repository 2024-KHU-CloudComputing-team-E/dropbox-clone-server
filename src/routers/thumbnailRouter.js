import express from "express";
import path from "path";
import fs from "fs";
const __dirname = path.resolve();
const thumbnailRouter = express.Router();

thumbnailRouter.use(express.raw({ type: "image/jpeg", limit: "10mb" }));

thumbnailRouter.get("/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const ext = path.extname(fileName);
  const baseName = path.basename(fileName, ext);

  console.log(fileName);
  res.sendFile(path.join(__dirname, `./thumbnails/${baseName}.jpg`));
});

thumbnailRouter.post("/", (req, res) => {
  const imagePath = path.join(__dirname, `./thumbnails/${Date.now()}.jpg`);
  console.log(imagePath);
  console.log(req.body);
  fs.writeFile(imagePath, req.body, (err) => {
    if (err) {
      console.error("Error saving thumbnail:", err);
      return res.status(500).send("Error saving thumbnail");
    }

    res.status(200).send("Thumbnail saved");
  });
});

export default thumbnailRouter;

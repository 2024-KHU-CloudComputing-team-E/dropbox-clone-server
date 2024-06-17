import express from "express";
import path from "path";
const __dirname = path.resolve();
const thumbnailRouter = express.Router();

thumbnailRouter.get("/:fileName", (req, res) => {
  const ext = path.extname(req.params.fileName); // 파일 확장자
  const fileName = path.basename(
    Buffer.from(req.params.fileName, "latin1").toString("utf8"),
    ext
  );
  console.log(fileName);
  res.sendFile(path.join(__dirname, `./thumbnails/${fileName}`));
});

export default thumbnailRouter;

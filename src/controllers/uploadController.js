import File from "../schemas/file.js";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.js";
import flaskController from "../controllers/flaskController.js";

//s3에 원본파일 저장
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKETNAME,
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname); // 파일 확장자
      const baseName = path.basename(file.originalname, ext); // 원래 파일 이름
      const fileName = baseName /*+ "_" + Date.now()*/ + ext; // s3에 저장될 파일 이름
      //처음에 파일명 중복 제거하려고 Date.now() 추가했는데, 똑같은 이름의 파일을 중복을 구분하고 사용하는 경우가 없다고 판단하여 Date.now()를 더하는 부분을 주석 처리 했습니다.
      cb(null, fileName);
    },
  }),
});

const uploadController = {
  upload,
  uploadFile: async (req, res) => {
    console.log("req.file 확인 in uploadController : ", req.file);

    try {
      await flaskController.uploadFile(req.file);
      const newFile = new File({
        owner: req.user.userId,
        fileName:
          path.basename(
            req.file.originalname,
            path.extname(req.file.originalname)
          ) + path.extname(req.file.originalname),
        size: req.file.size,
        type: path.extname(req.file.originalname),
        url: req.file.location,
        aiType: "aiType임시값",
        createdAt: new Date(),
      });
      await newFile.save();
      res
        .status(201)
        .send("File uploaded in S3 and saved to mongodb successfully.");
    } catch (e) {
      console.log(e);
      res.status(500).send("server Error in uploadController : ", e);
    }
  },
};

export default uploadController;

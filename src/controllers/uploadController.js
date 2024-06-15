import File from "../schemas/file.js";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.js";
import { default as FormData } from "form-data";
import axios from "axios";
import User from "../schemas/user.js";

//s3에 원본파일 저장
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKETNAME,
    key: async function (req, file, cb) {
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
    const fileUrl = req.file.location;
    const response = await axios.get(fileUrl, {
      responseType: "stream", // 응답을 스트림 형태로 받기
    });
    const stream = response.data;
    const formData = new FormData();
    let ai_labels = "";
    formData.append("file", stream);
    const source = axios.CancelToken.source();
    const timeout = setTimeout(() => {
      source.cancel("Request timed out");
    }, 3000); // 5초 타임아웃 설정
    try {
      const flaskResponse = await axios.post(process.env.adrs, formData, {
        headers: {
          ...formData.getHeaders(),
          "Content-Type": "multipart/form-data",
        },
        cancelToken: source.token,
      });
      if (flaskResponse.data.ai_labels.length() > 0) {
        ai_labels = flaskResponse.data.ai_labels[0];
      }

      try {
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
          aiType: ai_labels,
          createdAt: new Date(),
        });
        await newFile.save();
        res.send("File uploaded in S3 and saved to mongodb successfully.");
      } catch (e) {
        console.log(e);
        res.send("server Error in uploadController : ", e);
      }
    } catch (e) {
      console.log("ai_connection_err");
      if (axios.isCancel(error)) {
        console.log("Request canceled:", e.message);
      } else {
        console.error("Error uploading file:", e);
      }
      try {
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
          aiType: "",
          createdAt: new Date(),
        });
        await newFile.save();
        await User.findOneAndUpdate(
          { userId: req.user.userId },
          { $set: { volume: req.user.volume + newFile.size } }
        );
        res.send("File uploaded in S3 and saved to mongodb successfully.");
      } catch (e) {
        console.log(e);
        res.send("server Error in uploadController : ", e);
      }
    } finally {
      clearTimeout(timeout); // 타임아웃 해제
    }
  },
};

export default uploadController;

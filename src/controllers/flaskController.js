import multer from "multer";
import axios from "axios";
import fs from "fs";
import path from "path";
import { default as FormData } from "form-data";

// 현재 로컬 환경 테스트로 uploads 폴더에 업로드 기능을 구현했지만 추후 s3저장소를 의미합니다.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const flaskController = {
  upload,
  uploadFile: async (file) => {
    try {
      // 플라스크로 보낼 정보 formData에 저장 후 전송
      //const formData = new FormData();
      //formData.append("file", fs.createReadStream(file.path));
      //향후 주소 넣어줘야합니다.
      const flaskResponse = await axios.post(process.env.adrs, file, {
        headers: {
          ...file.getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from Flask server:", flaskResponse.data.ai_labels);

      return flaskResponse.data.ai_labels;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      // 업로드받은 파일 node server 폴더 내 업로드파일 복사본 삭제
      fs.unlink(file.path, (err) => {
        if (err) console.error(err);
      });
    }
  },
};

export default flaskController;

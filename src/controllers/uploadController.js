//DB 설정
//제가 따로 몽고디비 파서 테스트 진행했습니다.
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

//db url연결하는 부분 따로 config폴더에 뺄 예정
let db;
const url = process.env.MONGO_URI;
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공"); // DB 연결 성공 여부 확인 메시지
    db = client.db("forum");
  })
  .catch((err) => {
    console.log(err);
  });

//s3 초기 설정

import path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

//제가 따로 s3 파서 테스트 진행했습니다. 프리티어 아닌 줄 알았는데 프리티어여서...
const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3ACCESSKEYID,
    secretAccessKey: process.env.S3_SECRETACCESSKEY,
    //accessKeyId와 secretAccessKey는 처음에 여기다가 key를 그대로 작성했었는데(...) 아무래도 key를 github에 공개하기는 좀 그래서 일단 지웠습니다.
    //찾아보니 env파일과 dotenv 패키지를 통해 키를 환경 변수화해서 외부에서 가져올 수 있다고 하는데 조금 더 공부해보고 빨리 보완하겠습니다.
  },
});

//s3에 원본파일 저장
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "teststorage36",
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
    console.log(req.file);
    try {
      // 데이터베이스에 파일 정보를 저장
      await db.collection("post").insertOne({
        filename:
          path.basename(
            req.file.originalname,
            path.extname(req.file.originalname)
          ) /* + "_" + Date.now()*/ + path.extname(req.file.originalname),
        size: req.file.size,
        type: path.extname(req.file.originalname),
        url: req.file.location,
        createdAt: new Date(),
        etag: req.file.etag, // ETag 정보를 DB에 저장, FileID대신에 넣었습니다.
        //DB에 파일 이름(name), size, 파일 확장자(type), createdAt(생성 시간), 파일 링크(url)(혹시나 다운로드 구현할 때 필요할까봐 일단 만들어뒀습니다.) 우선 DB에 올리겠습니다.
      });
      //res.redirect('/complete'); // 업로드 잘 되나 확인용 테스트 페이지
    } catch (e) {
      console.log(e);
      res.status(500).send("server error");
    }
  },
};

export default uploadController;

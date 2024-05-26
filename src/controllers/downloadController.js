//키 이슈 아직 해결 못해서 테스트 하시려면 단톡에 있는 키 넣으시거나 저한테 말씀주시면 키 드리겠습니다..!

import fs from "fs";
import AWS from "aws-sdk";
import os from "os";
import path from "path";
const ID = '생성한 버킷의 액세스 키';
const SECRET = '시크릿 액세스 키';
const BUCKET_NAME = "teststorage36";
const s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET });

import { MongoClient } from "mongodb";
let db
const url = 'mongodb+srv://admin:qwer1234@cluster0.htbq4dt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
  console.log('다운로드 DB 연결 성공')
  db = client.db('forum')
}).catch((err)=>{
  console.log(err)
})

//download 구현
const downloadFileFromS3 = (fileName) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };
    const downloadsFolderPath = path.join(os.homedir(), 'Downloads');
    const filePath = path.join(downloadsFolderPath, fileName);
    const file = fs.createWriteStream(filePath); // 파일 스트림 생성
    s3.getObject(params).createReadStream().pipe(file)
      .on('error', (err) => {
        reject(err);
      })
      .on('close', () => {
        resolve(filePath);
      });
  });
};

// input으로 받은 파일 제목으로 DB에 해당 파일 있는지 검색하고 
// 파일 존재하면 S3에서 OS 기본 다운로드 경로로 다운로드함
async function findAndDownloadFile(fileTitle) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect(); 
    const db = client.db('forum'); 
    const collection = db.collection('post');

    const file = await collection.findOne({ filename: fileTitle }); 
    if (!file) {
      throw new Error('File not found'); 
    }

    const filePath = await downloadFileFromS3(fileTitle); 
    return filePath;
  } finally {
    await client.close();
  }
}


//req으로 전달받은 내용에서 filename을 추출하고 findAndDownloadFile로 진행
const downloadController = { 
  downloadFileFromS3,
  downloadFile: async(req, res) => {
  try {
    const fileTitle = req.query.filename;
    const filePath = await findAndDownloadFile(fileTitle);
    res.download(filePath, fileTitle, (err) => {
      if (err) {
        // 에러 처리
        console.error(err);
        res.status(500).send("파일 다운로드 중 오류가 발생했습니다.");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("파일 다운로드 중 오류가 발생했습니다.");
  }
}
};

export default downloadController;
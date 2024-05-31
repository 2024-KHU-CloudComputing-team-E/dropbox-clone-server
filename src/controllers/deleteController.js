import { ObjectId } from "mongodb";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import connectDB from "../config/mongodb";

// 데이터베이스 연결 객체 가져오기
const db = await connectDB();
// collection 선택
const collection = db.collection("post");

// MongoDB에서 isDeleted를 False -> True로 업데이트하는 함수
async function updateIsDeleted(filename) {
  try {
    const document = await collection.findOne({ filename: filename });
    const fileId = document._id;
    const result = await collection.updateOne(
      { _id: new ObjectId(fileId) },
      { $set: { isDeleted: true } }
    );

    if (result.modifiedCount === 0) {
      console.log("No documents were updated");
    } else {
      console.log("Document updated successfully");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  } finally {
    await client.close();
  }
}

// 파일 및 document를 삭제하는 함수
async function deleteFileAndDocument(s3Key) {
  //   이건 어디서 쓰이는지?
  const params = {
    Bucket: "teststorage36",
    Key: s3Key,
  };

  try {
    const document = await collection.findOne({ filename: s3Key });
    const fileId = document._id;

    if (document && document.isDeleted) {
      // 버킷 이름 수정해서 env에 담을것
      const deleteParams = {
        Bucket: process.env.S3_BUCKETNAME,
        Key: s3Key,
      };
      const deleteCommand = new DeleteObjectCommand(deleteParams);
      const data = await s3.send(deleteCommand);
      console.log("Response:", data);

      const result = await collection.deleteOne({ _id: new ObjectId(fileId) });
      if (result.deletedCount === 1) {
        console.log("MongoDB document 삭제 완료");
      } else {
        console.log("MongoDB document 삭제 실패");
      }
    } else {
      console.log("isDeleted가 true가 아니거나 문서가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("오류 발생:", error);
  } finally {
    await client.close();
  }
}

// 파일을 휴지통으로 이동하는 함수
async function moveFileToRecycleBin(req, res) {
  const filename = req.body.fileTitle;
  console.log(req.body.fileTitle);

  if (!filename) {
    return res.status(400).send("filename이 필요합니다.");
  }

  try {
    await updateIsDeleted(filename);
    res.send("파일이 휴지통으로 이동되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
}

// 휴지통에서 파일을 삭제하는 함수
async function deleteFileOnRecycleBin(req, res) {
  const filename = req.body.filename;
  console.log(req.body.filename);

  if (!filename) {
    return res.status(400).send("filename이 필요합니다.");
  }

  try {
    await deleteFileAndDocument(filename);
    res.send("파일 및 document 삭제 완료");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
}

export { moveFileToRecycleBin, deleteFileOnRecycleBin };

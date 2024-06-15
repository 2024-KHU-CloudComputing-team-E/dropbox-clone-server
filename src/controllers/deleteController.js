import { ObjectId } from "mongodb";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import File from "../schemas/file.js";
import s3 from "../config/s3.js";

// 휴지통 보낼 파일 요청 받아서 deleteFileOnRecycleBin에 전달하는 함수(바로 아래 함수에 전달)
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

// MongoDB에서 isDeleted를 False -> True로 업데이트하는 함수
async function updateIsDeleted(fileName) {
  try {
    const document = await File.findOne({ fileName: fileName });

    if (!document) {
      console.log("Document not Found");
      return;
    }

    document.isDeleted = true;
    document.deletedAt = new Date();

    const result = await document.save();

    console.log("Document updated successfully: ", result);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

// 휴지통에서 파일을 완전삭제하는 요청 받아서 deleteFileAndDocument에 전달 (바로 아래 함수에 전달)
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

//휴지통에서 완전삭제할 파일 및 document 1개를 완전삭제하는 함수
async function deleteFileAndDocument(s3Key) {
  try {
    const document = await collection.findOne({ filename: s3Key });
    const fileId = document._id;

    if (document && document.isDeleted) {
      // 버킷 이름 수정해서 env에 담을것 넵
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
  } /*finally {
    await client.close();
  }*/
}

//휴지통 비우기
async function deleteFileAndDocumentAll() {
  try {
    // isDeleted가 true인 모든 문서 찾기
    const documents = await collection.find({ isDeleted: true }).toArray();
    console.log(documents);
    //모든 documents 순회
    for (const document of documents) {
      const s3Key = document.filename;
      const fileId = document._id;

      // S3 객체 삭제
      const deleteParams = {
        Bucket: process.env.S3_BUCKETNAME,
        Key: s3Key,
      };
      const deleteCommand = new DeleteObjectCommand(deleteParams);
      const data = await s3.send(deleteCommand);
      console.log(`S3 객체 삭제 완료: ${s3Key}`, data);

      // MongoDB 문서 삭제
      const result = await collection.deleteOne({ _id: new ObjectId(fileId) });
      if (result.deletedCount === 1) {
        console.log(`MongoDB 문서 삭제 완료: ${fileId}`);
      } else {
        console.log(`MongoDB 문서 삭제 실패: ${fileId}`);
      }
    }
  } catch (error) {
    console.error("오류 발생:", error);
  } /*finally { 
    await client.close();
  }*/
}

//복원할 파일 요청 받아서 restoreIsDeleted에 전달하는 함수(바로 아래 함수에 전달)
async function restore(req, res) {
  const filename = req.body.fileTitle;
  console.log(req.body.fileTitle);

  if (!filename) {
    return res.status(400).send("filename이 필요합니다.");
  }

  try {
    await restoreIsDeleted(filename);
    res.send("파일이 복원 되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
}

//휴지통 밖으로 파일 복원
async function restoreIsDeleted(filename) {
  try {
    console.log(111);
    const document = await collection.findOne({ filename: filename });
    const fileId = document._id;
    console.log(fileId);
    const result = await collection.updateOne(
      { _id: new ObjectId(fileId) },
      { $set: { isDeleted: false } }
    );
    if (result.modifiedCount === 0) {
      console.log("No documents were updated");
    } else {
      console.log("Document updated successfully");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  } /*finally {
    await client.close();
  }*/
}

export {
  moveFileToRecycleBin,
  deleteFileOnRecycleBin,
  deleteFileAndDocumentAll,
  restore,
};

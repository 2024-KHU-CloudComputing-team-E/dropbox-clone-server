import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Types } from "mongoose";
import User from "../schemas/user.js";
const ObjectId = Types.ObjectId;

import File from "../schemas/file.js";
import s3 from "../config/s3.js";

// 휴지통 보낼 파일 요청 받아서 deleteFileOnRecycleBin에 전달하는 함수(바로 아래 함수에 전달)
async function moveFileToRecycleBin(req, res) {
  const fileId = req.params.fileId;
  const objectId = new ObjectId(fileId);

  if (!fileId) {
    return res.status(400).send("fileId가 req.params로 필요합니다.");
  }

  try {
    await updateIsDeleted(objectId);
    res.send("파일이 휴지통으로 이동되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
}

// MongoDB에서 isDeleted를 False -> True로 업데이트하는 함수 : 수정완료
async function updateIsDeleted(fileId) {
  try {
    const document = await File.findOne({ _id: fileId });

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
  const fileId = req.params.fileId;
  const objectId = new ObjectId(fileId);

  if (!fileId) {
    return res.status(400).send("fileId가 req.params로 필요합니다.");
  }

  try {
    await deleteFileAndDocument(objectId);
    res.send("파일 및 document 삭제 완료");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
}

//휴지통에서 완전삭제할 파일을 s3/mongodb document 1개를 완전삭제하는 함수
async function deleteFileAndDocument(fileId) {
  try {
    const document = await File.findOne({ _id: fileId });
    await User.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $set: {
          volume: req.user.volume - document.size / (1024 * 1024 * 1024),
        },
      }
    );

    if (document && document.isDeleted) {
      const deleteParams = {
        Bucket: process.env.S3_BUCKETNAME,
        Key: document.fileName,
      };
      const deleteCommand = new DeleteObjectCommand(deleteParams);
      const data = await s3.send(deleteCommand);
      console.log("s3 영구삭제 response", data);

      const result = await File.deleteOne({ _id: fileId });

      if (result.deletedCount === 1) {
        console.log("MongoDB document 삭제 완료");
      } else {
        console.log("MongoDB document 삭제 실패");
      }
    } else {
      console.log("isDeleted가 true가 아니거나 문서가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("파일 영구삭제 중 오류 발생 deleteFileAndDocument:", error);
  }
}

//휴지통 비우기(전체삭제)
async function deleteFileAndDocumentAll() {
  try {
    // isDeleted가 true인 모든 문서 찾기
    const documents = await File.find({ isDeleted: true });
    console.log("휴지통비우기 documents : ", documents);

    //모든 documents 순회
    documents.map(async (document) => {
      const fileId = document.fileId;
      const objectId = new ObjectId(fileId);

      deleteFileAndDocument(objectId);
    });
  } catch (error) {
    console.error("휴지통 비우기 중 오류 발생:", error);
  }
}

//복원할 파일 요청 받아서 restoreIsDeleted에 전달하는 함수(바로 아래 함수에 전달) 변수 수정 필요
async function restore(req, res) {
  const fileId = req.params.fileId;
  const objectId = new ObjectId(fileId);

  if (!fileId) {
    return res.status(400).send("fileId가 req.params로 필요합니다.");
  }

  try {
    await restoreIsDeleted(objectId);
    res.send("파일이 복원 되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
}

//휴지통 밖으로 파일 복원
async function restoreIsDeleted(fileId) {
  try {
    const document = await File.findOne({ _id: fileId });
    console.log("복원할 file._id", fileId);

    if (!document) {
      console.log("Document to restore is not Found.");
      return;
    }

    document.isDeleted = false;
    const result = await document.save();

    if (result.modifiedCount === 0) {
      console.log("No documents were updated in restoreIsDeleted");
    } else {
      console.log("Document updated successfully is restoreIsDeleted");
    }
  } catch (error) {
    console.error("Error updating isDeleted document : ", error);
  }
}

export {
  moveFileToRecycleBin,
  deleteFileOnRecycleBin,
  deleteFileAndDocumentAll,
  restore,
};

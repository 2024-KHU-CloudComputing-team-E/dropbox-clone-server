import comments from "../schemas/comment.js";
import File from "../schemas/file.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

const postComment = async (data) => {
  const objectId = new ObjectId(data.fileId);
  await comments.create(data);
  const target = await File.FindOne({ _id: objectId });
  let array = target.comments;
  array.push({ userName: req.user.userName, comment: data.comment });
  await File.findOneAndUpdate({ _id: objectId }, { $set: { comments: array } });
  return;
};

const updateComment = async (id, content) => {
  const objectId = new ObjectId(id);
  await comments.findOneAndUpdate(
    { _id: objectId },
    { $set: { content: content } }
  );
  return;
};

const deleteComment = async (id) => {
  const objectId = new ObjectId(id);
  await comments.deleteOne({ _id: objectId });
  return;
};

export default { postComment, updateComment, deleteComment };

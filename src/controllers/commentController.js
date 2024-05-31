import comments from "../schemas/testComment.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

const postComment = async (data) => {
  await comments.create(data);
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

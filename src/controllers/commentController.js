import comments from "../schemas/testComment.js";

const postComment = async (data) => {
  await comments.create(data);
  return;
};

const updateComment = async (data) => {
  comments.updateOne({ id: id }, data);
  return;
};

const deleteComment = async (data) => {
  await comments.deleteOne(data);
  return;
};

export default { postComment, updateComment, deleteComment };

import User from "../schemas/test.js";

const postComment = async (data) => {
  await User.create(data);
  return;
};

const updateComment = async (data) => {
  User.updateOne({ id: id }, data);
  return;
};

const deleteComment = async (data) => {
  await User.deleteOne(data);
  return;
};

export default { postComment, updateComment, deleteComment };

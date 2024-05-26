import User from "../schemas/test.js";

const getComment = async () => {
  const comment = await User.find({
    email: email,
  });
  if (!data) {
    return;
  }
  return comment;
};

const postComment = async (data) => {
  User.insertOne(data);
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

export default { getComment, postComment, updateComment, deleteComment };

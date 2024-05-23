import User from "../schemas/test.js";

const getUserinfo = async (email) => {
  const data = await User.findOne({
    email: email,
  });
  if (!data) {
    return;
  }
  return data;
};

export default { getUserinfo };

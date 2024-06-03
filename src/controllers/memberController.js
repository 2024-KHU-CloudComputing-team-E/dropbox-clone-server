import User from "../schemas/user.js";

const getUserinfoWithToken = async (token) => {
  const data = await User.findOne({
    token: token,
  });
  if (!data) {
    return;
  }
  return data;
};

export default { getUserinfoWithToken };

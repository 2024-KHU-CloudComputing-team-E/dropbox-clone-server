import User from "../schemas/user.js";

const getUserinfoById = async (id) => {
  try {
    const data = await User.findOne({
      userId: id,
    });
    if (!data) {
      return;
    }
    return data;
  } catch (err) {
    return err;
  }
};

export default { getUserinfoById };

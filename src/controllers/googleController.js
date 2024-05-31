import google from "../env/google.js";
import User from "../schemas/test.js";
import axios from "axios";
import jwt from "jsonwebtoken";

const getToken = async (code) => {
  try {
    const response = await axios.post(process.env.GOOGLE_TOKEN_URL, {
      // x-www-form-urlencoded(body)
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

// 확인필요
const getUserinfoByToken = async (token) => {
  const userinfo = await axios.get(google.GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return userinfo.data;
};

const verifyUser = async (userinfo) => {
  const user = new User(userinfo);
  const data = await User.findOne({
    email: userinfo.email,
  });
  if (!data) {
    user.save();
  }
  const payload = {
    user: {
      id: userinfo.id,
    },
  };
  const token = jwt.sign(
    payload, // 변환할 데이터
    "jwtSecret", // secret key 값
    { expiresIn: "1h" } // token의 유효시간
  );
  user.token = token;
  return token;
};

export default { getToken, getUserinfoByToken, verifyUser };

import User from "../schemas/user.js";
import axios from "axios";
import jwt from "jsonwebtoken";

const getGoogleAuthURL = () => {
  const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const queryString = new URLSearchParams(options);
  return `${rootURL}?${queryString.toString()}`;
};

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
  const userinfo = await axios.get(process.env.GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const customized = {
    userId: userinfo.data.id,
    provider: "temp",
    email: userinfo.data.email,
    userName: userinfo.data.name,
  };

  return customized;
};

const verifyUser = async (userinfo) => {
  const user = new User(userinfo);
  const data = await User.findOne({
    userId: userinfo.userId,
  });
  if (!data) {
    user.save();
  }
  const payload = {
    user: {
      userId: userinfo.userId,
    },
  };
  const token = jwt.sign(
    payload, // payload를 jwt로 만든다
    "jwtSecret", // secret key 값
    { expiresIn: "1h" } // token의 유효시간
  );
  user.token = token;
  console.log(user);
  return user;
};

export default { getGoogleAuthURL, getToken, getUserinfoByToken, verifyUser };

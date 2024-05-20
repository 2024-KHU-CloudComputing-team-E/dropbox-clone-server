import google from "../env/google.js";
import axios from "axios";

const getToken = async (code) => {
  try {
    const response = await axios.post(google.GOOGLE_TOKEN_URL, {
      // x-www-form-urlencoded(body)
      code,
      client_id: google.GOOGLE_CLIENT_ID,
      client_secret: google.GOOGLE_CLIENT_SECRET,
      redirect_uri: google.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

const getUserinfoByToken = async (token) => {
  const userinfo = await axios.get(google.GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return userinfo.data;
};

const verifyUser = async (user) => {
  if (user.email == "zackinthebox@khu.ac.kr") return true;
  else return false;
};

export default { getToken, getUserinfoByToken, verifyUser };

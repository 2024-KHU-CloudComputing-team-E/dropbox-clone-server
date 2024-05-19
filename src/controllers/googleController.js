import google from "../env/google.js";

const getToken = async (code) => {
  try {
    const tokenApi = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${google.CLIENT_ID}&client_secret=${google.CLIENT_SECRET}&redirect_uri=${google.REDIRECT_URL}&grant_type=authorization_code`
    );
    const accessToken = tokenApi.data.access_token;
    console.log(accessToken);
    return accessToken;
  } catch (err) {
    return err;
  }
};

export default { getToken };

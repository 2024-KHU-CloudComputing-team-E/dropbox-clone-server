import User from "../schemas/test.js";
import jwt from "jsonwebtoken";

let auth = async (req, res, next) => {
  const token = req.cookies.x_auth;

  if (!token) return res.json({ isAuth: false, error: "no token" });
  const decoded = jwt.verify(token, "jwtSecret");
  if (!decoded.user) return res.json({ isAuth: false, error: "no token" });
  const user = await User.find(decoded.user);
  if (!user) {
    return res.json({ isAuth: false, error: true });
  } else {
    req.token = user.token;
    req.user = user;
    next();
  }
};

export default auth;

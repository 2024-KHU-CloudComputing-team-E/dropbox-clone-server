import User from "../schemas/user.js";
import jwt from "jsonwebtoken";

let auth = async (req, res, next) => {
  try {
    const token = req.cookies.x_auth;

    if (!token) return res.json({ isAuth: false, error: "no token" });
    const decoded = jwt.verify(token, "jwtSecret");
    if (!decoded.user)
      return res.json({ isAuth: false, error: "no decoded.user" });
    const user = await User.findOne(decoded.user);
    if (!user) {
      return res.json({ isAuth: false, error: true });
    } else {
      req.token = user.token;
      req.user = user;
      next();
    }
  } catch (err) {
    res.send(err);
  }
};

export default auth;

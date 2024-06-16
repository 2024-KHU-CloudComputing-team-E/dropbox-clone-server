import express from "express";
import auth from "../middleware/auth.js";
import cookieParser from "cookie-parser";

import {
  follow,
  unfollow,
  followingCount,
  followerCount,
} from "../controllers/followFollowingController.js";
const followFollowingRouter = express.Router();

followFollowingRouter.use(cookieParser());

followFollowingRouter.post("/follow/:userId", auth, follow);
followFollowingRouter.post("/unfollow/:userId", auth, unfollow);
followFollowingRouter.get("/followingCount", followingCount);
followFollowingRouter.get("/followerCount", followerCount);

export default followFollowingRouter;

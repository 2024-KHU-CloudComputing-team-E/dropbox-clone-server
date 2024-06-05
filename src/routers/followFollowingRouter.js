import express from "express";
import { follow, unfollow, followingCount, followerCount } from "../controllers/followFollowingController.js";
const followFollowingRouter = express.Router();

followFollowingRouter.post('/follow', follow);
followFollowingRouter.post('/unfollow', unfollow);
followFollowingRouter.post('/followingCount', followingCount);
followFollowingRouter.post('/followerCount', followerCount);

export default followFollowingRouter;
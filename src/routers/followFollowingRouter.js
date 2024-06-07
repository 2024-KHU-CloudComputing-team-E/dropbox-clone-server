import express from "express";
import { follow, unfollow, followingCount, followerCount } from "../controllers/followFollowingController.js";
const followFollowingRouter = express.Router();

followFollowingRouter.post('/follow', follow);
followFollowingRouter.post('/unfollow', unfollow);
followFollowingRouter.get('/followingCount', followingCount);
followFollowingRouter.get('/followerCount', followerCount);

export default followFollowingRouter;
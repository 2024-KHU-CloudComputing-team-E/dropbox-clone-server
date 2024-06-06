import User from "../schemas/user.js";
import mongoose from "../config/mongoose.js";
/*import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:qwer1234@cluster0.htbq4dt.mongodb.net/forum?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true }, // userId 필드 추가
  followers: [{ type: String }], // ref 옵션 제거
  followings: [{ type: String }] // ref 옵션 제거
});
*/
//const User = mongoose.model('users', userSchema);


// 팔로우(내 Id와 상대방 Id가 입력으로 들어오면 내 팔로우 목록에 상대방 Id, 상대방 팔로워 목록에 내 Id 추가)
export async function follow(req, res){
  const { currentUserId, targetUserId } = req.body;
  console.log(req.body);

  if (!currentUserId || !targetUserId) {
    return res.status(400).send({ message: 'All fields must be provided.' });
  }

  try {
    // 현재 사용자와 상대방을 mongodb에서 찾기
    
    const currentUser = await User.findOne({ userId: currentUserId });
    const targetUser = await User.findOne({ userId: targetUserId });

    if (!currentUser || !targetUser) {
      return res.status(404).send({ message: 'User not found.' });
    }

    

    //이미 팔로우 했으면 팔로우 중복 안되게.

    console.log(Number(targetUser.userId));
    
    const isAlreadyFollowing = currentUser.followings.includes(targetUser.userId);
    const isAlreadyFollowed = targetUser.followers.includes(currentUser.userId);
    

    if (isAlreadyFollowing || isAlreadyFollowed) {
      return res.status(400).send({ message: 'Already following this user.' });
    }

    // 현재 사용자의 팔로잉 목록에 상대방의 userId를 추가
    await User.findByIdAndUpdate(currentUser._id, { $addToSet: { followings: targetUser.userId } });
    // 상대방의 팔로워 목록에 현재 사용자의 userId를 추가
    await User.findByIdAndUpdate(targetUser._id, { $addToSet: { followers: currentUser.userId } });

    res.send({ message: 'Successfully followed.' });
  } catch (error) {
    console.error(`Error occurred while following: ${error}`);
    res.status(500).send({ message: 'Error occurred while following.' });
  }
};

//언팔로우
//팔로우 함수와 거의 동일하고 목록에서 id 지우는 부분만 다름
export async function unfollow(req, res){
  const { currentUserId, targetUserId } = req.body;
  console.log(req.body);

  if (!currentUserId || !targetUserId) {
    return res.status(400).send({ message: 'All fields must be provided.' });
  }

  try {
    const currentUser = await User.findOne({ userId: currentUserId });
    const targetUser = await User.findOne({ userId: targetUserId });

    if (!currentUser || !targetUser) {
      return res.status(404).send({ message: 'User not found.' });
    }

    console.log(targetUser.userId);
    console.log(currentUser.userId);

    const isNotFollowing = !currentUser.followings.includes(targetUser.userId);
    const isNotFollowed = !targetUser.followers.includes(currentUser.userId);

    if (isNotFollowing || isNotFollowed) {
      return res.status(400).send({ message: 'Not following this user.' });
    }

    // 현재 사용자의 팔로잉 목록에서 타겟 사용자의 userId를 제거
    await User.findByIdAndUpdate(currentUser._id, { $pull: { followings: targetUser.userId } });
    // 타겟 사용자의 팔로워 목록에서 현재 사용자의 userId를 제거
    await User.findByIdAndUpdate(targetUser._id, { $pull: { followers: currentUser.userId } });

    res.send({ message: 'Successfully unfollowed.' });
  } catch (error) {
    console.error(`Error occurred while unfollowing: ${error}`);
    res.status(500).send({ message: 'Error occurred while unfollowing.' });
  }
};



//개수 세기
//userId를 넘기면 팔로잉 몇 명인지 count하는 함수
export async function followingCount(req, res){
  const { userId } = req.params;
  console.log(userId);

  //userId에 해당하는 collection 찾기

  try {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      //following array의 크기 계산
      { $project: { numberOfFollowings: { $size: "$following" } } }
    ]);

    if (result.length === 0) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.send({ userId: userId, numberOfFollowings: result[0].numberOfFollowings });
  } catch (error) {
    console.error(`Error occurred while counting following: ${error}`);
    res.status(500).send({ message: 'Error occurred while counting following.' });
  }
};

//userId를 넘기면 '팔로워' 몇명인지 count 하는 함수. 위의 팔로잉 count 함수와 거의 동일함
export async function followerCount(req, res){
  const { userId } = req.params;

  try {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $project: { numberOfFollowers: { $size: "$followers" } } }
    ]);

    if (result.length === 0) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.send({ userId: userId, numberOfFollowers: result[0].numberOfFollowers });
  } catch (error) {
    console.error(`Error occurred while counting followers: ${error}`);
    res.status(500).send({ message: 'Error occurred while counting followers.' });
  }
};

//export default { follow, unfollow, followingCount, followerCount };
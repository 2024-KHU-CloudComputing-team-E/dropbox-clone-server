import User from "../schemas/user.js";

// 팔로우(내 Id와 상대방 Id가 입력으로 들어오면 내 팔로우 목록에 상대방 Id, 상대방 팔로워 목록에 내 Id 추가)
export async function follow(req, res) {
  const currentUserId = req.user.userId;
  const targetUserId = req.params.userId;
  if (!currentUserId || !targetUserId) {
    return res.status(400).send({ message: "All fields must be provided." });
  }

  try {
    // 현재 사용자와 상대방을 mongodb에서 찾기

    const currentUser = req.user;
    const targetUser = await User.findOne({ userId: targetUserId });
    console.log(currentUser);
    console.log(targetUser);
    targetUser.followers.push({
      userId: currentUser.userId,
      userName: currentUser.userName,
    });
    currentUser.followings.push({
      userId: targetUser.userId,
      userName: targetUser.userName,
    });
    console.log(currentUser);
    console.log(targetUser);
    if (!currentUser || !targetUser) {
      return res.status(404).send({ message: "User not found." });
    }

    await User.findOneAndUpdate(
      { userId: targetUser },
      {
        $set: {
          followers: targetUser.followers,
        },
      }
    );
    await User.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $set: {
          followings: currentUser.follwings,
        },
      }
    );

    res.send({ message: "Successfully followed." });
  } catch (error) {
    console.error(`Error occurred while following: ${error}`);
    res.status(500).send({ message: "Error occurred while following." });
  }
}

//언팔로우
//팔로우 함수와 거의 동일하고 목록에서 id 지우는 부분만 다름
export async function unfollow(req, res) {
  const { currentUserId, targetUserId } = req.body;
  console.log(req.body);

  if (!currentUserId || !targetUserId) {
    return res.status(400).send({ message: "All fields must be provided." });
  }

  try {
    const currentUser = await User.findOne({ userId: currentUserId });
    const targetUser = await User.findOne({ userId: targetUserId });

    if (!currentUser || !targetUser) {
      return res.status(404).send({ message: "User not found." });
    }

    const isNotFollowing = !currentUser.followings.includes(targetUser.userId);
    const isNotFollowed = !targetUser.followers.includes(currentUser.userId);

    if (isNotFollowing || isNotFollowed) {
      return res.status(400).send({ message: "Not following this user." });
    }

    // 현재 사용자의 팔로잉 목록에서 타겟 사용자의 userId를 제거
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { followings: targetUser.userId },
    });
    // 타겟 사용자의 팔로워 목록에서 현재 사용자의 userId를 제거
    await User.findByIdAndUpdate(targetUser._id, {
      $pull: { followers: currentUser.userId },
    });

    res.send({ message: "Successfully unfollowed." });
  } catch (error) {
    console.error(`Error occurred while unfollowing: ${error}`);
    res.status(500).send({ message: "Error occurred while unfollowing." });
  }
}

//개수 세기
//userId를 넘기면 팔로잉 몇 명인지 count하는 함수
export async function followingCount(req, res) {
  const { userId } = req.params;

  //userId에 해당하는 collection 찾기

  try {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      //following array의 크기 계산
      { $project: { numberOfFollowings: { $size: "$following" } } },
    ]);

    if (result.length === 0) {
      return res.status(404).send({ message: "User not found." });
    }
    //크기가 result[0].numberOfFollowings에 저장됨

    res.send({
      userId: userId,
      numberOfFollowings: result[0].numberOfFollowings,
    });
  } catch (error) {
    console.error(`Error occurred while counting following: ${error}`);
    res
      .status(500)
      .send({ message: "Error occurred while counting following." });
  }
}

//userId를 넘기면 '팔로워' 몇명인지 count 하는 함수. 위의 팔로잉 count 함수와 거의 동일함
export async function followerCount(req, res) {
  const { userId } = req.params;

  try {
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $project: { numberOfFollowers: { $size: "$followers" } } },
    ]);

    if (result.length === 0) {
      return res.status(404).send({ message: "User not found." });
    }

    //크기가 result[0].numberOfFollowings에 저장됨

    res.send({
      userId: userId,
      numberOfFollowers: result[0].numberOfFollowers,
    });
  } catch (error) {
    console.error(`Error occurred while counting followers: ${error}`);
    res
      .status(500)
      .send({ message: "Error occurred while counting followers." });
  }
}

//export default { follow, unfollow, followingCount, followerCount };

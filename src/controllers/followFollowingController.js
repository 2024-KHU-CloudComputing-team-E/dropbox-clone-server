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
    const duplicated = false;
    const currentUser = req.user;
    const targetUser = await User.findOne({ userId: targetUserId });
    console.log(currentUser);
    console.log(targetUser);
    for (let i = 0; i < currentUser.followings.length; i++) {
      if (currentUser.followings[i].userId == targetUserId) {
        duplicated = true;
        break;
      }
    }
    if (duplicated == false) {
      targetUser.followers.push({
        userId: currentUser.userId,
        userName: currentUser.userName,
      });
      currentUser.followings.push({
        userId: targetUser.userId,
        userName: targetUser.userName,
      });

      if (!currentUser || !targetUser) {
        return res.status(404).send({ message: "User not found." });
      }
      await User.findOneAndUpdate(
        { userId: targetUserId },
        {
          $set: {
            followers: targetUser.followers,
          },
        }
      );
      await User.findOneAndUpdate(
        { userId: currentUserId },
        {
          $set: {
            followings: currentUser.followings,
          },
        }
      );

      res.send({ message: "Successfully followed." });
    } else {
      res.send({ message: "이미 팔로우 한 유저입니다." });
    }
  } catch (error) {
    console.error(`Error occurred while following: ${error}`);
    res.status(500).send({ message: "Error occurred while following." });
  }
}

export async function follow(req, res) {
  const currentUserId = req.user.userId;
  const targetUserId = req.params.userId;

  if (!currentUserId || !targetUserId) {
    return res.status(400).send({ message: "All fields must be provided." });
  }

  try {
    // 현재 사용자와 상대방을 mongodb에서 찾기
    const index = -1;
    const currentUser = req.user;
    const targetUser = await User.findOne({ userId: targetUserId });
    console.log(currentUser);
    console.log(targetUser);
    for (let i = 0; i < currentUser.followings.length; i++) {
      if (currentUser.followings[i].userId == targetUserId) {
        currentUser.followings.splice(i, 1);
        break;
      }
    }
    for (let j = 0; j < targetUser.followers.length; j++) {
      if (targetUser.followers[j].userId == currentUserId) {
        targetUser.followers.splice(j, 1);
        break;
      }
    }

    if (!currentUser || !targetUser) {
      return res.status(404).send({ message: "User not found." });
    }
    await User.findOneAndUpdate(
      { userId: targetUserId },
      {
        $set: {
          followers: targetUser.followers,
        },
      }
    );
    await User.findOneAndUpdate(
      { userId: currentUserId },
      {
        $set: {
          followings: currentUser.followings,
        },
      }
    );

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

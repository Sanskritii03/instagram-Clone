const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
    const id = req.user.username;

    const followerUsername = req.user.username; // user who loged-in
    const followeeUsername = req.params.username; // user who followed or jiska id api m hoga vo user follow hoga

    if (followeeUsername == followerUsername) {
        return res.status(400).json({
            message: "not able to follow yourself.",
        });
    }

    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername,
    });
    if (!isFolloweeExist) {
        return res.status(404).json({
            message: "user not found",
        });
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: ` already following . . ${followeeUsername}. . .`,
            follow: isAlreadyFollowing,
        });
    }
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });

    res.status(201).json({
        message: `you are now following by ${followeeUsername}`,
        follow: followRecord,
    });
}

async function unFollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if(!isUserFollowing){
        return res(200).json({
            message:`you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id )

    res.status(200).json({
        message:`successfully you have unfollowed ${followeeUsername} `
    })
}

module.exports = {
    followUserController,
    unFollowUserController,
};

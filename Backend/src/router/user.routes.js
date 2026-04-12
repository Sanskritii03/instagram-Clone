const express = require('express');
const userController = require('../controllers/user.controller')
const identifyUser = require('../middlewares/auth.middlewares')

const userRouter = express.Router()

/**
 * api/users/follow/:userid
 * follow user
 * private
 */
userRouter.post('/follow/:username', identifyUser, userController.followUserController)

userRouter.post('/unfollow/:username', identifyUser, userController.unFollowUserController)

module.exports = userRouter;
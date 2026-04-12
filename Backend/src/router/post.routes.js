const express = require("express");
const PostController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middlewares");

const postRouter = express.Router();

/**
 * post//
 * -> /api/posts [ protected route, its protected by jwt_token]
 */

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  PostController.createPostController,
);

/**
 * get post 
*/
postRouter.get("/", identifyUser, PostController.getPostController);

/**
 * return user detail about specific pst with the id also check weather 
 */
postRouter.get(
  "/details/:postId",
  identifyUser,
  PostController.getPostDetailsController,
);

/**
 * like api 
 * post /api/posts/like/:posstid
 * like a post with id provided in the request params
 */
postRouter.post('/like/:postId' , identifyUser,PostController.likePostController)
postRouter.post('/unlike/:postId' , identifyUser,PostController.unlikePostController)

/**
 * feed
 * get /api/posts/feed
 * get all the post created in the db
 * its a protected route 'only for login account'
 */

postRouter.get("/feed" , identifyUser , PostController.getFeedController)

module.exports = postRouter;

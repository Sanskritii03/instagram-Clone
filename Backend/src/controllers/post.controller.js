const postModel = require('../models/post.models')
const imageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const likesModel = require('../models/likes.model')
const likeModel = require('../models/likes.model')

const imagekit = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req, res) {
  // from server to cloud provider imagekit
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'test',
    folder: 'instagram-clone__Posts'
  })

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id
  })

  res.status(201).json({
    message: 'successfully post created',
    post
  })
}

/**
 * get [protected_route]
 *  /api/posts/
 * post return to user as response
 */
async function getPostController (req, res) {
  const userId = req.user.id

  const posts = await postModel.find({
    user: userId
  })

  res.status(200).json({
    message: 'post fetched successfully',
    posts
  })
}
/**
 * get /appi/posts/details/:postId
 * return a detail about specific post with the id also and check wheater the post belongs to user or not
 */
async function getPostDetailsController (req, res) {
  const userId = req.user.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)
  if (!post) {
    return res.status(404).json({
      message: 'post not found ..'
    })
  }

  const isValidUser = post.user.toString() === userId

  if (!isValidUser) {
    return res.status(403).json({
      message: 'forbidden content..'
    })
  }
  return res.status(200).json({
    message: 'post fetched successfully',
    post
  })
}

async function likePostController (req, res) {

  const username = req.user.username

  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if (!postId) {
    return res.status(404).json({
      message: 'post not found..'
    })
  }
  const like = await likesModel.create({
    post: postId,
    user: username
  })
  res.status(200).json({
    message: 'post liked successfully',
    like
  })
}

async function unlikePostController(req , res) {

   const username = req.user.username
  const postId = req.params.postId


  const isLiked = await likeModel.findOne({
    post:postId,
    user:username
  })

  if(!isLiked){
    return res.status(400).json({
      message:"user dosnot like the post"
    })

    await likeModel.findOneAndDelete({ _id: isLiked._id })
    res.status(200).json({
      message:"successfully disLiked the function",

    })
  }
}
async function getFeedController (req, res) {
  const user = req.user

  const posts = await Promise.all(
    (
      await postModel.find({}).sort({_id: -1}).populate('user').lean()
    ).map(async (post) => {
      /**
       * type of post = mongoObject 
       * for treating as a normal object we use 'lean'
       */
      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id
      })
      post.isLiked = !!isLiked

      return post
    })
  )

  res.status(200).json({
    message: 'post fetched successfully',
    posts
  })
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
  getFeedController
}

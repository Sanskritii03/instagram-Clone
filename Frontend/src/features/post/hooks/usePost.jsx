import { getFeed, createPost , likePost, unLikePost } from '../services/post.api'
import { useContext, useEffect } from 'react'
import { PostContext } from '../post.context'

export const usePost = () => {
  const context = useContext(PostContext)

  const { loading, setLoading, post, setPost, feed, setFeed } = context

  const handleGetFeed = async () => {
    setLoading(true)
    const data = await getFeed()
    setFeed(data.posts)
    setLoading(false)
  }

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true)
    const data = await createPost(imageFile, caption)
    setFeed([data.posts, ...feed])
    setLoading(false)
  }

  const handleLikedPost = async (post )=> {
    setLoading(true)
    const data = await likePost(post)
    setFeed([data.posts, ...feed])
    setLoading(false)
  }

  const handleDisLikedPost = async (post) => {
    setLoading(true)
    const data = await unlikePost(post)
    setFeed([data.posts, ...feed])
    setLoading(false)
  }

  useEffect(() => {
    handleGetFeed()
  }, [])

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLikedPost,
    handleDisLikedPost
  }
}

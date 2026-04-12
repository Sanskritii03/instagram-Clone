import React, { useEffect } from 'react'
import '../style/feed.scss'
import '../style/button.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import { Link } from 'react-router-dom'
import Navbar from '../../shared/components/Navbar'

const Feed = () => {
  const { feed, loading, handleGetFeed, handleLikedPost, handleDisLikedPost } =
    usePost()

  useEffect(() => {
    handleGetFeed()
  }, [])

  if (loading || !feed) {
    return (
      <main>
        {' '}
        <h1> loading . . . . </h1>
      </main>
    )
  }
  console.log(feed)

  return (
    <main className='feed-page'>
      <Navbar />
      <div className='feed'>
        <div className='posts'>
          {feed.map(post => {
            return (
              <Post
                user={post.user}
                post={post}
                loading={loading}
                handleLikedPost={handleLikedPost}
                handleDisLikedPost={handleDisLikedPost}
              />
            )
          })}{' '}
        </div>
      </div>
    </main>
  )
}

export default Feed

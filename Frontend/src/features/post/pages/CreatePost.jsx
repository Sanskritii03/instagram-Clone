import React, { useRef , useState } from 'react'
import '../style/create.scss'
import { usePost } from '../hooks/usePost'
import {useNavigate} from 'react-router'

const CreatePost = () => {

const [caption , setCaption] = useState('')
const postImageInputFeildRef = useRef(null)

const navigate = useNavigate()

const {loading , handleCreatePost} = usePost()

async function handleSubmit(e){
  e.preventDefault()

  const file = postImageInputFeildRef.current.files[ 0 ]
  await handleCreatePost(file , caption)
  navigate('/')
}
if(loading){
  return 
  <main> <h1>post is creating </h1></main>
}

  return (
    <>
<main className='create-post-image'>
  <div className='form-container'>
    <h1>Create your new  post </h1>
    <form onSubmit={handleSubmit}>
      
      <label  className='img-label' htmlFor="postImage">select image</label>
      <input ref={postImageInputFeildRef} 
       hidden type="file" name='postImage' id='postImage' />
      <input
      value={caption}
      onChange={(e)=>{
        setCaption(e.target.value)
      }}
       type="text" name='caption' id='caption' placeholder='enter caption' />
      <button type='submit' className='button primary-button'> create post </button>
    </form>
    </div></main>    </>
  )
}

export default CreatePost
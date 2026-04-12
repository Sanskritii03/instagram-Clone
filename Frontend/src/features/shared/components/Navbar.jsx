import React from 'react'
import '../nav.scss'
import {useNavigate} from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
    <nav className='navbar'>
        <h1>iNSTAGRAM</h1>
        <button 
        onClick={()=>{
          navigate('/create-post')
        }} 
        className='create-button'>create post</button>
    </nav>
    </>
  )
}

export default Navbar
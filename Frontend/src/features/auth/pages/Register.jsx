import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const { loading ,handleRegister } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


const navigate = useNavigate()
  if (loading) {
    return <h1>loading...</h1>
  }

  
  async function handleRegisterFormSubmit (e) {
    e.preventDefault(e)

    handleRegister(username, email, password).then(res => {
      console.log('registered')
            navigate('/')

    })
  }
  return (
    <>
      <main>
        <div className='form-container'>
          <h1>iNSTAGRAM Register</h1>
          <form action='' onSubmit={handleRegisterFormSubmit}>
            <input
              onInput={e => {
                setUsername(e.target.value)
              }}
              type='text'
              name='username'
              placeholder='Enter userame'
            />
            <input
              onInput={e => {
                setEmail(e.target.value)
              }}
              type='text'
              name='email'
              placeholder='Enter email'
            />
            <input
              onInput={e => {
                setPassword(e.target.value)
              }}
              type='text'
              name='password'
              placeholder='Enter password'
            />
            <button type='submit' className='button register-button'>
              Register
            </button>
          </form>
          <p>
            Already have an account ?
            <Link to='/login' className='toggleAuthForm'>
              Login Yourself 😌
            </Link>{' '}
          </p>
        </div>
      </main>
    </>
  )
}

export default Register

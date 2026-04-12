import React from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import { Navigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { user, handleLogin, loading } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  if (loading) {
    return <h1>loading...</h1>
  }

  async function handleFormSubmit (e) {
    e.preventDefault(e)

    handleLogin(username, password).then(res => {
      console.log('user successfully loggedIn')
      navigate('/')
    })
  }

  return (
    <>
      <main>
        <div className='form-container'>
          <h1>iNSTAGRAM Login</h1>
          <form action='' onSubmit={handleFormSubmit}>
            <input
              onInput={e => {
                setUsername(e.target.value)
              }}
              type='text'
              name='username'
              id='username'
              placeholder='Enter username'
            />

            <input
              onInput={e => {
                setPassword(e.target.value)
              }}
              type='text'
              name='password'
              id='password'
              placeholder='Enter password'
            />

            <button type='submit' className='button primary-button'>
              Login{' '}
            </button>
          </form>
          <p>
            {' '}
            Don't have any account ?
            <Link className='toggleAuthForm' to='/register'>
              Create one😉
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}

export default Login

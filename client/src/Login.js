import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({
  API_AUTH, 
  auth, 
  setAuth, 
  username, 
  setUsername, 
  password, 
  setPassword, 
  message, 
  setMessage }) => {

  useEffect(() => console.log(auth), [auth])


  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please type in username and password.');
      return;
    }

    try {
      const response = await fetch(API_AUTH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          user: username,
          pwd: password
        })
      })

      if (!response.ok) {
        setMessage('Username or password is not correct!');
        setUsername('');
        setPassword('');
        return;
      } else {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        setMessage('');
        setAuth(true);
        navigate('/home');
      }
    } catch (err) {
      setMessage(err.message);
    }

  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>

      <form className='loginForm' onSubmit={handleLogin}>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <label htmlFor='username'>Username: </label>
        <input
          id='username'
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>Password: </label>
        <input
          id='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
        >Login</button>
      </form>
    </div>
  )
}

export default Login

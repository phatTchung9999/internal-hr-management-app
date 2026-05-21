import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({ isLoading, setIsLoading, fetchError, setFetchError }) => {
  const USERS_API = "http://localhost:2000/users";
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(USERS_API);
        if (!response.ok) throw Error('Did not received expected data');
        const listUsers = await response.json();
        setUsers(listUsers);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    (async () => await fetchUser())();

  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please type in username and password.');
      return;
    }
    const foundUser = users.find(user => user.username === username);
    if (!foundUser) {
      setMessage('username or password is not correct!');
      return;
    }
    const match = foundUser.password === password;
    if (!match) {
      setMessage('username or password is not correct!');
    } else {
      setMessage('');
      navigate('/home');
    }
    
  }



  return (
    <div style={{
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection: 'column'
    }}>

      <form className='loginForm' onSubmit={handleLogin}>
        {message && <p style={{color: 'red'}}>{message}</p>}
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

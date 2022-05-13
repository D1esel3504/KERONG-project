import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';

const LoginForm = () => {
  let history = useNavigate();
  let [userEmail, setEmail] = useState('');
  let [userPassword, setPassword] = useState('');

  // 'kemalkalandarov@gmail.com'
  // 'test123'

  let userData = {
    email: userEmail,
    password: userPassword,
  }

  let handleLogIn = (e) => {
    e.preventDefault();

    try {
      fetch('https://tms-js-pro-back-end.herokuapp.com/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }).then((response) => {
        if (response.status === 200) {
          history('/')
        }
        
      })
    } catch (error) {
      console.log('SERVER ERROR')
    }
  }

  return (
    <div>
      <form className='form' onSubmit={handleLogIn}>
        <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='ENTER EMAIL' />
        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='ENTER PASSWORD' />
        <button type='submit'>LOG IN</button>
      </form>
    </div>
  );
};

export default LoginForm;
import React from 'react'
import './LoginForm.scss';

const LoginForm = () => {

  return (
    <div>
      <form className='form'>
        <input type='text' placeholder='ENTER EMAIL' />
        <input type='password' placeholder='ENTER PASSWORD' />
        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
};

export default LoginForm;

import React from 'react'
import CheckLocks from '../../components/CheckLocks';
import logo from '../../image/logo.jpg'
import './Container.scss';

const Container = ({children}) => {

  return (
    <div className = 'container'>
      <div className = 'header'>
        <img className = 'header__logo' alt='logo' src={logo} />
        <CheckLocks />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Container;

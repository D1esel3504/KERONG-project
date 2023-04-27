import React, { FC, useEffect, useState } from 'react';
import CheckLocks from '../CheckLocks';
import logo from '../../image/logo.jpg';
import './Layout.scss';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout: FC = () => {
  return (
    <>
      <div className="header-layout">
        <Header />
        <CheckLocks />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

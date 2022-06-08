import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute: FC = () => {
  let location = useLocation();

  let token: string | null = localStorage.getItem('TOKEN')

  let redirectionScreen = token ? (
    <Navigate to='/' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );

  return token ? <Outlet /> : redirectionScreen;
}

export default PrivateRoute;

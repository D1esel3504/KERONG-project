import Controllers from '../../modules/Controllers';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute: FC = () => {
  let token: string | null = localStorage.getItem('TOKEN')


  let redirectionScreen = token ? (
    <Navigate to='/not-found' />
  ) : (
    <Navigate to='/login' />
  );

  return token ? <Controllers /> : redirectionScreen;
}

export default PrivateRoute;

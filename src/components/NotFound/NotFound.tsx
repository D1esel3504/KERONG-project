import { Button, Typography } from 'antd';
import Header from '../Header/Header';
import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import './NotFound.scss';

const NotFound: FC = () => {
  return (
    <div className='main'>
      <Header />
      <Typography.Title level={1}>PAGE NOT FOUND!</Typography.Title>
      <Button danger type="primary" size='large'>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  )
};

export default NotFound;
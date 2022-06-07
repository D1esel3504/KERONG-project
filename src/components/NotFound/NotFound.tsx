import { Button, Typography } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import './NotFound.scss';

const NotFound: FC = () => {
  return (
    <div className='main'>
      <Typography.Title level={1}>PAGE NOT FOUND!</Typography.Title>
      <Button danger type="primary" size='large'>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  )
};

export default NotFound;
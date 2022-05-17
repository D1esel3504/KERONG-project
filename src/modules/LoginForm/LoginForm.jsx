import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
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

  let handleLogIn = () => {

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
    <div className='form'>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleLogIn}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            LOG IN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

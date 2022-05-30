import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import 'antd/dist/antd.css';
import './LoginForm.scss';

const LoginForm = () => {
  let history = useNavigate();
  let [userEmail, setEmail] = useState<string>('');
  let [userPassword, setPassword] = useState<string>('');
  let [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  // 'kemalkalandarov@gmail.com'
  // 'test123'

  let userData: object = {
    email: userEmail,
    password: userPassword
  };

  let handleLogIn = async () => {
    try {
      let response = await fetch(
        'https://tms-js-pro-back-end.herokuapp.com/api/users/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        }
      );

      if (response.status === 200) {
        history('/');
      } else {
        setIsShowAlert(true);
        console.log(response);
      }
    } catch (error) {
      setIsShowAlert(true);
      console.log('dsdsd', error);
    }
  };

  return (
    <div className="form">
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
          <Input onChange={e => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={e => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            LOG IN
          </Button>
        </Form.Item>
      </Form>
      {isShowAlert && (
        <Alert
          message="Error"
          description="Check your email and password"
          type="error"
          showIcon
          closable
        />
      )}
    </div>
  );
};

export default LoginForm;

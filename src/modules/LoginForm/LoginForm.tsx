import React, { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import 'antd/dist/antd.css';
import './LoginForm.scss';
import axios from 'axios';
import Header from '../../components/Header/Header';

const LoginForm: FC = () => {
  let history = useNavigate();
  let [userEmail, setEmail] = useState<string>('');
  let [userPassword, setPassword] = useState<string>('');
  let [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  let handleLogIn = async () => {
    try {
      await axios({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: {
          email: userEmail,
          password: userPassword
        },
      })
        .then((res) => {
          if (res.status === 201) {
            let token: string = '12345'
            localStorage.setItem("TOKEN", token)
            history('/')
          }
        })
    } catch (error) {
      setIsShowAlert(true);
    }
  }

  return (
    <div className="form">
      <Header />
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

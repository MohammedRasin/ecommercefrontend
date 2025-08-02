import './user.css';
import { Input, Button, Card, Space, Typography, notification } from 'antd';
import { useState } from 'react';
import axios from '../../Utils/axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const UserLogin = () => {
  const Navigate = useNavigate();

  const [login, setLogin] = useState({ email: '', password: '' });

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const onLogin = async () => {
    if (!login.email || !login.password) {
      notification.error({
        message: 'Login Failed',
        description: 'Please fill in both email and password fields.',
        placement: 'topRight',
        duration: 2,
      });
      return;
    }

    try {
      const response = await axios.post('/user/login', login);
      localStorage.setItem('ID', response.data.id);
      localStorage.setItem('TOKEN', response.data.token);
      localStorage.setItem('ROLE', response.data.role);

      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in.',
        placement: 'topRight',
        duration: 2,
      });

      Navigate('/user/Home');
    } catch (e) {
      notification.error({
        message: 'Login Failed',
        description:
          e.response?.data?.message || 'Email or password is incorrect.',
        placement: 'topRight',
        duration: 2,
      });
    }
  };

  const goToSignup = () => {
    Navigate('/user/signup');
  };

  return (
    <div className="userLogin-container">
      <div className="userLogin-wrapper">
        {/* Left Side: Company Image */}
        <div className="userLogin-image"></div>

        {/* Right Side: Login Form */}
        <div className="userLogin-card">
          <Card
            title={<Title level={3}> Login</Title>}
            bordered={false}
            style={{ width: '100%' }}
          >
            <div className="userLogin-form">
              <Space
                direction="vertical"
                size="large"
                style={{ width: '100%' }}
              >
                <div className="userLogin-form-item">
                  <span style={{ textAlign: 'left' }}>Email</span>
                  <Input
                    onChange={e => onChange(e, 'email')}
                    placeholder="Enter your email"
                    className="userLogin-input"
                    size="large"
                  />
                </div>

                <div className="userLogin-form-item">
                  <span style={{ textAlign: 'left' }}>Password</span>
                  <Input.Password
                    onChange={e => onChange(e, 'password')}
                    placeholder="Enter your password"
                    className="userLogin-input"
                    size="large"
                  />
                </div>

                <Button
                  type="primary"
                  onClick={onLogin}
                  className="userLogin-button"
                  block
                  size="large"
                >
                  Log In
                </Button>

                <Typography.Text className="userLogin-signup">
                  Don't have an account?{' '}
                  <Button type="link" onClick={goToSignup}>
                    Sign Up
                  </Button>
                </Typography.Text>
              </Space>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

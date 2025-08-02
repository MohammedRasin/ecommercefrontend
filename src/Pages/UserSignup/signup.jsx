import './signup.css';
import { Input, Button, Card, Space, Typography, notification } from 'antd';
import { useState } from 'react';
import axios from '../../Utils/axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const UserSignup = () => {
  const Navigate = useNavigate();

  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (e, key) => {
    setSignup({ ...signup, [key]: e.target.value });
  };

  const onSignup = async () => {
    if (!signup.name || !signup.email || !signup.password) {
      notification.error({
        message: 'Signup Failed',
        description: 'Please fill in all the fields.',
        placement: 'topRight',
        duration: 2,
      });
      return;
    }

    try {
      await axios.post('/user/signup', signup);

      notification.success({
        message: 'Signup Successful',
        description: 'You have successfully signed up. Please log in.',
        placement: 'topRight',
        duration: 2,
      });

      Navigate('/'); // Redirect to login page after successful signup
    } catch (e) {
      notification.error({
        message: 'Signup Failed',
        description:
          e.response?.data?.message || 'An error occurred during signup.',
        placement: 'topRight',
        duration: 2,
      });
    }
  };

  const goToLogin = () => {
    Navigate('/');
  };

  return (
    <div className="userSignup-container">
      <div className="userSignup-wrapper">
        {/* Left Side: Company Image */}
        <div className="userSignup-image"></div>

        {/* Right Side: Signup Form */}
        <div className="userSignup-card">
          <Card
            title={
              <Title level={3}>
                <p>Create an Account</p>
              </Title>
            }
            bordered={false}
            style={{ width: '100%' }}
          >
            <div className="userSignup-form">
              <Space
                direction="vertical"
                size="large"
                style={{ width: '100%' }}
              >
                <div className="userSignup-form-item">
                  <span style={{ textAlign: 'left' }}>Name</span>
                  <Input
                    onChange={e => onChange(e, 'name')}
                    placeholder="Enter your name"
                    className="userSignup-input"
                    size="large"
                  />
                </div>

                <div className="userSignup-form-item">
                  <span style={{ textAlign: 'left' }}>Email</span>
                  <Input
                    onChange={e => onChange(e, 'email')}
                    placeholder="Enter your email"
                    className="userSignup-input"
                    size="large"
                  />
                </div>

                <div className="userSignup-form-item">
                  <span style={{ textAlign: 'left' }}>Password</span>
                  <Input.Password
                    onChange={e => onChange(e, 'password')}
                    placeholder="Enter your password"
                    className="userSignup-input"
                    size="large"
                  />
                </div>

                <Button
                  type="primary"
                  onClick={onSignup}
                  className="userSignup-button"
                  block
                  size="large"
                >
                  Create Account
                </Button>
                <div className="others">
                  <p>----------------Or register With----------------</p>
                  <div className="twoButton">
                    <Button>
                      <i class="fa-brands fa-chrome"></i>Google
                    </Button>
                    <Button>
                      <i class="fa-brands fa-apple"></i>Apple
                    </Button>
                  </div>
                </div>
                <Typography.Text className="userSignup-login">
                  Already have an account?{' '}
                  <Button type="link" onClick={goToLogin}>
                    Log In
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

export default UserSignup;

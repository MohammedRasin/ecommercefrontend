import './AdminLogin.css';
import { Input, Button, Card, Space, Typography, notification } from 'antd';
import { useState } from 'react';
import axios from '../../../Utils/axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const AdminLogin = () => {
  const Navigate = useNavigate();

  const [login, setLogin] = useState({ email: '', password: '' });

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const onLogin = async () => {
    try {
      const response = await axios.post('/admin/login', login);
      localStorage.setItem('ID', response.data.id);
      localStorage.setItem('TOKEN', response.data.token);
      localStorage.setItem('ROLE', response.data.role);

      // Using Ant Design's notification component for success message
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in as an admin.',
        placement: 'topRight',
        duration: 2,
      });

      Navigate('/admin/ListProduct');  // Redirecting to dashboard after successful login
    } catch (e) {
      if (e.status === 400) {
        notification.error({
          message: 'Login Failed',
          description: 'Email or password is incorrect.',
          placement: 'topRight',
          duration: 2,
        });
      } else {
        notification.error({
          message: 'Error',
          description: e.message,
          placement: 'topRight',
          duration: 2,
        });
      }
    }
  };

  return (
    <div className="adminLogin-container">
      <Card
        className="adminLogin-card"
        title={
          <Title level={3} style={{ textAlign: 'center' }}>
            Admin Login
          </Title>
        }
        bordered={false}
        style={{ width: 400 }}
      >
        <div className="adminLogin-form">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div className="adminLogin-form-item">
              <p>Email</p>
              <Input
                onChange={e => onChange(e, 'email')}
                placeholder="Enter your email"
                style={{ backgroundColor: '#f0f2f5' }}
                className="adminLogin-input"
                size="large"
              />
            </div>

            <div className="adminLogin-form-item">
              <p>Password</p>
              <Input.Password
                onChange={e => onChange(e, 'password')}
                placeholder="Enter your password"
                style={{ backgroundColor: '#f0f2f5' }}
                className="adminLogin-input"
                size="large"
              />
            </div>

            <Button
              type="primary"
              onClick={onLogin}
              style={{
                backgroundColor: '#2C4875',
                borderColor: '#2C4875',
                fontSize: '16px',
                padding: '10px 20px',
              }}
              block
              size="large"
            >
              Log In
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;

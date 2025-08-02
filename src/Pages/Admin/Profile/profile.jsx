import AdminLayout from '../../../Components/AdminLayout/Admin';
import './profile.css';
import { useState, useEffect } from 'react';
import axios from '../../../Utils/axios';
import { Card, Avatar, Button } from 'antd';
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Profile = () => {
  const [profiles, setProfiles] = useState([]);

  // Fetch admin profile details
  const getProfiles = async () => {
    try {
      const response = await axios.get('/admin/profile');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <AdminLayout>
      <div className="profile-container">
        {profiles.map(profile => (
          <Card key={profile._id} className="profile-card">
            <div className="profile-header">
              <Avatar
                size={120}
                src={profile.image}
                icon={<UserOutlined />}
                className="profile-avatar"
              />
              <h2>{profile.name || 'Admin Name'}</h2>
              <p className="profile-role">Administrator</p>
            </div>
            <div className="profile-details">
              <p>
                <MailOutlined /> Email: {profile.email || 'N/A'}
              </p>
              <p>
                <PhoneOutlined /> Phone: {profile.phonenumber || 'N/A'}
              </p>
              <p>
                <UserOutlined /> Username: {profile.username || 'N/A'}
              </p>
            </div>
            <Button
              type="primary"
              icon={<EditOutlined />}
              className="edit-button"
            >
              Edit Profile
            </Button>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Profile;

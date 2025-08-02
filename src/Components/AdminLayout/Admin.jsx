import './admin.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminLayout = ({ children, heading }) => {
  const Navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('ID');
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('ROLE');
    Navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      <nav>
        <div className="nav">
          <p>GeekyStore</p>
          <p>AdminPanel</p>
          <i class="fa-regular fa-bell"></i>
        </div>
        <div className="center">
          <div className="sidebar">
            <h5 style={{ padding: '5px' }}>Pages</h5>
            <Button onClick={() => Navigate('/admin/Home')} className="buttons">
              <i className="fa-solid fa-house"></i> Home
            </Button>
            <Button
              onClick={() => Navigate('/admin/ListProduct')}
              className="buttons"
            >
              <i className="fa-brands fa-product-hunt"></i> Products
            </Button>
            <Button
              onClick={() => Navigate('/admin/Profile')}
              className="buttons"
            >
              <i className="fa-solid fa-user"></i> Profile
            </Button>
            <Button
              onClick={() => Navigate('/admin/Order')}
              className="buttons"
            >
              <i className="fa-solid fa-box"></i> Orders
            </Button>

            <h5 style={{ padding: '5px' }}>Others</h5>
            <Button className="buttons">
              <i className="fa-solid fa-gear"></i> Settings
            </Button>
            <Button onClick={onLogout} className="buttons">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </Button>
          </div>
          <div className="contents">
            <h2 style={{ paddingLeft: '10px', textAlign: 'center' }}>
              {heading}
            </h2>
            <div className="contents2">{children}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminLayout;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Menu, Button } from 'antd';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleMenuClick = e => {
    if (e.key === 'admin') {
      navigate('/admin/Login');
    }
  };

  const onLogout = () => {
    localStorage.removeItem('ID');
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('ROLE');
    navigate('/');
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="admin">Admin Login</Menu.Item>
      <Menu.Item onClick={onLogout} key="user">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="navbar">
      <div className="logo" onClick={() => navigate('/user/Home')}>
        <span>
          geeky <span className="highlight">Store</span>
        </span>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <a onClick={() => navigate('/user/Home')}>Home</a>
          </li>
          <li>
            <a onClick={() => navigate('/user/shop')}>Shop</a>
          </li>
          <li>
            <a onClick={() => navigate('/user/about')}>About Us</a>
          </li>
          <li>
            <a onClick={() => navigate('/user/customer')}>Customer Service</a>
          </li>
          <li>
            <a onClick={() => navigate('/user/OrdersPage')}>Orders</a>
          </li>
        </ul>
      </nav>

      <div className="icons">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <span className="icon">
            <FontAwesomeIcon icon={faUser} /> Profile
          </span>
        </Dropdown>
        <span className="icon cart-icon" onClick={() => navigate('/user/cart')}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
      </div>
    </header>
  );
};

export default Navbar;

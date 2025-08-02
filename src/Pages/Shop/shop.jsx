import React from 'react';
import './shop.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/navbar';

const ShopPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="shop-page">
        <h1 className="shop-title">Shop by Category</h1>
        <div className="category-container">
          <div
            className="category-card"
            onClick={() => navigate('/user/shop/dress')}
          >
            <img
              src="/public/9d06fce8-2e39-40b9-a2cd-70b0e37940651702574026910HERENOWMenRedCasualShirt6.jpg"
              alt="Dress Collection"
              className="category-image"
            />
            <h2 className="category-title">Dress</h2>
          </div>

          <div
            className="category-card"
            onClick={() => navigate('/user/shop/watches')}
          >
            <img
              src="/public/all_mob.png"
              alt="Watches Collection"
              className="category-image"
            />
            <h2 className="category-title">Watches</h2>
          </div>

          <div
            className="category-card"
            onClick={() => navigate('/user/shop/shoes')}
          >
            <img
              src="/public/WhatsApp Image 2025-01-21 at 17.45.55_e533ad57.jpg"
              alt="Shoes Collection"
              className="category-image"
            />
            <h2 className="category-title">Shoes</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;

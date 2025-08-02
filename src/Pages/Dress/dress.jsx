// src/pages/DressCategory.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../Utils/axios';
import './dress.css';
import { useNavigate } from 'react-router-dom';

const DressCategory = () => {
  const Navigate = useNavigate();
  const [dresses, setDresses] = useState([]);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const response = await axios.get('/product');
        const filteredDresses = response.data.filter(
          product => product.ProductCategory.toLowerCase() === 'dress'
        );
        setDresses(filteredDresses);
      } catch (error) {
        console.error('Error fetching dresses:', error);
      }
    };

    fetchDresses();
  }, []);

  return (
    <>
      <section className="dress-category-page">
        <h2 style={{ textAlign: 'center' }} className="section-title">
          Dress <span className="highlight">COLLECTIONS</span>
        </h2>
        <p style={{ textAlign: 'center' }} className="section-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et corrupti
          veniam neque non ex voluptate vitae, repellat veritatis maxime vel
          quam necessitatibus laborum magni maiores quidem placeat? Repellat,
          nihil iure!
        </p>
        <div className="dress-grid">
          {dresses.length > 0 ? (
            dresses.map(dress => (
              <div
                onClick={() => Navigate('/user/Shop')}
                key={dress._id}
                className="dress-card"
              >
                <img
                  src={dress.image}
                  alt={dress.Productname}
                  className="dress-image"
                />
                <h2 className="dress-name">{dress.Productname}</h2>
              </div>
            ))
          ) : (
            <p className="no-products">No dresses available in this category</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DressCategory;

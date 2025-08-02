// src/pages/ShoeCategory.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../Utils/axios';
import './shoe.css';
import { useNavigate } from 'react-router-dom';

const ShoeCategory = () => {
  const Navigate = useNavigate();
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get('/product');
        const filteredShoes = response.data.filter(
          product => product.ProductCategory.toLowerCase() === 'shoes'
        );
        setShoes(filteredShoes);
      } catch (error) {
        console.error('Error fetching shoes:', error);
      }
    };

    fetchShoes();
  }, []);

  return (
    <>
      <section className="shoe-category-page">
        <h2 style={{ textAlign: 'center' }} className="section-title">
          Shoe <span className="highlight">COLLECTIONS</span>
        </h2>
        <p style={{ textAlign: 'center' }} className="section-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et corrupti
          veniam neque non ex voluptate vitae, repellat veritatis maxime vel
          quam necessitatibus laborum magni maiores quidem placeat? Repellat,
          nihil iure!
        </p>
        <div className="shoe-grid">
          {shoes.length > 0 ? (
            shoes.map(shoe => (
              <div
                onClick={() => Navigate('/user/Shop')}
                key={shoe._id}
                className="shoe-card"
              >
                <img
                  src={shoe.image}
                  alt={shoe.Productname}
                  className="shoe-image"
                />
                {/* <h2 className="shoe-name">{shoe.Productname}</h2> */}
              </div>
            ))
          ) : (
            <p className="no-products">No shoes available in this category</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoeCategory;

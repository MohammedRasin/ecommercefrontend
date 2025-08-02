// src/pages/WatchesCategory.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../Utils/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/navbar';
import './watches.css';

const WatchesCategory = () => {
    const Navigate=useNavigate()
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get('/product');
        const filteredWatches = response.data.filter(
          product => product.ProductCategory.toLowerCase() === 'watches'
        );
        setWatches(filteredWatches);
      } catch (error) {
        console.error('Error fetching watches:', error);
      }
    };

    fetchWatches();
  }, []);

  return (
    <>
      <section className="watches-category-page">
        <h2 style={{ textAlign: 'center' }} className="section-title">
          Watch <span className="highlight">COLLECTIONS</span>
        </h2>
        <p style={{textAlign:'center'}} className="section-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et corrupti
          veniam neque non ex voluptate vitae, repellat veritatis maxime vel
          quam necessitatibus laborum magni maiores quidem placeat? Repellat,
          nihil iure!
        </p>
        <div className="watches-grid">
          {watches.length > 0 ? (
            watches.map(watch => (
              <div  onClick={() => Navigate('/user/Shop')} key={watch._id} className="watch-card">
                <img
                  src={watch.image}
                  alt={watch.Productname}
                  className="watch-image"
                />
                <h2 className="watch-name">{watch.Productname}</h2>
              </div>
            ))
          ) : (
            <p className="no-products">No watches available in this category</p>
          )}
        </div>
      </section>
    </>
  );
};

export default WatchesCategory;

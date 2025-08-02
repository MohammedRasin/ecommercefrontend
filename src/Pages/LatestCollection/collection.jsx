import React, { useEffect, useState } from 'react';
import axios from '../../Utils/axios';
import './collection.css';
import { useNavigate } from 'react-router-dom';

const LatestCollections = () => {
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product'); // Adjust the URL to your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <section className="latest-collections">
        <h2 className="section-title">
          LATEST <span className="highlight">COLLECTIONS</span>
        </h2>
        <p className="section-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et corrupti
          veniam neque non ex voluptate vitae, repellat veritatis maxime vel
          quam necessitatibus laborum magni maiores quidem placeat? Repellat,
          nihil iure!
        </p>

        <div className="product-grid">
          {/* Display only the first 5 products */}
          {products.slice(0, 5).map(product => (
            <div
              onClick={() => Navigate('/user/Shop')}
              className="product-card"
              key={product._id}
            >
              <img src={product.image} alt={product.name} />
              <h3 className="product-name">{product.Productname}</h3>
              <p className="product-price">₹ {product.ProductPrice}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default LatestCollections;

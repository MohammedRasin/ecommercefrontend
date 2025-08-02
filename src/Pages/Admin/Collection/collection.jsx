import { useParams } from 'react-router-dom';
import axios from '../../../Utils/axios';
import { useEffect, useState } from 'react';

const CollectionPage = () => {
  const { category } = useParams(); // Get the category from the URL parameter
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/product?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h2>{category} Collection</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(item => (
            <div key={item._id} className="product-card">
              <div className="product-image">
                <img src={item.image} alt={item.Productname} />
              </div>
              <h4 className="product-name">{item.Productname}</h4>
              <p className="product-price">₹ {item.ProductPrice}</p>
              <p className="product-sizes">Sizes: {item.ProductSize.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No products available in this category</p>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;

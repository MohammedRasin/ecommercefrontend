import React, { useEffect, useState } from 'react';
import axios from '../../Utils/axios';
import { notification } from 'antd';

import './productList.css';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import { Button, Card } from 'antd';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const { Meta } = Card;

const ProductCategory = () => {
  const Navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cart, setCart] = useState([]);

  // Fetch and filter products by category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product');
        const filteredProducts = response.data.filter(
          product =>
            product.ProductCategory.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  // Load cart from localStorage if exists
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Handle size selection
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prevSizes => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  // Handle "Shop Now" button click
  const handleShopNow = product => {
    if (!selectedSizes[product._id]) {
      alert('Please select a size before proceeding.');
      return;
    }

    Navigate('/user/OrderPage', {
      state: {
        Productname: product.Productname,
        ProductPrice: product.ProductPrice,
        ProductSize: selectedSizes[product._id],
        ProductImage: product.image,
      },
    });
  };

  const openNotification = () => {
    notification.success({
      message: 'Success',
      description: 'Product successfully added to cart!',
      placement: 'topRight',
    });
  };

  // Handle Add to Cart button click
  const handleAddToCart = product => {
    if (!selectedSizes[product._id]) {
      alert('Please select a size before adding to cart.');
      return;
    }

    const newCartItem = {
      productId: product._id,
      Productname: product.Productname,
      ProductPrice: product.ProductPrice,
      ProductSize: selectedSizes[product._id],
      ProductImage: product.image,
    };

    const updatedCart = [...cart, newCartItem];
    setCart(updatedCart);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Show success notification
    openNotification();

    // Optionally, navigate to the cart page after adding the product
    Navigate('/user/cart', {
      state: { cart: updatedCart },
    });
  };

  return (
    <>
      <Navbar />
      <section className="product-category-page">
        <h1 className="category-title">{category} Collection</h1>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <Card
                key={product._id}
                hoverable
                cover={<img alt={product.Productname} src={product.image} />}
                style={{ width: 240, marginBottom: '20px' }}
              >
                <Meta
                  title={product.Productname}
                  description={`$ ${product.ProductPrice}`}
                />

                <div className="product-sizes">
                  <strong>Select Size:</strong>
                  <div className="size-buttons">
                    {product.ProductSize?.map(size => (
                      <Button
                        key={size}
                        type={
                          selectedSizes[product._id] === size
                            ? 'primary'
                            : 'default'
                        }
                        size="small"
                        className="size-button"
                        onClick={() => handleSizeSelect(product._id, size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="product-actions">
                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{ marginTop: 10 }}
                    onClick={() => handleShopNow(product)}
                  >
                    Shop Now
                  </Button>
                  <Button
                    type="dashed"
                    size="large"
                    block
                    icon={<FaShoppingCart />}
                    style={{ marginTop: 10 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
                <Button
                  type="link"
                  size="large"
                  icon={<FaHeart />}
                  style={{ marginTop: 10 }}
                  onClick={() => alert('Liked!')}
                >
                  Like
                </Button>
              </Card>
            ))
          ) : (
            <p className="no-products">
              No products available in this category
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductCategory;

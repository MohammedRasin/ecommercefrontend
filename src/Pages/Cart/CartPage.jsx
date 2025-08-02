import React, { useEffect, useState } from 'react';
import CartItem from '../../Components/CartItem/CartItem';
import './CartPage.css';

const CartPage = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart data from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/cart/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  // Remove item handler
  const handleRemove = async productId => {
    try {
      const res = await fetch(`/api/cart/${userId}/${productId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to remove item');
      const data = await res.json();
      setCart(data.cart); // update cart after removal
    } catch (err) {
      alert(err.message || 'Error removing item');
    }
  };

  if (loading) return <p className="loading-text">Loading cart...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;
  if (!cart || cart.items.length === 0)
    return <p className="empty-text">Your cart is empty.</p>;

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items-list">
        {cart.items.map(item => (
          <CartItem key={item.productId} item={item} onRemove={handleRemove} />
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: ₹{cart.totalPrice.toFixed(2)}</h3>
        {/* Add Checkout Button or Payment flow here */}
      </div>
    </div>
  );
};

export default CartPage;

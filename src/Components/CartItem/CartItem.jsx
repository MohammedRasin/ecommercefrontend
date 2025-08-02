import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <img
        className="cart-item-image"
        src={item.ProductImage}
        alt={item.ProductName}
      />
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.ProductName}</h3>
        <p className="cart-item-size">Size: {item.ProductSize}</p>
        <p className="cart-item-price">Price: ₹{item.ProductPrice}</p>
        <p className="cart-item-quantity">Quantity: {item.quantity}</p>
      </div>
      <button
        className="cart-item-remove-btn"
        onClick={() => onRemove(item.productId)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;

import React, { useEffect, useState } from 'react';
import axios from '../../../Utils/axios'; // Ensure axios is properly imported
import AdminLayout from '../../../Components/AdminLayout/Admin';
import './Adminorder.css';

const AdminOrderListing = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/order');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle deleting an order
  const handleDeleteOrder = async orderId => {
    try {
      const response = await axios.delete(`/order/${orderId}`);
      if (response.status === 200) {
        setOrders(prevOrders =>
          prevOrders.filter(order => order._id !== orderId)
        );
        alert('Order deleted successfully');
      } else {
        alert('Failed to delete the order. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting the order:', error);
      alert('There was an error deleting the order. Please try again.');
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="admin-order-listing-container">
          <h1 className="admin-order-listing-title">Your Orders</h1>

          {orders.length === 0 ? (
            <p className="admin-no-orders">No orders to display</p>
          ) : (
            <div className="admin-order-list">
              {orders.map(order => (
                <div className="admin-order-card" key={order._id}>
                  <div className="admin-order-card-header">
                    <span className="admin-order-id">
                      Order ID: {order._id}
                    </span>
                    <span className="admin-order-date">
                      Ordered On:{' '}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="admin-order-card-body">
                    <div className="admin-product-image-container">
                      <img
                        src={order.productImage}
                        alt="Product"
                        className="admin-product-image"
                      />
                    </div>
                    <div className="admin-order-details">
                      <h3>{order.productName}</h3>
                      <p>Customer: {order.customerName}</p>
                      <p>Phone Number: {order.phoneNumber}</p>{' '}
                      {/* Displaying phone number */}
                      <p>Price: ₹ {order.productPrice}</p>
                      <p>
                        Payment Method:{' '}
                        <span className="admin-payment-method">
                          {order.paymentMethod}
                        </span>
                      </p>
                      <p>
                        Status:{' '}
                        <span
                          className={`admin-status ${
                            order.status === 'Shipped' ? 'shipped' : 'pending'
                          }`}
                        >
                          {order.status}
                        </span>
                      </p>
                      {/* Product received time */}
                      {order.receivedAt && (
                        <p>
                          Product Received On:{' '}
                          {new Date(order.receivedAt).toLocaleDateString()} at{' '}
                          {new Date(order.receivedAt).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="admin-order-card-footer">
                    <button
                      className="admin-view-details"
                      onClick={() => alert('Order details')}
                    >
                      View Details
                    </button>
                    {order.status !== 'Cancelled' && (
                      <button
                        className="admin-delete-order"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Delete Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminOrderListing;

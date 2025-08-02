import React, { useEffect, useState } from 'react';
import axios from '../../Utils/axios'; // Ensure axios is properly imported
import { Table, Tag, Button, Space } from 'antd';
import './order.css';
import Navbar from '../Navbar/navbar';

const OrderListing = () => {
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
      // Send delete request to backend with the orderId in the URL
      const response = await axios.delete(`/order/${orderId}`);
      if (response.status === 200) {
        // Remove the deleted order from the state
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

  // Columns for Ant Design Table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: text => <span className="order-id">{text}</span>,
    },
    {
      title: 'Product Image',
      dataIndex: 'productImage',
      key: 'productImage',
      render: text => (
        <img src={text} alt="Product" className="product-image" />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber', // Added phone number column
      key: 'phoneNumber',
    },
    {
      title: 'Total Price',
      dataIndex: 'productPrice',
      key: 'productPrice',
      render: text => `₹ ${text}`,
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: text => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === 'Shipped' ? 'green' : 'orange'}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => alert('Order details')}>
            View Details
          </Button>
          {record.status !== 'Cancelled' && (
            <Button
              type="link"
              danger
              onClick={() => handleDeleteOrder(record._id)} // Changed to handleDeleteOrder
            >
              Delete Order
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="order-listing-container">
        <h1 className="order-listing-title">Your Orders</h1>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={false}
          className="order-list-table"
        />
      </div>
    </>
  );
};

export default OrderListing;

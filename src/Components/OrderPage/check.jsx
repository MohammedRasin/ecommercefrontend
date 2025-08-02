import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './check.css';
import { Card, Form, Input, Button, Row, Col, Select } from 'antd';
import axios from '../../Utils/axios'; // Ensure axios is properly imported

const { Option } = Select;

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Productname, ProductPrice, ProductSize, ProductImage } =
    location.state || {};

  const onFinish = async values => {
    const orderData = {
      productName: Productname,
      productPrice: ProductPrice,
      productSize: ProductSize,
      productImage: ProductImage,
      customerName: values.fullName,
      customerAddress: values.address,
      customerCity: values.city,
      customerPostalCode: values.postalCode,
      customerCountry: values.country,
      phoneNumber: values.phoneNumber, // Add phone number to order data
      paymentMethod: values.paymentMethod, // Add payment method to order data
    };

    try {
      console.log('Order Data:', orderData); // Check the data being sent to the backend
      const response = await axios.post('/order', orderData);

      if (response.status === 200) {
        alert('Order placed successfully!');
        navigate('/user/OrdersPage'); // Redirect to order success page (you can create this page)
      } else {
        alert('Order failed, please try again.');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      alert('There was an error placing the order. Please try again.');
    }
  };

  return (
    <div className="order-form-container">
      <h1 className="order-form-title">Order Details</h1>
      <Row gutter={[16, 24]} justify="center">
        <Col xs={24} md={12} lg={10}>
          <Card className="order-summary-card">
            <h2>Product Details</h2>
            {ProductImage && (
              <div className="product-image-container">
                <img
                  src={ProductImage}
                  alt={Productname}
                  className="order-product-image"
                />
              </div>
            )}
            <p>
              <strong>Product Name:</strong> {Productname}
            </p>
            <p>
              <strong>Product Price:</strong> ₹ {ProductPrice}
            </p>
            <p>
              <strong>Product Size:</strong> {ProductSize}
            </p>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={10}>
          <Card className="order-form-card">
            <h2>Shipping Information</h2>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: 'Please enter your full name' },
                ]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  {
                    pattern: /^\d{10}$/,
                    message: 'Please enter a valid 10-digit phone number',
                  },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: 'Please enter your address' },
                ]}
              >
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please enter your city' }]}
              >
                <Input placeholder="City" />
              </Form.Item>
              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[
                  { required: true, message: 'Please enter your postal code' },
                ]}
              >
                <Input placeholder="Postal Code" />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: 'Please enter your country' },
                ]}
              >
                <Input placeholder="Country" />
              </Form.Item>

              {/* Payment Method Section */}
              <Form.Item
                label="Payment Method"
                name="paymentMethod"
                rules={[
                  { required: true, message: 'Please select a payment method' },
                ]}
              >
                <Select placeholder="Select a payment method">
                  <Option value="creditCard">Credit Card</Option>
                  <Option value="debitCard">Debit Card</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="cashOnDelivery">Cash on Delivery</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Place Order
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderForm;

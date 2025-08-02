import AdminLayout from '../../../../Components/AdminLayout/Admin';
import axios from '../../../../Utils/axios';
import { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './list.css';

const ListProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  const getProduct = async () => {
    try {
      const response = await axios.get('/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // Delete Product Function
  const deleteProduct = async id => {
    try {
      await axios.delete(`/product/${id}`);
      message.success('Product deleted successfully');
      // Refresh product list
      getProduct();
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: id => <span>{id}</span>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => (
        <img
          className="tableimage"
          src={image}
          alt="Product"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'Productname',
      key: 'Productname',
    },
    {
      title: 'Category',
      dataIndex: 'ProductCategory',
      key: 'ProductCategory',
    },
    {
      title: 'Sizes',
      dataIndex: 'ProductSize',
      key: 'ProductSize',
      render: sizes => (Array.isArray(sizes) ? sizes.join(', ') : sizes),
    },
    {
      title: 'Price',
      dataIndex: 'ProductPrice',
      key: 'ProductPrice',
      render: price => `$ ${price}`,
    },
    {
      title: 'Description',
      dataIndex: 'about',
      key: 'about',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => deleteProduct(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button style={{ color: 'white' }} type="danger">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <AdminLayout heading="Product List">
      <div className="containerlist">
        <div className="btn-Container">
          <Button
            type="primary"
            onClick={() => navigate('/admin/AddProduct')}
            style={{ marginTop: '10px' }}
          >
            Add Product
          </Button>
        </div>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </AdminLayout>
  );
};

export default ListProduct;

import AdminLayout from '../../Components/AdminLayout/Admin';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../Utils/axios';
import { Button, Select } from 'antd';
import './Edit.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference for the file input
  const [product, setProduct] = useState({
    Productname: '',
    image: '',
    about: '',
    ProductCategory: '',
    ProductPrice: '',
    ProductSize: [],
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/product/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const onChange = (e, key) => {
    setProduct({ ...product, [key]: e.target.value });
  };

  const onUpload = async e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduct(prevProduct => ({ ...prevProduct, image: reader.result }));
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('avatar', file);
      try {
        const response = await axios.post('/upload', formData);
        setProduct(prevProduct => ({
          ...prevProduct,
          image: response.data.url,
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }
  };

  // Function to trigger file input when "Edit Image" button is clicked
  const handleEditImageClick = () => {
    fileInputRef.current.click();
  };

  const onUpdateProduct = async e => {
    e.preventDefault();
    try {
      await axios.patch(`/product/${id}`, product);
      navigate('/admin/Home');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <AdminLayout>
      <form className="edit-product-form" onSubmit={onUpdateProduct}>
        <div className="form-left">
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={product.Productname}
              onChange={e => onChange(e, 'Productname')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="about">About:</label>
            <textarea
              id="about"
              value={product.about}
              onChange={e => onChange(e, 'about')}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="productCategory">Product Category:</label>
            <select
              id="productCategory"
              value={product.ProductCategory}
              onChange={e => onChange(e, 'ProductCategory')}
            >
              <option value="">Select category</option>
              <option value="Watches">Watches</option>
              <option value="Shoes">Shoes</option>
              <option value="Dress">Dress</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Product Price:</label>
            <input
              type="number"
              id="productPrice"
              value={product.ProductPrice}
              onChange={e => onChange(e, 'ProductPrice')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productSizes">Product Sizes:</label>
            <Select
              mode="multiple"
              placeholder="Select product sizes"
              onChange={value => setProduct({ ...product, ProductSize: value })}
              value={product.ProductSize}
              style={{ width: '100%' }}
              options={[
                { value: 'S', label: 'S' },
                { value: 'M', label: 'M' },
                { value: 'L', label: 'L' },
                { value: 'XL', label: 'XL' },
              ]}
            />
          </div>
        </div>

        <div className="form-right">
          <div className="form-group">
            <label htmlFor="productImage">Product Image:</label>
            <input
              type="file"
              id="productImage"
              ref={fileInputRef}
              onChange={onUpload}
              style={{ display: 'none' }} // Hide input field
            />
            <Button onClick={handleEditImageClick}>Edit Image</Button>
            {product.image && (
              <img
                src={product.image}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>

          <button type="submit" className="edit-button">
            Update Product
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditProduct;

import AdminLayout from '../../../../Components/AdminLayout/Admin';
import './Add.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../Utils/axios';
import { Select } from 'antd';

const AddProduct = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [product, setProduct] = useState({
    Productname: '',
    image: '',
    about: '',
    ProductCategory: '',
    ProductPrice: '',
    ProductSize: '',
  });

  const onChange = (e, key) => {
    setProduct({ ...product, [key]: e.target.value });
  };

  const ongetById = async () => {
    const response = await axios.get('/product/' + id);
    setProduct(response.data);
  };

  useEffect(() => {
    if (id) ongetById();
  }, [id]);

  const onUpload = async e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axios.post('/upload', formData);
    setProduct({ ...product, image: response.data.url });
  };

  const onAddProduct = async e => {
    e.preventDefault();
    if (id) {
      await axios.patch(`/product/${id}`, product);
    } else {
      await axios.post('/product', product);
      Navigate('/admin/Home');
    }
  };

  return (
    <AdminLayout >
      <form className="add-product-form" onSubmit={onAddProduct}>
        <div className="form-group">
          <label htmlFor="productImage" className="custom-file-upload">
            Choose an Image
          </label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={onUpload}
          />
          {product.image && (
            <img src={product.image} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            name="about"
            placeholder="Enter product description"
            onChange={e => onChange(e, 'about')}
            value={product.about}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            onChange={e => onChange(e, 'Productname')}
            value={product.Productname}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCategory">Product Category:</label>
          <select
            id="productCategory"
            name="productCategory"
            onChange={e => onChange(e, 'ProductCategory')}
            value={product.ProductCategory}
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
            name="productPrice"
            placeholder="Enter product price"
            onChange={e => onChange(e, 'ProductPrice')}
            value={product.ProductPrice}
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

        <button type="submit" className="add-button">
          {id ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </AdminLayout>
  );
};

export default AddProduct;

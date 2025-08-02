import AdminLayout from '../../../Components/AdminLayout/Admin';
import './homeList.css';
import axios from '../../../Utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [product, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Fetch all products
  const getProducts = async () => {
    try {
      const response = await axios.get('/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Open modal to confirm deletion
  const openDeleteModal = id => {
    setDeleteId(id);
  };

  // Close modal without deleting
  const closeDeleteModal = () => {
    setDeleteId(null);
  };

  // Confirm and delete the product
  const confirmDelete = async () => {
    try {
      await axios.delete(`/product/${deleteId}`);
      alert('Product deleted successfully!');
      setDeleteId(null);
      getProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product. Please try again.');
    }
  };

  // Navigate to edit page with product ID
  const handleEdit = id => {
    navigate(`/admin/editProduct/${id}`);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AdminLayout heading="Product List">
      <div className="Ashar-container">
        {product.length > 0 ? (
          product.map(item => (
            <div key={item._id} className="Ashar-product-card">
              <div className="Ashar-product-image">
                <img src={item.image} alt={item.Productname} />
              </div>
              <h4 className="Ashar-product-name">{item.Productname}</h4>
              <h4 className="Ashar-product-category">
                {item.ProductCategory || 'No Category'}
              </h4>
              <p className="Ashar-product-price">
                ${' '}
                {item.ProductPrice !== undefined
                  ? item.ProductPrice
                  : 'Not Available'}
              </p>
              <p className="Ashar-product-sizes">
                Available Sizes:{' '}
                {Array.isArray(item.ProductSize)
                  ? item.ProductSize.join(', ')
                  : 'No Sizes Available'}
              </p>
              <button
                className="Ashar-edit-button"
                onClick={() => handleEdit(item._id)}
              >
                Edit
              </button>
              <button
                className="Ashar-delete-button"
                onClick={() => openDeleteModal(item._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="Ashar-no-products">No products available</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="Ashar-confirmation-modal">
          <h3>Are you sure you want to delete this product?</h3>
          <div className="Ashar-modal-buttons">
            <button className="Ashar-confirm-button" onClick={confirmDelete}>
              Confirm
            </button>
            <button className="Ashar-cancel-button" onClick={closeDeleteModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminHome;

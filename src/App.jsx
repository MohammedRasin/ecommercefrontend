import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home/home';
import About from './Pages/About/about';
import AddProduct from './Pages/Admin/Product/Add/Add';
import ListProduct from './Pages/Admin/Product/List/list';
import AdminHome from './Pages/Admin/Home/list';
import Profile from './Pages/Admin/Profile/profile';
import ShopPage from './Pages/Shop/shop';
import CollectionPage from './Pages/Admin/Collection/collection';
import ProductCategory from './Components/ProductList/productList';
import OrderForm from './Components/OrderPage/check';
import OrderListing from './Components/Orders/order';
import AdminOrderListing from './Pages/Admin/Orders-Admin/Adminorder';
import AdminLogin from './Pages/Admin/LoginAdmin/Adminlogin';
import UserSignup from './Pages/UserSignup/signup';
import UserLogin from './Pages/UserLogin/user';
import PrivateRoute from './Components/PrivateRoute';
import UserPrivateRoute from './Components/PrivateRoute/userCheck';
import EditProduct from './Components/EditList/Edit';
import Customer from './Pages/CustomerService/customer';
import CartPage from './Pages/Cart/CartPage';

const App = () => {
  // Get user info from localStorage (adjust this based on your login logic)
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/Admin/Login" element={<AdminLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/" element={<UserLogin />} />

        {/* Admin protected routes */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="/admin/Home" element={<AdminHome />} />
          <Route path="/admin/Profile" element={<Profile />} />
          <Route path="/admin/Order" element={<AdminOrderListing />} />
          <Route path="/admin/ListProduct" element={<ListProduct />} />
          <Route path="/admin/editProduct/:id" element={<EditProduct />} />
          <Route path="/admin/AddProduct" element={<AddProduct />} />
        </Route>

        {/* User protected routes */}
        <Route path="/user" element={<UserPrivateRoute />}>
          <Route path="/user/Home" element={<HomePage />} />
          <Route path="/user/Shop" element={<ShopPage />} />
          <Route path="/user/shop/:category" element={<ProductCategory />} />
          <Route
            path="/user/collection/:category"
            element={<CollectionPage />}
          />
          <Route path="/user/OrderPage" element={<OrderForm />} />
          <Route path="/user/OrdersPage" element={<OrderListing />} />
          <Route path="/user/about" element={<About />} />
          <Route path="/user/customer" element={<Customer />} />

          {/* Pass userId as prop to CartPage */}
          <Route path="/user/cart" element={<CartPage userId={userId} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

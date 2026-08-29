import HomePage from "./pages/Home/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBarLogin from "./components/common/NavBarLogin";
import Footer from "./components/common/Footer";
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from "./pages/Auth/RegisterPage";
import AllCategoryPage from "./pages/Category/AllCategoryPage";
import AllBrandPage from "./pages/Brand/AllBrandPage";
import ShopProductsPage from "./pages/Products/ShopProductsPage";
import ProductDetailsPage from "./pages/Products/ProductDetailsPage";
import CartPage from "./pages/Cart/CartPage";
import ChoosePaymentMethodPage from "./pages/Checkout/ChoosePaymentMethodPage";
import AdminAllProductsPage from "./pages/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./pages/Admin/AdminAllOrdersPage";
import AdminOrderDetailsPage from "./pages/Admin/AdminOrderDetailsPage";
import AdminAddBrandPage from "./pages/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./pages/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "./pages/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./pages/Admin/AdminAddProductsPage";
import UserAllOrdersPage from "./pages/User/UserAllOrdersPage";
import UserFavoriteProductsPage from "./pages/User/UserFavoriteProductsPage";
import UserAllAddressesPage from './pages/User/UserAllAddressesPage';
import UserAddAddressPage from './pages/User/UserAddAddressPage';
import UserEditAddressPage from './pages/User/UserEditAddressPage';
import UserProfilePage from "./pages/User/UserProfilePage";
import AdminEditProductsPage from './pages/Admin/AdminEditProductsPage';
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./pages/Auth/VerifyPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import AdminAddCouponPage from "./pages/Admin/AdminAddCouponPage";
import AdminEditCouponPage from './pages/Admin/AdminEditCouponPage';
import AdminEditBrandPage from './pages/Admin/AdminEditBrandPage';
import AdminEditCategoryPage from './pages/Admin/AdminEditCategoryPage';
import AdminEditSubCategoryPage from './pages/Admin/AdminEditSubCategoryPage';
import AdminAllUsersPage from './pages/Admin/AdminAllUsersPage';
import AdminAddUserPage from './pages/Admin/AdminAddUserPage';
import AdminEditUserPage from './pages/Admin/AdminEditUserPage';
import ProtectedRouteHook from './hooks/auth/protected-route-hook';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useEffect, useState } from "react";
import ProductsByCategory from "./pages/Products/ProductsByCategory";
import ProductsByBrand from "./pages/Products/ProductsByBrand";
function App() {

  const [isUser, isAdmin, userData] = ProtectedRouteHook()


  return (
    <BrowserRouter>
      <div className="font" >
        <NavBarLogin />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrandPage />} />
          <Route path="/products" element={<ShopProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/user/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
          <Route path="/user/reset-password" element={<ResetPasswordPage />} />
          <Route path="/products/category/:id" element={<ProductsByCategory />} />
          <Route path="/products/brand/:id" element={<ProductsByBrand />} />



          <Route element={<ProtectedRoute auth={isAdmin} />}>
            <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
            <Route path="/admin/allproducts" element={<AdminAllProductsPage />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage />} />
            <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
            <Route path="/admin/editbrand/:id" element={<AdminEditBrandPage />} />
            <Route path="/admin/addcategory" element={<AdminAddCategoryPage />} />
            <Route path="/admin/editcategory/:id" element={<AdminEditCategoryPage />} />
            <Route path="/admin/addsubcategory" element={<AdminAddSubCategoryPage />} />
            <Route path="/admin/editsubcategory/:id" element={<AdminEditSubCategoryPage />} />
            <Route path="/admin/addproduct" element={<AdminAddProductsPage />} />
            <Route path="/admin/addcoupon" element={<AdminAddCouponPage />} />
            <Route path="/admin/editcoupon/:id" element={<AdminEditCouponPage />} />
            <Route path="/admin/editproduct/:id" element={<AdminEditProductsPage />} />
            <Route path="/admin/allusers" element={<AdminAllUsersPage />} />
            <Route path="/admin/adduser" element={<AdminAddUserPage />} />
            <Route path="/admin/edituser/:id" element={<AdminEditUserPage />} />
          </Route>

          <Route element={<ProtectedRoute auth={isUser} />}>
            <Route path="/user/allorders" element={<UserAllOrdersPage />} />
            <Route path="/order/paymethoud" element={<ChoosePaymentMethodPage />} />
            <Route path="/order/paymethod" element={<ChoosePaymentMethodPage />} />
            <Route path="/user/favoriteproducts" element={<UserFavoriteProductsPage />} />
            <Route path="/user/addresses" element={<UserAllAddressesPage />} />
            <Route path="/user/add-address" element={<UserAddAddressPage />} />
            <Route path="/user/edit-address/:id" element={<UserEditAddressPage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
          </Route>

        </Routes>
        <Footer />
      </div >
    </BrowserRouter>
  );
}

export default App;

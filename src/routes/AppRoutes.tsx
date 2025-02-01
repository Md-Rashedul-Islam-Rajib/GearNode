import { Route, Routes } from "react-router";
import MainLayout from "@/components/layouts/MainLayout";
import UserLayout from "@/components/layouts/UserLayout";
import ProtectedRoute from "@/components/shared/PrivateRoute";

// Admin Pages
import CreateProduct from "@/pages/admin/CreateProduct";

// Customer Pages
import Orders from "@/pages/admin/Orders";
import CustomerOrders from "@/pages/customer/CustomerOrders";

// Public Pages
import About from "@/pages/public/About";
import AllProducts from "@/pages/public/AllProducts";
import Checkout from "@/pages/public/CheckOut";
import Home from "@/pages/public/Home";
import Login from "@/pages/public/Login";
import ProductDetail from "@/pages/public/ProductDetail";
import Register from "@/pages/public/Register";
import Unauthorized from "@/pages/public/Unathourized";
import Profile from "@/pages/customer/Profile";
import UpdateProfile from "@/pages/customer/UpdateProfile";
import ChangePassword from "@/pages/customer/ChangePassword";
import AdminAllProducts from "@/pages/admin/AdminAllProducts";
import ProductEditPage from "@/pages/admin/ProductEditPage";
import AdminLayout from "@/components/layouts/AdminLayout";
import UserManagement from "@/pages/admin/UserManagement";
import ErrorPage from "@/pages/error/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* Main Layout - Customer and Public Routes */}
      <Route path="/" element={<MainLayout />}>
        {/* Common Public Pages */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="all-products/:id" element={<ProductDetail />} />

        {/* Customer Protected Routes inside MainLayout */}
        <Route
          path="customer/*"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route
          path="admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="all-products" element={<AdminAllProducts />} />
          <Route path="all-products/:id" element={<ProductEditPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
      <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;

import MainLayout from "@/components/layouts/MainLayout";
import CreateProduct from "@/pages/admin/CreateProduct";
import About from "@/pages/public/About";
import AllProducts from "@/pages/public/AllProducts";
import Checkout from "@/pages/public/CheckOut";
import Home from "@/pages/public/Home";
import Login from "@/pages/public/Login";
import ProductDetail from "@/pages/public/ProductDetail";
import Register from "@/pages/public/Register";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />

      <Route path="create-product" element={<CreateProduct />} />
      <Route path="all-products" element={<AllProducts />} />
      <Route path="all-products/:id" element={<ProductDetail />} />
      <Route path="checkout/:id" element={<Checkout />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

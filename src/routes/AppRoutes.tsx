import CreateProduct from "@/pages/admin/CreateProduct";
import AllProducts from "@/pages/public/AllProducts";
import Home from "@/pages/public/Home";
import Login from "@/pages/public/Login";
import Register from "@/pages/public/Register";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="create-product" element={<CreateProduct />} />
      <Route path="all-products" element={<AllProducts />} />
    </Routes>
  );
};

export default AppRoutes;

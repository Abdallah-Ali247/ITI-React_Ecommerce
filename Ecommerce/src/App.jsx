import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import OrdersPage from "./pages/OrdersPage";
import AdminPanel from "./pages/AdminPanel";
import AdminProductManager from "./pages/AdminProductManager";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route element={<ProtectedRoute allowedRoles={["user", "seller", "admin"]} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/products" element={<AdminProductManager />} />


        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

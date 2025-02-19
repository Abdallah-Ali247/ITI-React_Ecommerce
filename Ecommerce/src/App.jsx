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



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        {/* Protected Route for Cart */}
        <Route element={<ProtectedRoute allowedRoles={["user", "seller", "admin"]} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/products" element={<AdminProductManager />} />
        
      </Routes>
    </Router>
  );
};

export default App;

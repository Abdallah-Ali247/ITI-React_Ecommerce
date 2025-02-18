import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to Our E-Commerce Store</h1>
      <p>Browse our products and enjoy shopping!</p>
      <Link to="/products" className="btn btn-primary">View Products</Link>
    </div>
  );
};

export default Home;

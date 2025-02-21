// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/productSlice";
// import { addToCart } from "../redux/slices/cartSlice";


// const Products = () => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleAddToCart = (product) => {
//     console.log("Adding to cart:", product);
//     dispatch(addToCart(product));
//   };

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mt-5">
//       <h2>Products</h2>
//       <div className="row">
//         {products.map((product) => (
//           <div key={product.id} className="col-md-4">
//             <div className="card">
//               <img src={product.image} className="card-img-top" alt={product.name} />
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text">${product.price}</p>
//                 <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";


const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState("all");



  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    dispatch(addToCart({ product, userId: user.id }));
  };


  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const categories = ["all", ...new Set(products.map((product) => product.category))];

  return (
    <Container className="mt-5 text-center">


      {/* Category Filters */}
      <Row className="mb-5 justify-content-center">
        <Col md={6}>
          <ButtonGroup aria-label="Filter by Category">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline-primary"}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      {/* Product List */}
      <h2 className="m-5">Products</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <div className="card shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-primary w-100">Add to Cart</button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
export default Products;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { Container, Row, Col, ButtonGroup, Button, Form } from "react-bootstrap";


const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    dispatch(addToCart({ product, userId: user.id }));
    alert("Add Product to  card ?")
  };


  // Filter products based on selected category and search query
  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "all" || product.category === selectedCategory
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
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

        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3"
          />
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
                  <button className="btn btn-primary w-100"onClick={() => handleAddToCart(product)}>
                    Add to Cart</button>
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
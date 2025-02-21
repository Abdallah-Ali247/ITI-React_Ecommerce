// src/components/Slider.jsx
import React from "react";
import { Carousel } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel className="my-2">
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/pan1.png"  
          alt="Slide 1"
        />
        <Carousel.Caption>
          <h3>Exclusive Offers</h3>
          <p>Get up to 50% off on selected items!</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/pan2.png"  
          alt="Slide 2"
        />
        <Carousel.Caption>
          <h3>New Arrivals</h3>
          <p>Explore our latest collection of products.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/pan3.png"  
          alt="Slide 3"
        />
        <Carousel.Caption>
          <h3>Best Sellers</h3>
          <p>Check out our most popular products this month.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
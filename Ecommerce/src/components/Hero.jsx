// src/components/Hero.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="hero-section">
            <Container fluid>
                <Row className="d-flex justify-content-center align-items-center align-self-center">

                    <Col md={6} className="text-white text-md-start p-5 ">
                        <h1 className="display-4 fw-bold">Welcome to Ecommerce</h1>
                        <p className="lead">
                            Discover a wide range of products<br/> at competitive prices. Shop now and enjoy exclusive deals!
                        </p>
                       
                        <Link to="/products" className="btn btn-primary">Start Shopping</Link>

                    </Col>

                </Row>
            </Container>
        </section>
    );
};

export default Hero;
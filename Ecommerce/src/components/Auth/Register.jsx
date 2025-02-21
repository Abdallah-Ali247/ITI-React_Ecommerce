import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";


const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "user" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then(() => navigate("/login"));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="p-4 shadow-sm">
            <Card.Title as="h2" className="text-center mb-4">
              Register
            </Card.Title>

            {/* Error Alert */}
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Email Input */}
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Email Input */}
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-3">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="text-primary">
                    Login here
                  </a>
                </p>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Fetch users from db.json
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();

    // Find user in the database
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      dispatch(loginSuccess(user)); // Store user in Redux & localStorage
      navigate("/"); // Redirect to home page
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="p-4 shadow-sm login-card">
            <Card.Title as="h2" className="text-center mb-4">
              Login
            </Card.Title>
            <Form onSubmit={handleLogin}>
              {/* Email Input */}
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>

              {/* Register Link */}
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <a href="/register" className="text-primary">
                    Register here
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

export default Login;



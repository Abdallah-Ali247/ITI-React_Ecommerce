// src/components/Navbar.jsx
import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Use NavLink instead of LinkContainer
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";


const AppNavbar = () => {
  const { user } = useSelector((state) => state.auth); // Get the logged-in user from Redux
  const dispatch = useDispatch(); // Get the dispatch function

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    window.location.href = "/login"; // Redirect to the login page
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3 shadow-sm">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/">Ecommerce</Navbar.Brand>

        {/* Toggle Button for Small Screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Public Links */}
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
            <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>

            {/* Admin Links (Visible only to admins or sellers) */}
            {user && ["admin", "seller"].includes(user.role) && (
              <>
                <Nav.Link as={NavLink} to="/admin/products">Product Manager</Nav.Link>
              </>
            )}

            {/* Admin Links (Visible only to admins or sellers) */}
            {user && ["admin"].includes(user.role) && (
              <>
                <Nav.Link as={NavLink} to="/admin">Admin Panel</Nav.Link>
              </>
            )}
            
          </Nav>

          {/* Authentication Links */}
          <Nav className="ms-auto">
            {user ? (
              // If logged in, show logout and profile options
              <NavDropdown title={user.name} id="navbar-dropdown">
                <NavDropdown.Item onClick={() => console.log("Profile")}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // If not logged in, show login/register links
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
import { useState } from "react";
import logo from "../assets/logo.svg";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

function CustomNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    try {
      navigate(`/?category=${category}`, { replace: true });
    } catch (error) {
      console.error("Error navigating to category:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    try {
      navigate(`/?search=${searchQuery}`, { replace: true });
    } catch (error) {
      console.error("Error navigating to search results:", error);
    }
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="logo"
            style={{ width: "40px", marginRight: "5px" }}
          />
          <span className="fw-bold">DevNewsApp</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-uppercase">
              Home
            </Nav.Link>
            <NavDropdown
              title="Categories"
              id="basic-nav-dropdown"
              className="text-uppercase"
            >
              {categories.map((category) => (
                <NavDropdown.Item
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="text-capitalize"
                >
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: "10px" }}
            />
            <Button variant="outline-success" type="submit" className="px-3">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

CustomNavbar.propTypes = {
  logo: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default CustomNavbar;

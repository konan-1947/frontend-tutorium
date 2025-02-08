import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../assets/css/NavBar.css";
import "../assets/css/fonts.css";
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    
    let prevScrollPos = window.scrollY;
    const navbar = document.getElementById("navbar");

    const handleScroll = () => {
      let currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0";
      } else {
        navbar.style.top = "-80px";
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar id="navbar" expand="lg" className="mau-nen-navbar">
      <Container fluid className="mau-nen-navbar">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/assets/img/logo.png" alt="logo" width="50" height="50" className="me-2 rounded-circle border border-dark" />
          <h3 className="m-1 chu-goc-ben-trai-navbar">Tutorium</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/find" className="chu-goc-ben-trai-navbar">Find Tutor</Nav.Link>
            <Nav.Link as={Link} to="/about" className="chu-goc-ben-trai-navbar">Become a Tutor</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown" className="chu-goc-ben-trai-navbar">
              <NavDropdown.Item as={Link} to="/services">Forum</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">Contact us</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/help">Help</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="mx-auto my-2 my-lg-0 chu-goc-ben-phai-navbar">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search for tutor... "
                className="me-2"
                aria-label="Search for tutor..."
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          <Nav className="ms-auto chu-goc-ben-phai-navbar nut-dang-nhap">
            <Button onClick={() => Navigate ("/login")} size="lg" className="nut-dang-nhap" variant="none">
              <i  className="fa fa-sign-in me-3"></i> Sign in
            </Button>
          </Nav>
          <Nav className="user-menu-container">
            <div className="user-icon" onClick={() => setShowDropdown(!showDropdown)}>
              <i className="fa fa-user me-2"></i>
            </div>
            {showDropdown && (
              <div className="user-dropdown">
                <Link to="/">Home</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/lessons">My lessons</Link>
                <Link to="/saved-tutors">Saved tutors</Link>
                <Link to="/refer">Refer a friend</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/help">Help</Link>
                <hr />
                <Link to="/logout">Log out</Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

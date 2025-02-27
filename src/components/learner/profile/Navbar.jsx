import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../../assets/css/NavBarAfter.css";

import 'font-awesome/css/font-awesome.min.css';

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Tạo ref cho dropdown

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar  expand="lg" className="mau-nen-navbar-1">
      <Container fluid >
        {/* Logo + Tên */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/assets/img/logo.png" alt="logo" width="50" height="50" className="me-2 rounded-circle border border-dark" />
          <h3 className="m-1 chu-goc-ben-trai-navbar">Tutorium</h3>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
  
         
          {/* Các icon bên phải */}
          <Nav className="ms-auto user-menu-container">
         
            <Link to="/help" className="nav-icon">
              <i className="fa fa-question-circle"></i>
            </Link>     

   
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

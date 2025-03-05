import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav,  Button, Badge } from "react-bootstrap";
import { Bell, Plus } from "react-bootstrap-icons";
import "../../../assets/css/navbartutor.css";
const TutorNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="body-nav">
        <img src="/assets/img/logo.png" alt="logo" width="40" height="40" className="me-1 rounded-circle border border-dark" />
        <Navbar.Brand as={Link} to="/">Tutorium</Navbar.Brand>
        <Nav className="ms-auto align-items-center  nav-right">
          <Nav.Link href="#">
            <Bell size={20} />
            <Badge bg="danger" className="ms-1">
              9
            </Badge>
          </Nav.Link>
          <Button variant="primary" className="ms-1">
            <Plus size={20} className="me-2" />
           Tạo khoá học mới
          </Button>
        </Nav>
        </div>
    </Navbar>
  );
};

export default TutorNavbar;

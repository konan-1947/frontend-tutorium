import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Badge } from "react-bootstrap";
import { Bell, Plus } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const TutorNavbar = () => {
  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Navbar expand="lg" className="shadow-lg" style={{ background: 'linear-gradient(90deg, #ffffff, #f1f3f5)' }} data-aos="fade-down">
      <div className="container">
        <div className="d-flex align-items-center">
          <img
            src="/assets/img/logo.png"
            alt="logo"
            width="40"
            height="40"
            className="me-2 rounded-circle border"
          />
          <Navbar.Brand as={Link} to="/" className="text-primary fw-bold" style={{ fontSize: '1.5rem' }}>
            Tutorium
          </Navbar.Brand>
        </div>
        <Nav className="ms-auto align-items-center">
          <Nav.Link href="#" className="d-flex align-items-center">
            <Bell size={24} className="text-primary" />
            <Badge bg="danger" className="ms-1" style={{ fontSize: '0.8rem' }}>
              9
            </Badge>
          </Nav.Link>
          <Button
            className="ms-2"
            style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none', padding: '8px 20px' }}
          >
            <Plus size={24} className="me-1" />
            Tạo khóa học mới
          </Button>
        </Nav>
      </div>
    </Navbar>
  );
};

export default TutorNavbar;
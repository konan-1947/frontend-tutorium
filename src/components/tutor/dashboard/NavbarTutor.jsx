import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button, Badge } from "react-bootstrap";
import { Bell, Plus } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useNavigate } from "react-router-dom";
import { useCheckLoginSession } from "../../../hooks/auth/checkLoginSession";

const TutorNavbar = ({ setActiveComponent }) => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { mutate: checkLogin, data: sessionData } = useCheckLoginSession();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Gọi API kiểm tra session
    checkLogin();
  }, [checkLogin]);

  // Cập nhật trạng thái isVerified dựa trên sessionData
  useEffect(() => {
    if (sessionData) {
      console.log("Session Data:", sessionData); // Debug dữ liệu
      setIsVerified(sessionData.verify !== null && sessionData.verify !== "null");
    }
  }, [sessionData]);

  // Xử lý khi nhấn nút "Thêm lịch dạy mới"
  const handleAddSchedule = () => {
    if (isVerified) {
      setActiveComponent("addschedule");
    } else {
      alert("Bạn cần phải xác minh tài khoản trước khi thêm lịch dạy mới!");
    }
  };

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
          
          <Button
            className="ms-2"
            style={{
              background: isVerified ? 'linear-gradient(90deg, #007bff, #00c4ff)' : 'gray',
              border: 'none',
              padding: '8px 20px'
            }}
            onClick={handleAddSchedule}
          >
            <Plus size={24} className="me-1" />
            Thêm lịch dạy mới
          </Button>
        </Nav>
      </div>
    </Navbar>
  );
};

export default TutorNavbar;
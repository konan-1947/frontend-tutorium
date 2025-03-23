import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../../assets/css/NavBarAfter.css";
import "../../../assets/css/fonts.css";
import 'font-awesome/css/font-awesome.min.css';
import Tur from '../../../assets/img/avatar.png';
import Logout from "../../../hooks/auth/useLogout";

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Tạo ref cho dropdown
  const handleLogout = async () => {
    await Logout(); // Gọi API đăng xuất
    window.location.href = "/"; // Chuyển hướng về trang chủ sau khi đăng xuất
  };
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
    <Navbar id="navbar" expand="lg" className="mau-nen-navbar">
      <Container fluid className="mau-nen-navbar">
        {/* Logo + Tên */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/assets/img/logo.png" alt="logo" width="50" height="50" className="me-2 rounded-circle border border-dark" />
          <h3 className="m-1 chu-goc-ben-trai-navbar">Tutorium</h3>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>

            <NavDropdown title="Thêm" id="navbarScrollingDropdown" className="chu-goc-ben-trai-navbar">
              <NavDropdown.Item as={Link} to="/services">Diễn đàn</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">Liên hệ với chúng tôi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/help">Help</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Các icon bên phải */}
          <Nav className="ms-auto user-menu-container">
            <Link to="/messages" className="nav-icon">
              <i className="fa fa-commenting-o"></i>
            </Link>
            <Link to="/help" className="nav-icon">
              <i className="fa fa-question-circle"></i>
            </Link>
            <Link to="/favorites" className="nav-icon">
              <i className="fa fa-heart-o"></i>
            </Link>
            <Link to="/notifications" className="nav-icon">
              <i className="fa fa-bell-o"></i>
            </Link>

            {/* Avatar + Dropdown */}
            <div className="user-icon" onClick={() => setShowDropdown(!showDropdown)}>
              <img src={Tur} alt="User" className="user-avatar" />
            </div>

            {/* Dropdown menu */}
            {showDropdown && (
              <div className="user-dropdown" ref={dropdownRef}>
                <Link to="/">Trang chủ</Link>
                <Link to="/messages">Nhắn tin</Link>
                <Link to="/learner/profile">Hồ sơ</Link>

                <hr />
                <Link onClick={() => { handleLogout() }}>Đăng xuất</Link>

              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

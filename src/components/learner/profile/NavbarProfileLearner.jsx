import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../../assets/css/NavBarAfter.css";
import 'font-awesome/css/font-awesome.min.css';
import { useCheckLoginSession } from "../../../hooks/auth/checkLoginSession"; // Điều chỉnh đường dẫn
import { useLogout } from "../../../hooks/auth/useLogout"; // Điều chỉnh đường dẫn

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Tạo ref cho dropdown
  const navigate = useNavigate();
  const { mutate: checkLogin, data, isPending } = useCheckLoginSession();
  const { mutate: logout } = useLogout();

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

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

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout({
      onSuccess: () => {
        navigate("/"); // Chuyển về trang chủ sau khi đăng xuất
        checkLogin(); // Cập nhật lại trạng thái đăng nhập
      },
      onError: () => {
        alert("Đăng xuất thất bại, vui lòng thử lại!");
      },
    });
    setShowDropdown(false); // Đóng dropdown
  };

  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = data?.isAuthenticated;

  return (
    <Navbar expand="lg" className="mau-nen-navbar-1">
      <Container fluid>
        {/* Logo + Tên */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/assets/img/logo.png"
            alt="logo"
            width="50"
            height="50"
            className="me-2 rounded-circle border border-dark"
          />
          <h3 className="m-1 chu-goc-ben-trai-navbar">Tutorium</h3>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Các icon bên phải */}
          <Nav className="ms-auto user-menu-container">
            <Link to="/help" className="nav-icon">
              <i className="fa fa-question-circle"></i>
            </Link>

            {/* Hiển thị menu người dùng nếu đã đăng nhập */}
            {isAuthenticated && (
              <div className="user-menu-container" ref={dropdownRef}>
                <div
                  className="nav-icon"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <i className="fa fa-user"></i>
                </div>
                {showDropdown && (
                  <div className="user-dropdown" style={{ position: 'absolute', right: 0, background: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '4px', zIndex: 1000 }}>
                    <Link to="/">Trang chủ</Link>
                    <Link to="/messages">Nhắn tin</Link>
                    <Link
                      to={
                        data?.roles === "learner"
                          ? "/find"
                          : data?.roles === "tutor"
                          ? "/tutor/dashboard"
                          : "/"
                      }
                    >
                      {data?.roles === "learner" ? "Tìm gia sư" : "Dashboard"}
                    </Link>
                    <Link to="/learner/profile">Hồ sơ</Link>
                    <Link to="/help">Giúp đỡ</Link>
                    <hr />
                    <Link to="#" onClick={handleLogout}>
                      Đăng xuất
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Hiển thị loading khi đang kiểm tra */}
            {isPending && (
              <span className="nav-icon" style={{ color: '#fff', marginLeft: '10px' }}>
                Đang kiểm tra...
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../assets/css/NavBar.css";
import "../../assets/css/fonts.css";
import 'font-awesome/css/font-awesome.min.css';
import { useCheckLoginSession } from "../../hooks/auth/checkLoginSession"; // Hook kiểm tra đăng nhập
import { useLogout } from "../../hooks/auth/useLogout"; // Hook đăng xuất

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { mutate: checkLogin, data, isPending } = useCheckLoginSession();
  const { mutate: logout } = useLogout();

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const handleNavigate = () => {
    window.location.href = "http://localhost:5000"; // Diễn đàn
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  // Xử lý điều hướng bình thường
 

  // Xử lý đăng xuất
  const handleLogout = () => {
    window.location.reload()
    logout({
      onSuccess: () => {
        navigate("/"); // Chuyển về trang chủ sau khi đăng xuất
        checkLogin(); // Cập nhật lại trạng thái đăng nhập
       ; // Reload lại trang
      },
      onError: () => {
        alert("Đăng xuất thất bại, vui lòng thử lại!");
      },
    });
    setShowDropdown(false); // Đóng dropdown sau khi đăng xuất
  };

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

  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = data?.isAuthenticated;

  return (
    <Navbar id="navbar" expand="lg" className="mau-nen-navbar">
      <Container fluid className="mau-nen-navbar">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/assets/img/logo.png"
            alt="logo"
            width="50"
            className="me-2 rounded-circle border border-dark"
          />
          <h3 className="m-1 chu-goc-ben-trai-navbar">Tutorium</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <div className="d-flex align-items-center text-ben-trai">
              <Nav.Link
                as={Link}
                to="/find"
                onClick={() => handleRoleBasedNavigation("find")}
                className="chu-goc-ben-trai-navbar"
              >
                Tìm gia sư
              </Nav.Link>
              {!isAuthenticated && (
                <Nav.Link
                  as={Link} 
                  to="/tutorregister"
                  onClick={() => navigate("#becometutor")}
                  className="chu-goc-ben-trai-navbar"
                >
                  Trở thành gia sư
                </Nav.Link>
              )}
            </div>
            <NavDropdown
              title="Thêm"
              id="navbarScrollingDropdown"
              className="chu-goc-ben-trai-navbar"
            >
              <NavDropdown.Item as={Link} to="#" onClick={handleNavigate}>
                Diễn đàn
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">
                Liên hệ với chúng tôi
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/help">
                Help
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Ẩn nút đăng nhập nếu đã đăng nhập */}
          {!isAuthenticated && !isPending && (
            <Nav className="ms-auto chu-goc-ben-phai-navbar nut-dang-nhap-1">
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="nut-dang-nhap-1"
                variant="none"
              >
                <i className="fa fa-sign-in me-3"></i> Đăng nhập
              </Button>
            </Nav>
          )}

          {/* Hiển thị menu người dùng nếu đã đăng nhập */}
          {isAuthenticated && (
            <Nav className="user-menu-container">
              <div
                className="user-icon"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <i className="fa fa-user me-2"></i>
              </div>
              {showDropdown && (
                <div className="user-dropdown">
                  <Link to="/">Trang chủ</Link>
                  <Link to="/messages">Nhắn tin</Link>
                  <Link
                    to={
                      data?.roles === "learner"
                        ? "/learner/profile"
                        : data?.roles === "admin"
                        ? "/admin"
                        : "/tutor/dashboard"
                    }
                  >
                    Hồ sơ
                  </Link>
                  <Link to="/help">Giúp đỡ</Link>
                  <hr />
                  <Link to="/" onClick={handleLogout} >
                    Đăng xuất
                  </Link>
                </div>
              )}
            </Nav>
          )}

          {/* Hiển thị loading khi đang kiểm tra */}
          {isPending && (
            <Nav className="ms-auto chu-goc-ben-phai-navbar">
              <span>Đang kiểm tra...</span>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
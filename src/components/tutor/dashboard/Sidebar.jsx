import React, { useState, useEffect, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import { House, Person, Star, Calendar, People, CreditCard } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Sidebar = ({ setActiveComponent }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const sidebarRef = useRef(null);

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Toggle mở/đóng submenu
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Đóng menu khi bấm ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="sidebar vh-100 p-3"
      ref={sidebarRef}
      style={{ background: 'linear-gradient(180deg, #ffffff, #f1f3f5)', position: 'sticky', top: 0 }}
      data-aos="fade-right"
    >
      <ListGroup variant="flush">
        {/* Dashboard */}
        <ListGroup.Item
          action
          onClick={() => setActiveComponent("all")}
          className="d-flex align-items-center py-3 rounded-3 mb-2"
          style={{ transition: 'all 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e7f5ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <House className="me-2 text-primary" size={20} />
          <span className="text-dark fw-bold">Trang chủ</span>
        </ListGroup.Item>

        {/* My Profile */}
        <ListGroup.Item
          action
          onClick={() => setActiveComponent("profile")}
          className="d-flex align-items-center py-3 rounded-3 mb-2"
          style={{ transition: 'all 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e7f5ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <Person className="me-2 text-primary" size={20} />
          <span className="text-dark fw-bold">Hồ sơ của tôi</span>
        </ListGroup.Item>

        {/* Reviews */}
        <ListGroup.Item
          action
          onClick={() => toggleDropdown("reviews")}
          className="d-flex align-items-center py-3 rounded-3 mb-2"
          style={{ transition: 'all 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e7f5ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <Star className="me-2 text-primary" size={20} />
          <span className="text-dark fw-bold">Đánh giá</span>
        </ListGroup.Item>

        {/* Schedule */}
        <ListGroup.Item
          action
          onClick={() => setActiveComponent("schedule")}
          className="d-flex align-items-center py-3 rounded-3 mb-2"
          style={{ transition: 'all 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e7f5ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <Calendar className="me-2 text-primary" size={20} />
          <span className="text-dark fw-bold">Lịch</span>
        </ListGroup.Item>

        {/* Student List */}
        <ListGroup.Item
          action
          onClick={() => setActiveComponent("studentslist")}
          className="d-flex align-items-center py-3 rounded-3 mb-2"
          style={{ transition: 'all 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e7f5ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <People className="me-2 text-primary" size={20} />
          <span className="text-dark fw-bold">Danh sách học viên</span>
        </ListGroup.Item>

        {/* Transaction History */}
        <ListGroup.Item
          action
          onClick={() => setActiveComponent("bookingslist")} // Sửa "coursetList" thành "courseslist" để đồng bộ với TutorDashboard
          className="d-flex align-items-center py-3 rounded-3 mb-2"
          style={{ transition: 'all 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e7f5ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <CreditCard className="me-2 text-primary" size={20} />
          <span className="text-dark fw-bold">Danh sách đăng kí lịch học</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => setActiveComponent("listcompleted")} // Sửa "coursetList" thành "courseslist" để đồng bộ với TutorDashboard
          className="d-flex align-items-center py-3 rounded-3 mb-2"
          style={{ transition: 'all 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e7f5ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <CreditCard className="me-2 text-primary" size={20} />
          <span className="text-dark fw-bold">Lịch dạy đã hoàn thành</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          onClick={() => setActiveComponent("createaccomplishment")} // Sửa "coursetList" thành "courseslist" để đồng bộ với TutorDashboard
          className="d-flex align-items-center py-3 rounded-3 mb-2"
          style={{ transition: 'all 0.3s' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e7f5ff')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <CreditCard className="me-2 text-primary" size={20} />
          <span className="text-dark fw-bold">Thành tích của bạn</span>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
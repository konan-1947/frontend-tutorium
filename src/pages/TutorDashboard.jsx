import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate và useLocation
import TutorNavbar from "../components/tutor/dashboard/Navbar";
import Sidebar from "../components/tutor/dashboard/Sidebar";
import DashboardStats from "../components/tutor/dashboard/Stats";
import CourseList from "../components/tutor/dashboard/CourseList";
import StudentList from "../components/tutor/dashboard/StudentList";
import Schedule from "../components/tutor/schedules/schedules";
import TutorProfile from "../components/tutor/dashboard/Profile";
const TutorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("all");
  const navigate = useNavigate(); // Khởi tạo navigate
  const location = useLocation(); // Lấy thông tin về URL hiện tại

  useEffect(() => {
    // Cập nhật activeComponent khi URL thay đổi
    const path = location.pathname.split("/").pop();
    if (path === "studentslist") {
      setActiveComponent("studentslist");
    } else if (path === "schedule") {
      setActiveComponent("schedule");
    } else if (path === "courseslist") {
      setActiveComponent("courseslist");
    } else if (path === "profile") {
      setActiveComponent("profile");
    } else {
      setActiveComponent("all");
    }
    }
  , [location]);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    // Cập nhật URL khi chọn component
    navigate(`/tutor/dashboard/${component}`);
  };

  return (
    <div className="dashboard-container">
      <Container fluid>
        <TutorNavbar className="w-100" />
        <Row>
          {/* Sidebar */}
          <Col md={2} className="p-0">
            <Sidebar setActiveComponent={handleComponentChange} />
          </Col>

          {/* Nội dung thay đổi */}
          <Col md={10} className="p-3">
            {activeComponent === "all" && (
              <>
                <DashboardStats />
                <CourseList />
              </>
            )}
            {activeComponent === "profile" && <TutorProfile />}
            {activeComponent === "studentslist" && <StudentList />}
            {activeComponent === "schedule" && <Schedule />}
            {activeComponent === "courseslist" && <CourseList />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TutorDashboard;

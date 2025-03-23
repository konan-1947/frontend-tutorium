import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import TutorNavbar from "../../components/tutor/dashboard/NavbarTutor";
import Sidebar from "../../components/tutor/dashboard/Sidebar";
import DashboardStats from "../../components/tutor/dashboard/Stats";
import CourseList from "../../components/tutor/dashboard/CourseList";
import StudentList from "../../components/tutor/dashboard/StudentList";
import Schedule from "../../components/tutor/schedules/SchedulesTutor";
import TutorProfile from "../../components/tutor/dashboard/ProfileTutor";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const TutorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Cập nhật activeComponent dựa trên URL
  useEffect(() => {
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
  }, [location]);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    navigate(`/tutor/dashboard/${component}`);
  };

  // Tạo instance của QueryClient
  const queryClient = new QueryClient();

  return (
    <div className="dashboard-container" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <TutorNavbar className="w-100" />
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="p-0" data-aos="fade-right" data-aos-delay="100">
            <Sidebar setActiveComponent={handleComponentChange} />
          </Col>

          {/* Nội dung chính */}
          <Col md={10} className="p-4" data-aos="fade-left" data-aos-delay="200">
            <div className="content-wrapper">
              {activeComponent === "all" && (
                <div data-aos="fade-up" data-aos-delay="300">
                  <DashboardStats />
                  <CourseList />
                </div>
              )}
              <QueryClientProvider client={queryClient}>
                {activeComponent === "profile" && (
                  <div data-aos="fade-up" data-aos-delay="300">
                    <TutorProfile />
                  </div>
                )}
                {activeComponent === "studentslist" && (
                  <div data-aos="fade-up" data-aos-delay="300">
                    <StudentList />
                  </div>
                )}
                {activeComponent === "schedule" && (
                  <div data-aos="fade-up" data-aos-delay="300">
                    <Schedule />
                  </div>
                )}
                {activeComponent === "courseslist" && (
                  <div data-aos="fade-up" data-aos-delay="300">
                    <CourseList />
                  </div>
                )}
              </QueryClientProvider>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TutorDashboard;
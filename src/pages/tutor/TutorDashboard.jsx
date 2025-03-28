import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom"; // Thêm Routes, Route
import TutorNavbar from "../../components/tutor/dashboard/NavbarTutor";
import Sidebar from "../../components/tutor/dashboard/Sidebar";
import DashboardStats from "../../components/tutor/dashboard/Stats";
import CourseList from "../../components/tutor/dashboard/ListPendingBooking";
import StudentList from "../../components/tutor/dashboard/ListFollower";
import Schedule from "../../components/tutor/schedules/SchedulesTutor";
import TutorProfile from "../../components/tutor/dashboard/ProfileTutor";
import AddTutorSchedule from "../../components/tutor/schedules/AddTutorSchedules";
import DetailPendingBooking from "../../components/tutor/dashboard/DetailPendingBooking";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import ListCompletedContracts from "../../components/tutor/dashboard/ListCompletedContracts";
import CreateAccomplishment from "../../components/tutor/dashboard/createAccomplishment";
import DetailAccomp from "../../components/tutor/dashboard/DetailAccomp";
import ListAccomp from "../../components/tutor/dashboard/ListAccomp";
const TutorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState("profile");

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Cập nhật activeComponent dựa trên URL (nếu cần)
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path === "studentslist") setActiveComponent("studentslist");
    else if (path === "schedule/:username") setActiveComponent("schedule");
    else if (path === "bookingslist") setActiveComponent("bookingslist");
    else if (path === "profile") setActiveComponent("profile");
    else if (path === "addschedule") setActiveComponent("addschedule");
    else if (path === "listcompleted") setActiveComponent("listcompleted");
    else if (path === "createaccomplishment") setActiveComponent("createaccomplishment");
    else if (path === "detailcomplishment") setActiveComponent("detailcomplishment");
    else if (path === "listaccomplishment") setActiveComponent("listaccomplishment");
    else setActiveComponent("all");
  }, [location]);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    navigate(`/tutor/dashboard/${component}`);
  };

  // Tạo instance của QueryClient
  const queryClient = new QueryClient();

  return (
    <div className="dashboard-container" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <TutorNavbar className="w-100" setActiveComponent={handleComponentChange} />
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="p-0" data-aos="fade-right" data-aos-delay="100">
            <Sidebar setActiveComponent={handleComponentChange} />
          </Col>

          {/* Nội dung chính */}
          <Col md={10} className="p-4" data-aos="fade-left" data-aos-delay="200">
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route
                  path="/"
                  element={<DashboardStats />}
                />
                <Route
                  path="profile"
                  element={<TutorProfile setActiveComponent={handleComponentChange} />}
                />
                <Route
                  path="addschedule"
                  element={<AddTutorSchedule />}
                />
                <Route
                  path="studentslist"
                  element={<StudentList />}
                />
                <Route
                  path="schedule"
                  element={<Schedule />}
                />
                <Route
                  path="bookingslist"
                  element={<CourseList />}
                />
                <Route
                  path="pending-booking/:contractId"
                  element={<DetailPendingBooking />}
                />
                <Route
                  path="listcompleted"
                  element={<ListCompletedContracts />}
                />
                <Route
                  path="createaccomplishment"
                  element={<CreateAccomplishment />}

                />
                <Route
                  path="listaccomplishment"
                  element={<ListAccomp setActiveComponent={handleComponentChange}/>}

                />
                <Route
                  path="detailaccomplishment/:accomplishmentid"
                  element={<DetailAccomp  />}

                />
              </Routes>
            </QueryClientProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TutorDashboard;
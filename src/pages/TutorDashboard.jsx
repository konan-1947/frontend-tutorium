import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TutorNavbar from "../components/tutor/dashboard/Navbar";
import Sidebar from "../components/tutor/dashboard/Sidebar";
import DashboardStats from "../components/tutor/dashboard/Stats";
import CourseList from "../components/tutor/dashboard/CourseList";
import StudentList from "../components/tutor/dashboard/StudentList";
import Schedule from "../components/tutor/schedules/schedules";
const TutorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("all");

  return (
    <div className="dashboard-container">
      <Container fluid>
        <TutorNavbar className="w-100" />
        <Row>
          {/* Sidebar */}
          <Col md={2} className="p-0">
            <Sidebar setActiveComponent={setActiveComponent} />
          </Col>

          {/* Nội dung thay đổi */}
          <Col md={10} className="p-3">
            {activeComponent === "all" &&
              <>
                <DashboardStats />
                <CourseList />
              </>
            }
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

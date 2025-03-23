import React, { useEffect } from "react";
import { Table, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const students = [
  { name: "Arnol James", email: "jessica.hanson@example.com", date: "20 Tháng 7, 2020", subject: "Toán", image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Esther Howard", email: "deanna.curtis@example.com", date: "20 Tháng 7, 2020", subject: "Văn", image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Kathryn Murphy", email: "debbie.baker@example.com", date: "20 Tháng 7, 2020", subject: "Văn", image: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "Ralph Edwards", email: "tim.jennings@example.com", date: "20 Tháng 7, 2020", subject: "Văn", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Darlene Robertson", email: "curtis.weaver@example.com", date: "20 Tháng 7, 2020", subject: "Văn", image: "https://randomuser.me/api/portraits/women/4.jpg" }
];

const StudentList = () => {
  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container my-5" style={{ maxWidth: '1000px' }}>
      <h2 className="text-center mb-5 text-primary fw-bold" style={{ fontSize: '2.5rem' }} data-aos="fade-down">
        Danh sách học viên
      </h2>
      <Card className="shadow-lg border-0" style={{ background: '#fff' }} data-aos="fade-up" data-aos-delay="100">
        <Card.Body className="p-4">
          <Table hover responsive className="table-modern">
            <thead>
              <tr>
                <th className="text-primary fw-bold">Học viên</th>
                <th className="text-primary fw-bold">Ngày đăng ký</th>
                <th className="text-primary fw-bold">Môn học</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="d-flex align-items-center">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="rounded-circle border border-2 border-primary me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <strong className="text-dark">{student.name}</strong>
                      <br />
                      <span className="text-muted">{student.email}</span>
                    </div>
                  </td>
                  <td className="text-muted">{student.date}</td>
                  <td>
                    <span className="badge bg-success text-white">{student.subject}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentList;
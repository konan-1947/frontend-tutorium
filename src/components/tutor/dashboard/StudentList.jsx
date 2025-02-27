import React from "react";
import "../../../assets/css/StudentList.css";

const students = [
  { name: "Arnol James", email: "jessica.hanson@example.com", date: "20 Tháng 7, 2020", subject: "Toán", image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Esther Howard", email: "deanna.curtis@example.com", date: "20 Tháng 7, 2020", subject: "Văn", image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Kathryn Murphy", email: "debbie.baker@example.com", date: "20 Tháng 7, 2020", subject: "Văn", image: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "Ralph Edwards", email: "tim.jennings@example.com", date: "20 Tháng 7, 2020", subject: "Văn", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Darlene Robertson", email: "curtis.weaver@example.com", date: "20 Tháng 7, 2020", subject: "Văn", image: "https://randomuser.me/api/portraits/women/4.jpg" }
];

const StudentList = () => {
  return (
    <div className="student-list-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Học viên</th>
            <th>Ngày đăng ký</th>
            <th>Môn học</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="student-info">
                <img src={student.image} alt={student.name} className="student-image" />
                <div>
                  <strong>{student.name}</strong>
                  <br />
                  <span>{student.email}</span>
                </div>
              </td>
              <td>{student.date}</td>
              <td>{student.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;

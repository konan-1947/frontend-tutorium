import React from "react";
import { Table } from "react-bootstrap";

const courses = [
  { name: "Graphic Design Bootcamp", enrolled: 10, rating: 4.0 },
  { name: "Full Stack Web Development", enrolled: 25, rating: 4.8 },
  { name: "Introduction to Python", enrolled: 18, rating: 4.5 },
];

const CourseList = () => {
  return (
    <div className="mt-4">
      <h4>Khoá học của tôi</h4>
      <Table striped bordered hover className="shadow-sm">
        <thead>
          <tr>
            <th>Tên khoá học</th>
            <th>Tổng đã tham gia</th>
            <th>Đánh giá</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.name}</td>
              <td>{course.enrolled}</td>
              <td>⭐ {course.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseList;

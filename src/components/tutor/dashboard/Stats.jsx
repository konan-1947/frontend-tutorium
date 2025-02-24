import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Book, Mortarboard, Trophy, People, Wallet2 } from "react-bootstrap-icons";

const stats = [
  { icon: <Book size={40} />, title: "Enrolled Courses", value: 12 },
  { icon: <Mortarboard size={40} />, title: "Active Courses", value: 8 },
  { icon: <Trophy size={40} />, title: "Completed Courses", value: 1 },
  { icon: <People size={40} />, title: "Total Students", value: 12739 },
  { icon: <Book size={40} />, title: "Total Courses", value: 11 },
  { icon: <Wallet2 size={40} />, title: "Total Earnings", value: "$1,231" },
];

const DashboardStats = () => {
  return (
    <Row>
      {stats.map((stat, index) => (
        <Col key={index} md={4} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              {stat.icon}
              <h5 className="mt-3">{stat.title}</h5>
              <h4>{stat.value}</h4>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;

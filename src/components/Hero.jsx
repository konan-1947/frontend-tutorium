import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../assets/css/Hero.css";

const Hero = () => {
  return (
    <section id="hero-section" className="d-flex justify-content-center align-items-center">
      <Container>
        <Row className="text-center text-dark">
          <Col md={6} className="hero-text">
            <h1 className="hero-title">Học nhanh hơn với gia sư 1-1 tốt nhất!</h1>
            <p className="hero-description">
              Tham gia các bài học trực tuyến phù hợp với trình độ, ngân sách và lịch trình của bạn.
            </p>
            <Button variant="primary" size="lg" className="hero-cta-button">
              Tìm gia sư của bạn
            </Button>
          </Col>
          <Col md={6} className="hero-image">
            <div className="video-call-container">
              <img src="/assets/img/anh_1.png" alt="Gia sư và học viên" className="main-img" />
              <div className="mini-chat">
                <img src="/assets/img/anh_1.png" alt="Học viên nhỏ" className="small-img" />
                <span className="chat-text">Hello!</span>
              </div>
              <div className="mini-chat right">
                <span className="chat-text">¡Buenos días!</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;

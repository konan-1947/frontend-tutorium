import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Error404 = () => {
  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container className="my-5" style={{ maxWidth: '800px' }}>
        <Row className="justify-content-center">
          <Col md={12} data-aos="fade-up" data-aos-delay="100">
            <Card className="shadow-lg border-0 text-center" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
              <Card.Body className="p-5">
                <div className="mb-4">
                  <FaExclamationTriangle className="text-danger" size={80} />
                </div>
                <h1 className="text-primary fw-bold" style={{ fontSize: '3rem' }}>
                  404 - Không tìm thấy trang
                </h1>
                <p className="text-muted mb-4" style={{ fontSize: '1.2rem' }}>
                  Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Hãy kiểm tra lại URL hoặc quay về trang chủ.
                </p>
                <Link to="/">
                  <Button
                    className="btn btn-primary btn-lg"
                    style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none', padding: '12px 40px' }}
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Quay về trang chủ
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Error404;
import React, { useEffect } from "react";
import { Container, Card, ListGroup, Button, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useWatchDetailAccomplishment } from "../../../hooks/learner/watchDetailAccomplishment";
import Navbar from "../../learner/dashboard/NavbarLearner";

const AccomplishmentDetail = () => {
  const navigate = useNavigate();
  const { accomplishmentid } = useParams();
  const { mutate: AccomplishmentDetail, data: accomplishmentData, isLoading, error } = useWatchDetailAccomplishment();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (accomplishmentid) {
      AccomplishmentDetail(accomplishmentid);
    }
  }, [accomplishmentid, AccomplishmentDetail]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <Spinner animation="grow" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-primary" style={{ fontSize: '1.2rem', fontWeight: '500' }}>
            Đang tải chi tiết thành tích...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 p-4 bg-danger text-white rounded" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h5>Lỗi tải dữ liệu</h5>
        <p>{error.message}</p>
      </div>
    );
  }

  const accomplishment = accomplishmentData?.data;

  if (!accomplishment) {
    return (
      <div className="text-center mt-5 p-4 bg-light rounded" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h5 className="text-muted">Không tìm thấy thông tin thành tích</h5>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="my-5" style={{ maxWidth: '900px' }}>
        <Card 
          className="shadow-sm border-0" 
          style={{ 
            borderRadius: '15px',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }} 
          data-aos="zoom-in"
        >
          <Card.Header 
            style={{ 
              background: '#3498db',
              color: 'white',
              padding: '1.5rem',
              fontSize: '1.6rem',
              fontWeight: '600',
              textAlign: 'center'
            }}
          >
            {accomplishment.title}
          </Card.Header>
          
          <Card.Body className="p-4">
            <Row>
              <Col md={6}>
                <ListGroup variant="flush" style={{ fontSize: '1.1rem' }}>
                  {[
                    { label: 'Mô tả', value: accomplishment.description },
                    { 
                      label: 'Link xác thực', 
                      value: (
                        <a 
                          href={accomplishment.verifylink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#2980b9', textDecoration: 'none' }}
                          onMouseOver={e => e.target.style.textDecoration = 'underline'}
                          onMouseOut={e => e.target.style.textDecoration = 'none'}
                        >
                          Xem link
                        </a>
                      )
                    },
                    { 
                      label: 'Ngày đạt', 
                      value: new Date(accomplishment.achievement_date).toLocaleDateString("vi-VN") 
                    },
                    { 
                      label: 'Trạng thái', 
                      value: (
                        <span 
                          className={`badge p-2 ${
                            accomplishment.status === "verified" 
                              ? "bg-success" 
                              : accomplishment.status === "rejected" 
                              ? "bg-danger" 
                              : "bg-warning text-dark"
                          }`}
                          style={{ minWidth: '100px', display: 'inline-block', textAlign: 'center' }}
                        >
                          {accomplishment.status === "verified"
                            ? "Đã xác minh"
                            : accomplishment.status === "rejected"
                            ? "Bị từ chối"
                            : "Đang chờ"}
                        </span>
                      )
                    },
                  ].map((item, index) => (
                    <ListGroup.Item 
                      key={index}
                      className="border-0 py-3"
                      style={{ background: 'transparent' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <strong style={{ color: '#2c3e50', minWidth: '130px' }}>{item.label}:</strong>
                        <span style={{ color: '#34495e' }}>{item.value}</span>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>

              <Col md={6}>
                <ListGroup variant="flush" style={{ fontSize: '1.1rem' }}>
                  {[
                    { label: 'Tổ chức cấp', value: accomplishment.issuer },
               
                    { 
                        label: 'Ngày hết hạn', 
                        value: new Date(accomplishment.expiration_date).toLocaleDateString("vi-VN") 
                      },
                    { label: 'Tên của gia sư', value: accomplishment.displayname },
                  ].map((item, index) => (
                    <ListGroup.Item 
                      key={index}
                      className="border-0 py-3"
                      style={{ background: 'transparent' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <strong style={{ color: '#2c3e50', minWidth: '130px' }}>{item.label}:</strong>
                        <span style={{ color: '#34495e' }}>{item.value}</span>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="text-center mt-4" data-aos="fade-up" data-aos-delay="200">
          <Button
            onClick={() => navigate(-1)}
            style={{
              background: 'linear-gradient(90deg, #3498db, #2980b9)',
              border: 'none',
              padding: '10px 30px',
              borderRadius: '25px',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            Quay Lại
          </Button>
        </div>
      </Container>
    </>
  );
};

export default AccomplishmentDetail;
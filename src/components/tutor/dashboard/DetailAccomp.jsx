import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useGetDetailAccomplishmentTutor } from "../../../hooks/tutor/getDetailAccomplishmentTutor";
import { useDeleteAccomplishmentTutor } from "../../../hooks/tutor/deleteAccomplishmentTutor";
const TutorAccomplishmentDetail = ({ setActiveComponent }) => {
  const { accomplishmentid } = useParams(); // Lấy accomplishmentid từ URL
  const navigate = useNavigate();
  const [accomplishment, setAccomplishment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { mutate: getAccomplishmentDetail, data: accomplishmentData, isLoading: isFetching, error: fetchError } = useGetDetailAccomplishmentTutor();
  const {mutate: deleteAccomplishment} = useDeleteAccomplishmentTutor();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
console.log(accomplishmentData)
console.log(accomplishmentid)
  useEffect(() => {
    if (accomplishmentid) {
      getAccomplishmentDetail(accomplishmentid, {
        onSuccess: (data) => {
          setAccomplishment(data.data);
          setIsLoading(false);
        },
        onError: (err) => {
          setError(err);
          setIsLoading(false);
        },
      });
    }
  }, [getAccomplishmentDetail]);

  if (isLoading || isFetching) {
    return <div className="text-center mt-5 text-primary">Đang tải chi tiết thành tích...</div>;
  }

  if (error || fetchError) {
    return <div className="text-center mt-5 text-danger fw-bold">Lỗi tải dữ liệu: {(error || fetchError).message}</div>;
  }

  if (!accomplishment) {
    return <div className="text-center mt-5 text-muted">Không tìm thấy thành tích.</div>;
  }

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
      <h2 className="text-center mb-5 text-primary fw-bold" style={{ fontSize: '2.5rem' }} data-aos="fade-up">
        Chi tiết thành tích
      </h2>
      <Card className="shadow-lg border-0" style={{ background: '#fff' }} data-aos="fade-up" data-aos-delay="100">
        <Card.Body className="p-4">
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong className="text-dark">Tiêu đề:</strong>
                <p className="text-muted mb-0">{accomplishment.title || "Không có tiêu đề"}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong className="text-dark">Trạng thái:</strong>
                <p className="mb-0">
                  <span
                    className={`badge ${
                      accomplishment.status === "verified"
                        ? "bg-success"
                        : accomplishment.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {accomplishment.status === "verified"
                      ? "Đã xác minh"
                      : accomplishment.status === "rejected"
                      ? "Bị từ chối"
                      : "Đang chờ"}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="mb-3">
                <strong className="text-dark">Mô tả:</strong>
                <p className="text-muted mb-0">{accomplishment.description || "Không có mô tả"}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong className="text-dark">Link xác minh:</strong>
                <p className="text-muted mb-0">
                  {accomplishment.verifylink ? (
                    <a href={accomplishment.verifylink} target="_blank" rel="noopener noreferrer">
                      Xem link
                    </a>
                  ) : (
                    "Không có link xác minh"
                  )}
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong className="text-dark">Người cấp:</strong>
                <p className="text-muted mb-0">{accomplishment.issuer || "Không có thông tin người cấp"}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong className="text-dark">Ngày cấp:</strong>
                <p className="text-muted mb-0">
                  {accomplishment.achievement_date
                    ? new Date(accomplishment.achievement_date).toLocaleDateString('vi-VN')
                    : "Không có ngày cấp"}
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong className="text-dark">Ngày hết hạn:</strong>
                <p className="text-muted mb-0">
                  {accomplishment.expiration_date
                    ? new Date(accomplishment.expiration_date).toLocaleDateString('vi-VN')
                    : "Không có ngày hết hạn"}
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong className="text-dark">ID thành tích:</strong>
                <p className="text-muted mb-0">{accomplishment.accomplishmentid}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong className="text-dark">ID người dùng:</strong>
                <p className="text-muted mb-0">{accomplishment.userid}</p>
              </div>
            </Col>
          </Row>
          <hr className="my-4" />
          <div className="text-center" data-aos="fade-up" data-aos-delay="200">
            <Button
              variant="secondary"
              onClick={() => setActiveComponent("accomplishments")}
              style={{ background: 'linear-gradient(90deg, #6c757d, #adb5bd)', border: 'none' }}
            >
              Quay lại danh sách
            </Button>
            <Button
              variant="secondary"
              onClick={() => deleteAccomplishment(accomplishmentid)}
              style={{ background: 'linear-gradient(90deg, #6c757d, #adb5bd)', border: 'none' ,marginLeft: '10px'}}
            >
             Xoá
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TutorAccomplishmentDetail;
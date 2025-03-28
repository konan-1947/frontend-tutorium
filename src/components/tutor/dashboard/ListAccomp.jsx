import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

import { getListAccomplishmentTutor } from "../../../hooks/tutor/getListAccomplishmentTutor";

const TutorAccomplishments = ({ setActiveComponent }) => {
  const navigate = useNavigate();
  const [accomplishments, setAccomplishments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { mutate: getListAccomplishment, data: accomplishmentData, isLoading: isFetching, error: fetchError } = getListAccomplishmentTutor();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    getListAccomplishment();
  }, [getListAccomplishment]);

  useEffect(() => {
    if (accomplishmentData) {
      setAccomplishments(accomplishmentData || []);
      setIsLoading(false);
    }
    if (fetchError) {
      setError(fetchError);
      setIsLoading(false);
    }
  }, [accomplishmentData, fetchError]);
console.log(accomplishments);
  const handleViewDetail = (accomplishmentid) => {
 
    navigate(`/tutor/dashboard/detailaccomplishment/${accomplishmentid}`,{ state: id });
  };

  if (isLoading || isFetching) {
    return <div className="text-center mt-5 text-primary">Đang tải danh sách thành tích...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger fw-bold">Lỗi tải dữ liệu: {error.message}</div>;
  }

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
      <h2 className="text-center mb-5 text-primary fw-bold" style={{ fontSize: '2.5rem' }} data-aos="fade-up">
        Danh sách thành tích
      </h2>
      <Card className="shadow-lg border-0" style={{ background: '#fff' }} data-aos="fade-up" data-aos-delay="100">
        <Card.Body className="p-4">
          {accomplishments.length === 0 ? (
            <div className="text-center text-muted">Bạn chưa có thành tích nào.</div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tiêu đề</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {accomplishments.map((accomplishment, index) => (
                  <tr key={accomplishment.accomplishmentid}>
                    <td>{index + 1}</td>
                    <td>{accomplishment.title}</td>
                    <td>
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
                    </td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewDetail(accomplishment.accomplishmentid)}
                        style={{ background: 'linear-gradient(90deg, #17a2b8, #20c997)', border: 'none' }}
                      >
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <div className="text-center mt-4" data-aos="fade-up" data-aos-delay="200">
        <Button
          variant="primary"
          onClick={() => setActiveComponent("createaccomplishment")}
          style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none' }}
        >
          Thêm thành tích mới
        </Button>
      </div>
    </Container>
  );
};

export default TutorAccomplishments;
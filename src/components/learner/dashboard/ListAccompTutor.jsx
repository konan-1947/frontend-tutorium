import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { usewatchListAccomplishment } from "../../../hooks/learner/getListAccomp";
import Navbar from "../../learner/dashboard/NavbarLearner";
const TutorAccomplishments = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [accomplishments, setAccomplishments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(username);

  const { mutate: getListAccomplishment, data: accomplishmentData, isLoading: isFetching, error: fetchError } = usewatchListAccomplishment();
  console.log(accomplishmentData);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (username) {
      getListAccomplishment(username);
    }
  }, [getListAccomplishment, username]);

  useEffect(() => {
    if (accomplishmentData) {
      // accomplishmentData is now an array, not an object with a "data" property
      setAccomplishments(accomplishmentData || []);
      setIsLoading(false);
    }
    if (fetchError) {
      setError(fetchError);
      setIsLoading(false);
    }
  }, [accomplishmentData, fetchError]);

  if (isLoading || isFetching) {
    return <div className="text-center mt-5 text-primary">Đang tải danh sách thành tích...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger fw-bold">Lỗi tải dữ liệu: {error.message}</div>;
  }

  return (
    <>  <Navbar />
      <Container className="my-5" style={{ maxWidth: '1000px' }}>

        <h2 className="text-center mb-5 text-primary fw-bold" style={{ fontSize: '2.5rem' }} data-aos="fade-up">
          Danh sách thành tích
        </h2>
        <Card className="shadow-lg border-0" style={{ background: '#fff' }} data-aos="fade-up" data-aos-delay="100">
          <Card.Body className="p-4">
            {accomplishments.length === 0 ? (
              <div className="text-center text-muted">Gia sư chưa có thành tích nào.</div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tiêu đề</th>
                    <th>Nơi cấp</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {accomplishments?.data.map((accomplishment, index) => (
                    <tr key={accomplishment.accomplishmentid}>
                      <td>{index + 1}</td>
                      <td>{accomplishment.title}</td>
                      <td>{accomplishment.issuer}</td>

                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => {
                        
                            navigate(`/learner/accomplishmentdetail/${accomplishment.accomplishmentid}`);
                          }}
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
            variant="secondary"
            onClick={() => navigate(`/tutorinfo/${username}`)}
            style={{ background: 'linear-gradient(90deg, #6c757d, #adb5bd)', border: 'none' }}
          >
            Quay lại
          </Button>
        </div>
      </Container>
    </>
  );
};

export default TutorAccomplishments;
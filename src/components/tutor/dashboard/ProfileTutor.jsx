import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col, Card,Container } from "react-bootstrap";
import { useGetTutorDetail } from "../../../hooks/tutor/getTutorDetail";
import 'aos/dist/aos.css'; // Import CSS của AOS
import AOS from 'aos'; // Import AOS

const TutorProfile = () => {
  const { mutate: getTutorDetail, data: tutorDetail, isLoading, error } = useGetTutorDetail();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Lấy dữ liệu gia sư
  useEffect(() => {
    getTutorDetail();
  }, [getTutorDetail]);

  // Cập nhật profileData khi tutorDetail thay đổi
  useEffect(() => {
    if (tutorDetail) {
      setProfileData(tutorDetail.data);
    }
  }, [tutorDetail]);

  // Xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({
      ...prev,
      User: {
        ...prev.User,
        [name]: value,
      },
    }));
  };

  // Xử lý lưu thay đổi
  const handleSave = (event) => {
    event.preventDefault();
    setIsEditing(false);
    // TODO: Gọi API để lưu thay đổi nếu cần
    console.log("Dữ liệu đã lưu:", profileData);
  };

  if (isLoading) return <div className="text-center mt-5 text-primary">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center mt-5 text-danger fw-bold">Lỗi tải dữ liệu: {error.message}</div>;
  if (!profileData) return <div className="text-center mt-5 text-muted">Không có dữ liệu.</div>;

  return (
    <Container className="my-5" style={{ maxWidth: '1000px' }}>
      <h2 className="text-center mb-5 text-primary fw-bold" style={{ fontSize: '2.5rem' }} data-aos="fade-up">
        Hồ sơ gia sư
      </h2>
      <Row className="g-4">
        {/* Avatar Section */}
        <Col md={4} className="text-center" data-aos="fade-up" data-aos-delay="100">
          <Card className="shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <Card.Body className="p-4">
              <img
                src={profileData?.User?.avatar || "https://via.placeholder.com/150"} // Placeholder nếu không có ảnh
                alt="Tutor Avatar"
                className="rounded-circle border border-3 border-primary"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h4 className="mt-3 text-primary">{profileData?.User?.displayname || "Không có tên"}</h4>
              <p className="text-muted">{profileData?.User?.address || "Không có địa chỉ"}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Profile Details Section */}
        <Col md={8} data-aos="fade-up" data-aos-delay="200">
          <Card className="shadow-lg border-0" style={{ background: '#fff' }}>
            <Card.Body className="p-4">
              <h3 className="text-success mb-3">Thông tin chi tiết</h3>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong className="text-dark">Email:</strong>
                    {isEditing ? (
                      <Form.Control
                        type="email"
                        name="email"
                        value={profileData?.User?.email || ""}
                        onChange={handleChange}
                        placeholder="Nhập email"
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData?.User?.email || "Không có email"}</p>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong className="text-dark">Chuyên môn:</strong>
                    <p className="text-muted mb-0">
                      {profileData?.Categories?.map((category, index) => (
                        <span key={index} className="badge bg-info text-dark me-1">
                          {category.categoryname}
                        </span>
                      )) || "Không có chuyên môn"}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong className="text-dark">Thành tích:</strong>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name="achievements"
                        value={profileData?.achievements || ""}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, achievements: e.target.value }))}
                        placeholder="Nhập thành tích"
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData?.achievements || "Không có thành tích"}</p>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong className="text-dark">Quê quán:</strong>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name="hometown"
                        value={profileData?.hometown || ""}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, hometown: e.target.value }))}
                        placeholder="Nhập quê quán"
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData?.hometown || "Không có quê quán"}</p>
                    )}
                  </div>
                </Col>
              </Row>
              <hr className="my-4" />
              <div className="d-flex gap-2" data-aos="fade-up" data-aos-delay="300">
                {isEditing ? (
                  <>
                    <Button
                      variant="success"
                      onClick={handleSave}
                      style={{ background: 'linear-gradient(90deg, #28a745, #4cd964)', border: 'none' }}
                    >
                      Lưu thay đổi
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setIsEditing(false)}
                      style={{ background: 'linear-gradient(90deg, #6c757d, #adb5bd)', border: 'none' }}
                    >
                      Hủy bỏ
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setIsEditing(true)}
                    style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none' }}
                  >
                    Chỉnh sửa thông tin
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TutorProfile;
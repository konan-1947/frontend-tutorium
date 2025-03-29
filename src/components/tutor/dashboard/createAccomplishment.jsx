import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Giả sử đây là hook để tạo accomplishment, bạn cần thay bằng hook thật từ dự án của bạn
import { useCreateAccomplishmentTutor } from '../../../hooks/tutor/createAccomplishmentTutor';

const CreateAccomplishment = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    verifylink: "",
    achievement_date: "",
    issuer: "",
    expiration_date: "",
  });
  const [dateError, setDateError] = useState(""); // Lưu lỗi liên quan đến ngày
  const navigate = useNavigate();
  
  // Giả sử bạn có hook để gửi dữ liệu, uncomment và thay thế nếu cần
   const { mutate: createAccomplishment } = useCreateAccomplishmentTutor();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Kiểm tra ngày cấp và ngày hết hạn
    if (name === "achievement_date" || name === "expiration_date") {
      const achievementDate = new Date(formData.achievement_date);
      const expirationDate = new Date(formData.expiration_date);
      const today = new Date();

      if (name === "achievement_date" && value) {
        const newAchievementDate = new Date(value);
        if (isNaN(newAchievementDate.getTime())) {
          setDateError("Ngày cấp không hợp lệ!");
        } else if (newAchievementDate > today) {
          setDateError("Ngày cấp không được lớn hơn ngày hiện tại!");
        } else if (formData.expiration_date && newAchievementDate > new Date(formData.expiration_date)) {
          setDateError("Ngày cấp không được lớn hơn ngày hết hạn!");
        } else {
          setDateError("");
        }
      }

      if (name === "expiration_date" && value) {
        const newExpirationDate = new Date(value);
        if (isNaN(newExpirationDate.getTime())) {
          setDateError("Ngày hết hạn không hợp lệ!");
        } else if (formData.achievement_date && newExpirationDate < new Date(formData.achievement_date)) {
          setDateError("Ngày hết hạn không được nhỏ hơn ngày cấp!");
        } else {
          setDateError("");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["title", "description", "verifylink", "achievement_date", "issuer"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      alert(`Vui lòng nhập đầy đủ thông tin: ${emptyFields.join(", ")}`);
      return;
    }

    const achievementDate = new Date(formData.achievement_date);
    const expirationDate = formData.expiration_date ? new Date(formData.expiration_date) : null;
    const today = new Date();

    if (isNaN(achievementDate.getTime())) {
      alert("Ngày cấp không hợp lệ!");
      return;
    }

    if (achievementDate > today) {
      alert("Ngày cấp không được lớn hơn ngày hiện tại!");
      return;
    }

    if (expirationDate && isNaN(expirationDate.getTime())) {
      alert("Ngày hết hạn không hợp lệ!");
      return;
    }

    if (expirationDate && expirationDate < achievementDate) {
      alert("Ngày hết hạn không được nhỏ hơn ngày cấp!");
      return;
    }

    console.log(formData); // In dữ liệu để kiểm tra

    // Gửi dữ liệu bằng hook (uncomment và thay thế nếu bạn có hook thật)

    createAccomplishment(formData, {
      onSuccess: () => {
        alert("Thêm thành tựu thành công!");
        navigate('/tutor/dashboard'); // Điều hướng sau khi thành công
      },
      onError: (error) => {
        alert(`Lỗi: ${error.message || 'Thêm thành tựu thất bại'}`);
      }
    });
   

    // Giả lập thành công nếu không có hook
    alert("Thêm thành tựu thành công!");
    navigate('/tutor/dashboard');
  };

  return (
    <div>
      <Container className="my-5">
        <h2 className="text-center mb-5 text-primary fw-bold" style={{ fontSize: '2.5rem' }} data-aos="fade-down">
          Thêm thành tựu
        </h2>
        <Form onSubmit={handleSubmit}>
          <div data-aos="fade-up" data-aos-delay="100">
            <Card className="shadow-lg border-0 mb-4" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">Thông tin thành tựu</h3>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Tiêu đề</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Nhập tiêu đề thành tựu"
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Người cấp</Form.Label>
                      <Form.Control
                        type="text"
                        name="issuer"
                        value={formData.issuer}
                        onChange={handleInputChange}
                        placeholder="Nhập tổ chức/người cấp"
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Mô tả</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Mô tả chi tiết về thành tựu"
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Link xác minh</Form.Label>
                      <Form.Control
                        type="url"
                        name="verifylink"
                        value={formData.verifylink}
                        onChange={handleInputChange}
                        placeholder="Nhập URL xác minh (ví dụ: https://example.com)"
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Ngày cấp</Form.Label>
                      <Form.Control
                        type="date"
                        name="achievement_date"
                        value={formData.achievement_date}
                        onChange={handleInputChange}
                        max={getTodayDate()}
                        className="border-primary"
                        isInvalid={!!dateError}
                      />
                      {dateError && (
                        <Form.Text className="text-danger">
                          {dateError}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Ngày hết hạn (nếu có)</Form.Label>
                      <Form.Control
                        type="date"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleInputChange}
                        className="border-primary"
                        isInvalid={!!dateError}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

          <div className="text-center" data-aos="fade-up" data-aos-delay="200">
            <Button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none', padding: '12px 40px' }}
              disabled={!!dateError}
            >
              Thêm thành tựu
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateAccomplishment;
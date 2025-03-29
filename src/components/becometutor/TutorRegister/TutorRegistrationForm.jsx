import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRegisterTutor } from '../../../hooks/auth/registerTutor';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Img from '../../../assets/img/imgbecometutor.jpg';

const TutorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    displayname: "",
    email: "",
    imgurl: "",
    dateofbirth: "",
    address: "",
    description: "",
    descriptionvideolink: "",
    expectedsalary: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [dateError, setDateError] = useState(""); // Trạng thái lưu lỗi ngày sinh
  const navigate = useNavigate();
  const { mutate: registerTutor } = useRegisterTutor();

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

    // Kiểm tra ngày sinh ngay khi thay đổi
    if (name === "dateofbirth") {
      const birthDate = new Date(value);
      const today = new Date();
      
      if (isNaN(birthDate.getTime())) {
        setDateError("Ngày sinh không hợp lệ!");
      } else if (birthDate > today) {
        setDateError("Ngày sinh không được lớn hơn ngày hiện tại!");
      } else {
        setDateError(""); // Xóa lỗi nếu ngày hợp lệ
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "displayname", "username", "email", "password", "address",
      "dateofbirth", "imgurl", "description", "descriptionvideolink", "expectedsalary"
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      alert(`Vui lòng nhập đầy đủ thông tin: ${emptyFields.join(", ")}`);
      return;
    }

    // Kiểm tra ngày sinh
    const birthDate = new Date(formData.dateofbirth);
    const today = new Date();
    
    if (isNaN(birthDate.getTime())) {
      alert("Ngày sinh không hợp lệ!");
      return;
    }

    if (birthDate > today) {
      alert("Ngày sinh không được lớn hơn ngày hiện tại!");
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age < 18) {
      alert("Bạn phải đủ 18 tuổi để đăng ký làm gia sư!");
      return;
    }

    console.log(formData);
    registerTutor(formData, {
      onSuccess: () => {
        alert("Đăng ký gia sư thành công!");
        navigate('/tutor/dashboard');
      },
 
    });
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div>
      <Container className="my-5">
        <h2 className="text-center mb-5 text-primary fw-bold" style={{ fontSize: '2.5rem' }} data-aos="fade-down">
          Đăng ký làm gia sư
        </h2>
        <Form onSubmit={handleSubmit}>
          {/* Personal Info Section */}
          <div data-aos="fade-up" data-aos-delay="100">
            <Card className="shadow-lg border-0 mb-4" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">Thông tin cá nhân</h3>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Nhập email của bạn"
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Tên hiển thị</Form.Label>
                      <Form.Control
                        type="text"
                        name="displayname"
                        value={formData.displayname}
                        onChange={handleInputChange}
                        placeholder="Nhập tên hiển thị"
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Tên người dùng</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Nhập tên người dùng"
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Mật khẩu</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Nhập mật khẩu"
                          className="border-primary"
                        />
                        <Button
                          variant="outline-primary"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ borderLeft: 'none' }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Địa chỉ</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ"
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark fw-bold">Ngày sinh</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateofbirth"
                        value={formData.dateofbirth}
                        onChange={handleInputChange}
                        max={getTodayDate()}
                        className="border-primary"
                        isInvalid={!!dateError} // Đánh dấu input lỗi nếu có
                      />
                      {dateError && (
                        <Form.Text className="text-danger">
                          {dateError}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

          {/* Photo Section */}
          <div data-aos="fade-up" data-aos-delay="200">
            <Card className="shadow-lg border-0 mb-4" style={{ background: '#fff' }}>
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">Ảnh đại diện</h3>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark fw-bold">Link ảnh đại diện</Form.Label>
                  <Form.Control
                    type="url"
                    name="imgurl"
                    value={formData.imgurl}
                    onChange={handleInputChange}
                    placeholder="Nhập URL ảnh (ví dụ: https://example.com/photo.jpg)"
                    className="border-primary"
                  />
                </Form.Group>
                {formData.imgurl && (
                  <div className="mt-2 text-center">
                    <p className="text-muted">Xem trước ảnh:</p>
                    <img
                      src={formData.imgurl}
                      alt="Preview"
                      style={{ maxWidth: '200px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                      onError={() => alert("Không thể tải ảnh. Vui lòng kiểm tra lại đường dẫn.")}
                    />
                  </div>
                )}

                <h3 className="text-success mb-3">Video giới thiệu</h3>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark fw-bold">Link video giới thiệu</Form.Label>
                  <Form.Control
                    type="url"
                    name="descriptionvideolink"
                    value={formData.descriptionvideolink}
                    onChange={handleInputChange}
                    placeholder="Nhập URL video (ví dụ: https://youtube.com/watch?v=...)"
                    className="border-primary"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </div>

          {/* Video Section */}
          <div data-aos="fade-up" data-aos-delay="400">
            <Card className="shadow-lg border-0 mb-4" style={{ background: '#fff' }}>
              <Card.Body className="p-4">
                <h3 className="text-success mb-3">Mô tả</h3>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả về bản thân và kinh nghiệm giảng dạy"
                    className="border-primary"
                  />
                </Form.Group>
                <h3 className="text-success mb-3">Học phí</h3>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark fw-bold">Giá theo giờ (VNĐ)</Form.Label>
                  <Form.Control
                    type="number"
                    name="expectedsalary"
                    value={formData.expectedsalary}
                    onChange={handleInputChange}
                    placeholder="Nhập giá mong muốn"
                    className="border-primary"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="600">
            <Button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none', padding: '12px 40px' }}
              disabled={!!dateError} // Vô hiệu hóa nút nếu có lỗi ngày sinh
            >
              Đăng ký
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default TutorRegistrationForm;
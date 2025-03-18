import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { usePutTutorRegister } from '../../../hooks/tutor/verifytutor/putTutorRegister';

const TutorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    // About section
    username: "",
    displayname: "",
    email: "",
    phone: "",
    
    // Photo section
    photoUrl: "",
    
    // Description section
    title: "",
    introduction: "",
    teachingExperience: "",
    methodology: "",
    
    // Video section
    videoUrl: "",
    
    // Pricing section
    hourlyRate: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const tutorRegisterMutation = usePutTutorRegister();

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tutorRegisterMutation.mutateAsync(formData);
      // Handle successful submission
      alert('Đăng ký thành công!');
      // Optionally redirect or clear form
    } catch (error) {
      // Handle error
      alert('Đăng ký thất bại: ' + error.message);
    }
  };

  // Navigation warning
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Bạn có chắc chắn muốn rời khỏi trang? Dữ liệu chưa lưu sẽ bị mất!";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Đăng ký làm gia sư</h2>
      <Form onSubmit={handleSubmit}>
        {/* About Section */}
        <section className="mb-4">
          <h3>Thông tin cá nhân</h3>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên người dùng</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên hiển thị</Form.Label>
                <Form.Control
                  type="text"
                  name="displayname"
                  value={formData.displayname}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Add other personal info fields */}
        </section>

        {/* Updated Photo Section */}
        <section className="mb-4">
          <h3>Ảnh đại diện</h3>
          <Form.Group className="mb-3">
            <Form.Label>Link ảnh đại diện</Form.Label>
            <Form.Control
              type="url"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleInputChange}
              placeholder="Nhập URL ảnh của bạn (ví dụ: https://example.com/your-photo.jpg)"
            />
          </Form.Group>
          {formData.photoUrl && (
            <div className="mt-2">
              <p>Xem trước ảnh:</p>
              <img
                src={formData.photoUrl}
                alt="Preview"
                style={{ maxWidth: '200px' }}
                onError={(e) => {
                  
                
                  alert("Không thể tải ảnh. Vui lòng kiểm tra lại đường dẫn.");
                }}
              />
            </div>
          )}
        </section>

        {/* Description Section */}
        <section className="mb-4">
          <h3>Mô tả</h3>
        
          <Form.Group className="mb-3">
       
            <Form.Control
              as="textarea"
              rows={3}
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
            />
          </Form.Group>
          {/* Add other description fields */}
        </section>

        {/* Updated Video Section */}
        <section className="mb-4">
          <h3>Video giới thiệu</h3>
          <Form.Group className="mb-3">
            <Form.Label>Link video giới thiệu</Form.Label>
            <Form.Control
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="Nhập URL video của bạn (ví dụ: https://youtube.com/watch?v=...)"
           
            />
          </Form.Group>
        </section>

        {/* Pricing Section */}
        <section className="mb-4">
          <h3>Học phí</h3>
          <Form.Group className="mb-3">
            <Form.Label>Giá theo giờ (VNĐ)</Form.Label>
            <Form.Control
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleInputChange}
            />
          </Form.Group>
        </section>

        <div className="text-center">
          <Button type="submit" variant="primary" size="lg">
            Đăng ký
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default TutorRegistrationForm; 
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/find.css';
import '../../../assets/css/schedule.css';
import { Button, Form, Row, Col } from 'react-bootstrap';

const TutorProfile = () => {
  // State để lưu thông tin gia sư
  const [tutorData, setTutorData] = useState({
    name: "Vũ Đình Đăng",
    location: "Hà Nội",
    category: "English",
    price: 30,
    rating: 5,
    description: "Dạy học là đam mê của tôi, kèm chích điện",
    degree: "Cử nhân Anh văn",
    phone: "0123456789",
    email: "tutor@example.com",
    hometown: "Hà Nam",
  });

  const [isEditing, setIsEditing] = useState(false); // Để điều khiển chế độ chỉnh sửa

  // Hàm xử lý khi lưu thông tin chỉnh sửa
  const handleSave = (event) => {
    event.preventDefault(); // Ngừng sự kiện mặc định của form
    setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
    // Có thể lưu thông tin vào backend hoặc localStorage ở đây nếu cần
  };

  // Hàm xử lý thay đổi thông tin
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTutorData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 text-center">
          <img 
            src="https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif" // Thay bằng URL ảnh của gia sư
            alt="Tutor"
            className="img-fluid rounded-circle" 
          />
        </div>
        <div className="col-md-8">
          <h3>{tutorData.name}</h3>
          <p>{tutorData.location}</p>
          <p><strong>Chuyên môn:</strong> {tutorData.category}</p>
         
          <div>
            <strong>Mô tả:</strong>
            {isEditing ? (
              <Form>
                <Form.Group as={Row}>
                  <Col sm={12}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={tutorData.description}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <p>{tutorData.description}</p>
            )}
          </div>

          {/* Thêm các thông tin khác */}
          <div>
            <strong>Trình độ:</strong> 
            {isEditing ? (
              <Form.Control 
                type="text" 
                name="degree"
                value={tutorData.degree}
                onChange={handleChange}
              />
            ) : (
              <p>{tutorData.degree}</p>
            )}
          </div>

          <div>
            <strong>Số điện thoại:</strong> 
            {isEditing ? (
              <Form.Control 
                type="text" 
                name="phone"
                value={tutorData.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{tutorData.phone}</p>
            )}
          </div>

          <div>
            <strong>Gmail:</strong> 
            {isEditing ? (
              <Form.Control 
                type="email" 
                name="email"
                value={tutorData.email}
                onChange={handleChange}
              />
            ) : (
              <p>{tutorData.email}</p>
            )}
          </div>

          <div>
            <strong>Quê quán:</strong> 
            {isEditing ? (
              <Form.Control 
                type="text" 
                name="hometown"
                value={tutorData.hometown}
                onChange={handleChange}
              />
            ) : (
              <p>{tutorData.hometown}</p>
            )}
          </div>
          <div> 
           <hr></hr>
          </div>

          {isEditing ? (
            <div>
              <Button variant="success" onClick={handleSave}>Lưu thay đổi</Button>
              <Button variant="secondary"  onClick={() => setIsEditing(false)} className="ms-2 custom-btn">Hủy bỏ</Button>
            </div>
          ) : (
            <Button variant="primary" onClick={() => setIsEditing(true)}>Chỉnh sửa thông tin</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;

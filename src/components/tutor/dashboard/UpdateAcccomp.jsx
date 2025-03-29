import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useGetDetailAccomplishmentTutor } from "../../../hooks/tutor/getDetailAccomplishmentTutor";
import { useupdateAccomplishmentTutor } from "../../../hooks/tutor/updateAccomplishmentTutor";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditAccomplishment = () => {
    const navigate = useNavigate(); 
    const {accomplishmentid} = useParams();
  const [formData, setFormData] = useState({
    accomplishmentid: accomplishmentid,
    title: "",
    description: "",
    verifylink: "",
    achievement_date: "",
    issuer: "",
    expiration_date: "",
  });

  const [dateError, setDateError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { mutate: getAccomplishmentDetail, data: accomplishmentData } = useGetDetailAccomplishmentTutor();
  const { mutate: updateAccomplishment } = useupdateAccomplishmentTutor();
console.log(accomplishmentid)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
  
    if (accomplishmentid) {
      getAccomplishmentDetail(accomplishmentid, {
        onSuccess: (data) => {
          const accomplishment = data.data;
          setFormData({
            title: accomplishment.title || "",
            description: accomplishment.description || "",
            verifylink: accomplishment.verifylink || "",
            achievement_date: accomplishment.achievement_date ? accomplishment.achievement_date.split('T')[0] : "",
            issuer: accomplishment.issuer || "",
            expiration_date: accomplishment.expiration_date ? accomplishment.expiration_date.split('T')[0] : "",
          });
          setIsLoading(false);
        },
        onError: (err) => {
          setError(err);
          setIsLoading(false);
        },
      });
    } else {
      setError(new Error("Không tìm thấy ID thành tích"));
      setIsLoading(false);
    }
  }, [getAccomplishmentDetail]);

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
    console.log("aaaaa",formData);
    if (name === "achievement_date" || name === "expiration_date") {
      const achievementDate = new Date(formData.achievement_date);
      const expirationDate = formData.expiration_date ? new Date(formData.expiration_date) : null;
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


    updateAccomplishment({ accomplishmentid, ...formData }, {
       
      onSuccess: () => {
        alert("Cập nhật thành tích thành công!");
        navigate('/tutor/dashboard/listaccomplishment');
      },
      onError: (error) => {
        alert(`Lỗi: ${error.message || 'Cập nhật thành tích thất bại'}`);
      },
    });
  };

  if (isLoading) {
    return <div className="text-center mt-5 text-primary">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger fw-bold">Lỗi tải dữ liệu: {error.message}</div>;
  }

  return (
    <div>
      <Container className="my-5">
        <h2 className="text-center mb-5 text-primary fw-bold" style={{ fontSize: '2.5rem' }} data-aos="fade-down">
          Chỉnh sửa thành tích
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
              style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none', padding: '12px 40px', marginRight: '10px' }}
              disabled={!!dateError}
            >
              Cập nhật thành tựu
            </Button>
            <Button
              variant="secondary"
              onClick={() => setActiveComponent("accomplishments")}
              style={{ background: 'linear-gradient(90deg, #6c757d, #adb5bd)', border: 'none', padding: '12px 40px' }}
            >
              Hủy bỏ
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default EditAccomplishment;
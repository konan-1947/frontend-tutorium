import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col, Card, Container } from "react-bootstrap";
import { useGetTutorDetail } from "../../../hooks/tutor/getTutorDetail";
import { useUpdateTutorProfile } from "../../../hooks/tutor/updateTutorProfile";
import { useDeleteAccount } from "../../../hooks/tutor/deleteAccount";
import { useChangeVerifyAtTutor } from "../../../hooks/tutor/verifyTutor";
import { useCheckLoginSession } from "../../../hooks/auth/checkLoginSession";
import { useNavigate } from "react-router-dom";
import 'aos/dist/aos.css';
import AOS from 'aos';
import Avatar from "../../../assets/img/avatar.png";

const TutorProfile = ({setActiveComponent}) => {
  const { mutate: getTutorDetail, data: tutorDetail, isLoading, error } = useGetTutorDetail();
  const { mutate: updateTutorProfile } = useUpdateTutorProfile();
  const { mutate: deleteAccount } = useDeleteAccount();
  const { mutate: changeVerifyAtTutor } = useChangeVerifyAtTutor();
  const { mutate: checkLogin, data: sessionData, isPending: isSessionPending } = useCheckLoginSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [verifytoken, setVerifytoken] = useState("");
  const navigate = useNavigate();

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Kiểm tra session và lấy dữ liệu gia sư
  useEffect(() => {
    checkLogin(); // Kiểm tra session
    getTutorDetail(); // Lấy dữ liệu gia sư
  }, [checkLogin, getTutorDetail]);

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
    updateTutorProfile(profileData, {
      onSuccess: () => {
        setIsEditing(false);
        getTutorDetail();
      },
      onError: (error) => {
        alert("Cập nhật thất bại: " + error.message);
      },
    });
  };

  // Xử lý xóa tài khoản
  const handleDeleteAccount = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác!")) {
      deleteAccount(null, {
        onSuccess: () => {
          navigate("/login");
        },
        onError: (error) => {
          alert("Xóa tài khoản thất bại: " + error.message);
        },
      });
    }
  };

  // Xử lý xác minh mã
  const handleVerifyCode = () => {
    if (!verifytoken) {
      alert("Vui lòng nhập mã xác minh!");
      return;
    }

    changeVerifyAtTutor(
      { verifytoken },
      {
        onSuccess: () => {
          alert("Xác minh thành công!");
          getTutorDetail(); // Cập nhật lại dữ liệu
          window.location.reload();
        },
        onError: (error) => {
          alert("Xác minh thất bại: " + error.message);
        },
      }
    );
  };

  // Xử lý điều hướng đến trang thành tích
  const handleViewAccomplishments = () => {
 setActiveComponent("listaccomplishment");
  };

  // Đang kiểm tra session hoặc tải dữ liệu
  if (isSessionPending || isLoading) {
    return <div className="text-center mt-5 text-primary">Đang tải dữ liệu...</div>;
  }

  // Lỗi khi tải dữ liệu
  if (error) {
    return <div className="text-center mt-5 text-danger fw-bold">Lỗi tải dữ liệu: {error.message}</div>;
  }

  if (!profileData || !sessionData) {
    return <div className="text-center mt-5 text-muted">Không có dữ liệu.</div>;
  }

  // Kiểm tra trạng thái xác minh từ sessionData
  const isVerified = sessionData.verify !== "null" && sessionData.verify !== null;

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
                src={profileData?.User?.imgurl || Avatar}
                alt="Tutor Avatar"
                className="rounded-circle border"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h4 className="mt-3 text-primary">{profileData?.User?.displayname || "Không có tên"}</h4>
              <p className="text-muted">{profileData?.User?.address || "Không có địa chỉ"}</p>
              <Button
                      variant="info"
                      onClick={handleViewAccomplishments}
                      style={{ background: 'linear-gradient(90deg, #17a2b8, #20c997)', border: 'none' }}
                    >
                      Xem thành tích của bạn
                    </Button>
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
                    <strong className="text-dark">Tên hiển thị:</strong>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name="displayname"
                        value={profileData?.User?.displayname || ""}
                        onChange={handleChange}
                        placeholder="Nhập tên hiển thị"
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData?.User?.displayname || "Không có tên"}</p>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong className="text-dark">Ngày sinh:</strong>
                    {isEditing ? (
                      <Form.Control
                        type="date"
                        name="dateofbirth"
                        value={profileData?.User?.dateofbirth || ""}
                        onChange={handleChange}
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">
                        {profileData?.User?.dateofbirth
                          ? new Date(profileData.User.dateofbirth).toLocaleDateString('vi-VN')
                          : " Không có ngày sinh"}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong className="text-dark">Địa chỉ:</strong>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        name="address"
                        value={profileData?.User?.address || ""}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ"
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData?.User?.address || "Không có địa chỉ"}</p>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong className="text-dark">URL ảnh:</strong>
                    {isEditing ? (
                      <Form.Control
                        type="url"
                        name="imgurl"
                        value={profileData?.User?.imgurl || ""}
                        onChange={handleChange}
                        placeholder="Nhập URL ảnh"
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">
                        {profileData?.User?.imgurl ? (
                          <a href={profileData.User.imgurl} target="_blank" rel="noopener noreferrer">
                            Xem ảnh
                          </a>
                        ) : (
                          "Không có URL ảnh"
                        )}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong className="text-dark">Link video mô tả:</strong>
                    {isEditing ? (
                      <Form.Control
                        type="url"
                        name="descriptionvideolink"
                        value={profileData?.descriptionvideolink || ""}
                        onChange={handleChange}
                        placeholder="Nhập link video"
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">
                        {profileData?.descriptionvideolink ? (
                          <a href={profileData.descriptionvideolink} target="_blank" rel="noopener noreferrer">
                            Xem video
                          </a>
                        ) : (
                          "Không có link video"
                        )}
                      </p>
                    )}
                  </div>
                </Col>
                <Col md={12}>
                  <div className="mb-3">
                    <strong className="text-dark">Mô tả:</strong>
                    {isEditing ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={profileData?.description || ""}
                        onChange={handleChange}
                        placeholder="Nhập mô tả"
                        className="border-primary mt-1"
                      />
                    ) : (
                      <p className="text-muted mb-0">{profileData?.description || "Không có mô tả"}</p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {isVerified ? (
                    <div className="mb-3">
                      <strong className="text-dark">Trạng thái:</strong>
                      <p className="text-success mb-0">Tài khoản của bạn đã được xác minh</p>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <strong className="text-dark">Mã xác minh:</strong>
                      <Form.Control
                        type="text"
                        value={verifytoken}
                        onChange={(e) => setVerifytoken(e.target.value)}
                        placeholder="Nhập mã xác minh"
                        className="border-primary mt-1"
                      />
                    </div>
                  )}
                </Col>
              </Row>
              <hr className="my-4" />
              <div className="d-flex gap-2 flex-wrap" data-aos="fade-up" data-aos-delay="300">
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
                  <>
                    <Button
                      variant="primary"
                      onClick={() => setIsEditing(true)}
                      style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none' }}
                    >
                      Chỉnh sửa thông tin
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleDeleteAccount}
                      style={{ background: 'linear-gradient(90deg, #dc3545, #ff6b6b)', border: 'none' }}
                    >
                      Xóa tài khoản
                    </Button>
                   
                    {!isVerified && (
                      <Button
                        variant="success"
                        onClick={handleVerifyCode}
                        style={{ background: 'linear-gradient(90deg, #28a745, #4cd964)', border: 'none' }}
                      >
                        Xác minh mã
                      </Button>
                    )}
                  </>
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
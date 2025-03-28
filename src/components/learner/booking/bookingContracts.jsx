import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useBookingContracts } from '../../../hooks/learner/bookingContracts';
import { useParams, useNavigate } from "react-router-dom";

const BookTutorSchedule = () => {
  const navigate = useNavigate(); // Thêm useNavigate để điều hướng
  const { username } = useParams();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // State quản lý thông tin hợp đồng
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const [target, setTarget] = useState("");
  const [salary, setSalary] = useState("");
  const [isCommitted, setIsCommitted] = useState(false);

  // Hook để gửi hợp đồng
  const { mutate: bookContract, isPending, isError, error, isSuccess } = useBookingContracts();

  const handleDateChange = (e) => {
    const { value } = e.target;
    const [year, month, day] = value.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    setSelectedDate(formattedDate);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (name === "startTime") {
      setStartTime(value);
      validateTime(value, endTime);
    } else {
      setEndTime(value);
      validateTime(startTime, value);
    }
  };

  const validateTime = (start, end) => {
    if (start && end) {
      const startDate = new Date(`2000-01-01T${start}:00`);
      const endDate = new Date(`2000-01-01T${end}:00`);
      const diffMs = endDate - startDate;
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours > 3) {
        setTimeError("Khoảng thời gian không được vượt quá 3 tiếng");
      } else if (diffHours <= 0) {
        setTimeError("Thời gian kết thúc phải sau thời gian bắt đầu");
      } else {
        setTimeError("");
      }
    }
  };

  const convertToApiFormat = (date, time) => {
    if (!date || !time) return "";
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}T${time}:00`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !startTime || !endTime || !target || !salary || !isCommitted || timeError) {
      alert("Vui lòng điền đầy đủ thông tin và xác nhận cam kết!");
      return;
    }

    const apiStartTime = convertToApiFormat(selectedDate, startTime);
    const apiEndTime = convertToApiFormat(selectedDate, endTime);

    const contractData = {
      starttime: apiStartTime,
      endtime: apiEndTime,
      target,
      payment: parseFloat(salary),
      username,
    };

    bookContract(contractData);
    console.log(contractData);
  };

  // Xử lý khi nhấn "Xác nhận" sau khi thành công
  const handleConfirmSuccess = () => {
    navigate('/learner/profile'); // Chuyển hướng về trang profile
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <style>
        {`
          .custom-input {
            background: #fff;
            border: 2px solid #007bff;
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 1rem;
            font-weight: 500;
            color: #333;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .custom-input:hover {
            border-color: #00c4ff;
            box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
          }

          .custom-input:focus {
            outline: none;
            border-color: #00c4ff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          }

          input[type="date"]::-webkit-calendar-picker-indicator,
          input[type="time"]::-webkit-calendar-picker-indicator {
            filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%);
          }
        `}
      </style>

      <Container className="my-5" style={{ maxWidth: '800px' }}>
        <h2
          className="text-center mb-5 text-primary fw-bold"
          style={{ fontSize: '2.5rem' }}
          data-aos="fade-down"
        >
          Đăng ký lịch học với gia sư
        </h2>

        <Row className="g-4">
          <Col md={12} data-aos="fade-up" data-aos-delay="100">
            <Card className="shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  {/* Nhập ngày và giờ */}
                  <div className="mb-4">
                    <h3 className="text-success mb-3">Thông tin lịch dạy</h3>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-dark fw-bold">Ngày và tháng</Form.Label>
                          <Form.Control
                            type="date"
                            value={selectedDate ? selectedDate.split("/").reverse().join("-") : ""}
                            onChange={handleDateChange}
                            className="custom-input"
                            required
                          />
                          {selectedDate && (
                            <div className="mt-2 text-muted">
                              Đã chọn: {selectedDate}
                            </div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-dark fw-bold">Giờ bắt đầu</Form.Label>
                          <Form.Control
                            type="time"
                            name="startTime"
                            value={startTime}
                            onChange={handleTimeChange}
                            className="custom-input"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-dark fw-bold">Giờ kết thúc</Form.Label>
                          <Form.Control
                            type="time"
                            name="endTime"
                            value={endTime}
                            onChange={handleTimeChange}
                            className="custom-input"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {timeError && (
                      <Alert variant="warning" className="text-center">
                        {timeError}
                      </Alert>
                    )}
                  </div>

                  {/* Mục tiêu dạy */}
                  <Form.Group className="mb-4">
                    <Form.Label className="text-dark fw-bold">Mục tiêu dạy</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="custom-input"
                      placeholder="Ví dụ: Cải thiện kỹ năng giao tiếp tiếng Anh"
                      required
                    />
                  </Form.Group>

                  {/* Tiền lương */}
                  <Form.Group className="mb-4">
                    <Form.Label className="text-dark fw-bold">Tiền lương (VND/giờ)</Form.Label>
                    <Form.Control
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="custom-input"
                      placeholder="Nhập số tiền lương"
                      min="0"
                      required
                    />
                  </Form.Group>

                  {/* Cam kết */}
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Tôi cam kết thực hiện đúng lịch học và mục tiêu đề ra"
                      checked={isCommitted}
                      onChange={(e) => setIsCommitted(e.target.checked)}
                      required
                    />
                  </Form.Group>

                  {/* Thông báo */}
                  {isPending && (
                    <div className="text-center mb-3">
                      <Spinner animation="border" variant="primary" />
                      <span className="ms-2">Đang gửi yêu cầu...</span>
                    </div>
                  )}
                  {isError && (
                    <Alert variant="danger" className="text-center">
                      Lỗi: {error.message || "Không thể gửi yêu cầu. Vui lòng thử lại!"}
                    </Alert>
                  )}
                  {isSuccess && (
                    <Alert variant="success" className="text-center">
                      Yêu cầu đăng ký lịch học đã được gửi thành công!
                      <div className="mt-3">
                        <Button
                          variant="primary"
                          onClick={handleConfirmSuccess}
                          style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none' }}
                        >
                          Xác nhận
                        </Button>
                      </div>
                    </Alert>
                  )}

                  {/* Nút gửi */}
                  <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none', padding: '12px 40px' }}
                      disabled={isPending || !isCommitted || !!timeError}
                    >
                      Gửi yêu cầu
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookTutorSchedule;
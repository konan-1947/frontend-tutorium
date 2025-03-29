import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useCreateWorkingTime } from '../../../hooks/tutor/createWorkingTime';

const AddTutorSchedule = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState(""); // Ngày duy nhất cho cả start và end
  const [startTime, setStartTime] = useState(""); // Chỉ lưu giờ bắt đầu
  const [endTime, setEndTime] = useState(""); // Chỉ lưu giờ kết thúc
  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");

  const { mutate, isPending, isError, error, isSuccess } = useCreateWorkingTime();

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
        setTimeError("Khoảng thởi gian không được vượt quá 3 tiếng");
      } else if (diffHours <= 0) {
        setTimeError("Thời gian kết thúc phải sau thởi gian bắt đầu");
      } else {
        setTimeError("");
      }
    }
  };

  const validateDate = (date) => {
    if (date) {
      const selectedDateObj = new Date(date);
      const currentDateObj = new Date();

      if (selectedDateObj < currentDateObj) {
        setDateError("Không thể đặt lịch trong quá khứ");
      } else {
        setDateError("");
      }
    }
  };

  const convertToApiFormat = (date, time) => {
    if (!date || !time) return "";
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}T${time}:00`;
    
  };

  const handleSaveSchedule = (e) => {
    e.preventDefault();
    
    if (timeError || dateError || !selectedDate) return;

    const apiStartTime = convertToApiFormat(selectedDate, startTime);
    const apiEndTime = convertToApiFormat(selectedDate, endTime);

    const formData = {
      newStartTime: apiStartTime,
      newEndTime: apiEndTime,
    };

    mutate(formData);
    console.log(formData);
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
          Thêm lịch dạy gia sư
        </h2>

        <Row className="g-4">
          <Col md={12} data-aos="fade-up" data-aos-delay="100">
            <Card className="shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
              <Card.Body className="p-4">
                <Form onSubmit={handleSaveSchedule}>
                  <div className="mb-4">
                    <h3 className="text-success mb-3">Thông tin lịch dạy</h3>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="text-dark fw-bold">Ngày và tháng</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
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
                  </div>

                  {timeError && (
                    <Alert variant="warning" className="text-center">
                      {timeError}
                    </Alert>
                  )}
                  {dateError && (
                    <Alert variant="warning" className="text-center">
                      {dateError}
                    </Alert>
                  )}
                  {isPending && (
                    <div className="text-center mb-3">
                      <Spinner animation="border" variant="primary" />
                      <span className="ms-2">Đang lưu lịch...</span>
                    </div>
                  )}
                  {isError && (
                    <Alert variant="danger" className="text-center">
                      Lỗi: Không thể đặt lịch vào quá khứ
                    </Alert>
                  )}
                  {isSuccess && (
                    <Alert variant="success" className="text-center">
                      Lịch dạy đã được lưu thành công!
                      <Link to="/tutor/dashboard/schedule"> Xem lịch dạy</Link>
                    </Alert>
                  )}

                  <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none', padding: '12px 40px' }}
                      disabled={isPending || !!timeError || !!dateError}
                    >
                      Lưu lịch dạy
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

export default AddTutorSchedule;
/******  26e1361f-8e99-46fe-91b5-d4b11db85020  *******/
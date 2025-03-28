import React, { useEffect } from "react";
import { Container, Row, Col, Card, Accordion, Button } from "react-bootstrap";
import { FaSearch, FaList, FaUserPlus } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Help = () => {
  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <Container className="my-5" style={{ maxWidth: '1000px' }}>
        <h2
          className="text-center mb-5 text-primary fw-bold"
          style={{ fontSize: '2.5rem' }}
          data-aos="fade-down"
        >
          Hỗ trợ người dùng
        </h2>

        <Row className="g-4">
          {/* Hướng dẫn tìm gia sư */}
          <Col md={12} data-aos="fade-up" data-aos-delay="100">
            <Card className="shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaSearch className="text-primary me-3" size={30} />
                  <h3 className="text-success mb-0">Hướng dẫn tìm gia sư</h3>
                </div>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item
                    eventKey="0"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 1: Truy cập trang tìm kiếm</Accordion.Header>
                    <Accordion.Body>
                      Từ trang chủ, nhấp vào mục <strong>"Tìm gia sư"</strong> trên thanh điều hướng hoặc sử dụng thanh tìm kiếm ở giữa trang.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="1"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 2: Nhập thông tin tìm kiếm</Accordion.Header>
                    <Accordion.Body>
                      Nhập các tiêu chí như <strong>môn học</strong> (Toán, Văn, Anh, v.v.), <strong>địa điểm</strong>, và <strong>mức giá</strong> mong muốn. Sau đó nhấn nút <strong>"Tìm kiếm"</strong>.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="2"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 3: Xem danh sách gia sư</Accordion.Header>
                    <Accordion.Body>
                      Hệ thống sẽ hiển thị danh sách gia sư phù hợp. Bạn có thể xem thông tin chi tiết của từng gia sư (hồ sơ, đánh giá, lịch trống) và chọn gia sư phù hợp.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="3"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 4: Liên hệ và đặt lịch</Accordion.Header>
                    <Accordion.Body>
                      Nhấp vào nút <strong>"Đăng ký"</strong> hoặc <strong>"Nhắn tin"</strong> để liên hệ với gia sư. Bạn cũng có thể xem lịch học và đặt lịch trực tiếp.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>

          {/* Hướng dẫn tìm danh mục */}
          <Col md={12} data-aos="fade-up" data-aos-delay="200">
            <Card className="shadow-lg border-0" style={{ background: '#fff' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaList className="text-primary me-3" size={30} />
                  <h3 className="text-success mb-0">Hướng dẫn tìm danh mục</h3>
                </div>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item
                    eventKey="0"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 1: Truy cập danh mục</Accordion.Header>
                    <Accordion.Body>
                      Từ trang chủ, nhấp vào mục <strong>"Danh mục"</strong> trên thanh điều hướng hoặc cuộn xuống phần danh mục nổi bật.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="1"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 2: Chọn danh mục</Accordion.Header>
                    <Accordion.Body>
                      Hệ thống sẽ hiển thị các danh mục như <strong>Toán</strong>, <strong>Văn</strong>, <strong>Anh</strong>, v.v. Nhấp vào danh mục bạn quan tâm.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="2"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 3: Xem gia sư theo danh mục</Accordion.Header>
                    <Accordion.Body>
                      Bạn sẽ thấy danh sách gia sư thuộc danh mục đã chọn. Sử dụng bộ lọc (địa điểm, mức giá, đánh giá) để tìm gia sư phù hợp.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>

          {/* Hướng dẫn đăng ký tài khoản */}
          <Col md={12} data-aos="fade-up" data-aos-delay="300">
            <Card className="shadow-lg border-0" style={{ background: '#fff' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaUserPlus className="text-primary me-3" size={30} />
                  <h3 className="text-success mb-0">Hướng dẫn đăng ký tài khoản</h3>
                </div>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item
                    eventKey="0"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 1: Truy cập trang đăng ký</Accordion.Header>
                    <Accordion.Body>
                      Từ trang chủ, nhấp vào nút <strong>"Đăng ký"</strong> ở góc trên bên phải của thanh điều hướng.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="1"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 2: Điền thông tin</Accordion.Header>
                    <Accordion.Body>
                      Điền các thông tin bắt buộc như <strong>tên hiển thị</strong>, <strong>email</strong>, <strong>mật khẩu</strong>, và các thông tin khác (địa chỉ, ngày sinh, v.v.). Nếu bạn là gia sư, hãy thêm thông tin như mô tả, video giới thiệu, và mức giá mong muốn.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    eventKey="2"
                    style={{ transition: 'all 0.3s', transform: 'scale(1)' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Accordion.Header>Bước 3: Xác nhận và hoàn tất</Accordion.Header>
                    <Accordion.Body>
                      Sau khi điền đầy đủ thông tin, nhấp vào nút <strong>"Đăng ký"</strong>. Hệ thống sẽ gửi email xác nhận (nếu có). Sau khi xác nhận, bạn có thể đăng nhập và sử dụng tài khoản.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>

          {/* Nút liên hệ hỗ trợ */}
          <Col md={12} className="text-center" data-aos="fade-up" data-aos-delay="400">
            <Button
              className="btn btn-primary btn-lg"
              style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none', padding: '12px 40px' }}
            >
              Liên hệ hỗ trợ
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Help;
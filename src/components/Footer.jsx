import React from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Dùng thư viện react-icons cho mũi tên
import '../assets/css/footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>VỀ CHÚNG TÔI</h3>
          <ul>
            <li><a href="#">Chúng tôi là ai</a></li>
            <li><a href="#">Cách hoạt động</a></li>
            <li><a href="#">Đánh giá từ người dùng</a></li>
            <li><a href="#">Ứng dụng của chúng tôi</a></li>
            <li><a href="#">Trạng thái</a></li>
            <li><a href="#">Chúng tôi đồng hành cùng Ukraine</a></li>
            <li><a href="#">Chương trình liên kết</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>DÀNH CHO HỌC VIÊN</h3>
          <ul>
            <li><a href="#">Blog của chúng tôi</a></li>
            <li><a href="#">Hỏi đáp</a></li>
            <li><a href="#">Giảm giá cho sinh viên</a></li>
            <li><a href="#">Giới thiệu bạn bè</a></li>
            <li><a href="#">Kiểm tra trình độ tiếng Anh miễn phí</a></li>
            <li><a href="#">Ưu đãi đặc biệt</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>DÀNH CHO GIÁO VIÊN</h3>
          <ul>
            <li><a href="#">Trở thành giáo viên trực tuyến</a></li>
            <li><a href="#">Dạy tiếng Anh trực tuyến</a></li>
            <li><a href="#">Dạy tiếng Pháp trực tuyến</a></li>
            <li><a href="#">Dạy tiếng Tây Ban Nha trực tuyến</a></li>
            <li><a href="#">Dạy tiếng Đức trực tuyến</a></li>
            <li><a href="#">Xem tất cả công việc dạy học trực tuyến</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>LIÊN HỆ</h3>
          <ul>
            <li><a href="#">Mỹ</a></li>
            <li><a href="#">1309 Beacon Street, Suite 300, Brookline, MA, 02446</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">LinkedIn</a>
          <a href="#">TikTok</a>
        </div>
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp className='iconup'/>
        </button>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect } from 'react';
import Tur from '../assets/img/tur.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS của AOS
import '../assets/css/becometutor.css';
import { useNavigate } from "react-router-dom";
const BecomeTutorSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const Navigate = useNavigate();
  return (
    <section id='becometutor' className="become-tutor-section">
      <div className="become-tutor-image" data-aos="fade-right">
        <img src='https://i.ytimg.com/vi/H0qcbjjmreg/hqdefault.jpg' alt="Tutor" />
      </div>
      <div className="become-tutor-content">
        <h1 data-aos="fade-up" data-aos-delay="200">Trở thành gia sư</h1>
        <p data-aos="fade-up" data-aos-delay="400">Kiếm tiền bằng cách chia sẻ kiến ​​thức chuyên môn của bạn với học sinh.</p>
        <p data-aos="fade-up" data-aos-delay="600">Đăng ký để bắt đầu học kèm trực tuyến với Preply.</p>
        <ul>
          <li data-aos="fade-up" data-aos-delay="800">Tìm học viên mới </li>
          <li data-aos="fade-up" data-aos-delay="1000">Phát triển doanh nghiệp của bạn</li>
          <li data-aos="fade-up" data-aos-delay="1200">Nhận thanh toán an toàn</li>
        </ul>
        <button onClick={() => Navigate ("/login")} className="become-tutor-button" data-aos="fade-up" data-aos-delay="1400">Trở thành gia sư&rarr;</button>
        <div className="platform-info" data-aos="fade-up" data-aos-delay="1600">
          <a href="#">Nền tảng của chúng tôi hoạt động như thế nào</a>
        </div>
      </div>
    </section>
  );
};

export default BecomeTutorSection;

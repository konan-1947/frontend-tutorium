import React, { useEffect } from 'react';
import '../../assets/css/Hero.css'; // Thêm CSS để định dạng hero section
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS của AOS
import image from '../../assets/img/imghome.jpg';
import'../../assets/css/fonts.css';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const nagivate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Khởi tạo AOS với thời gian animation 1s
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 data-aos="fade-up" data-aos-delay="200">
          Học <span>nhanh hơn</span> với
        </h1>
        <h1 data-aos="fade-up" data-aos-delay="400">
          gia sư 1-1 <span>tốt nhất!</span>
        </h1>
        <p data-aos="fade-up" data-aos-delay="600">
          Tham gia các bài học trực tuyến phù hợp với trình độ, ngân sách và lịch trình của bạn.
        </p>
        <button className="btn-get-started" data-aos="fade-up" data-aos-delay="800"
        onClick={() =>nagivate(`/find`)}>
          Tìm gia sư của bạn &raquo;
          
        </button>
      </div>
      <div className="hero-image" data-aos="fade-left" data-aos-delay="1000">
        <img src={image} alt="Language tutor" />
      </div>
    </section>
  );
};

export default HeroSection;

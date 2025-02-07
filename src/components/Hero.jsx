import React from 'react';
import '../assets/css/Hero.css'; // Thêm CSS để định dạng hero section
import tur from '../assets/img/tur.jpg';
import 'animate.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Học <span>nhanh hơn</span>  với
        </h1>
        <h1>gia sư 1-1 <span>tốt nhất!</span>
        </h1>
        <p>Tham gia các bài học trực tuyến phù hợp với trình độ, ngân sách và lịch trình của bạn.</p>
        <button className="btn-get-started ">Tìm gia sư của bạn &raquo;</button>
      </div>
      <div className="hero-image">
        <img  src={tur} alt="Language tutor" />
      </div>
    </section>
  );
};

export default HeroSection;

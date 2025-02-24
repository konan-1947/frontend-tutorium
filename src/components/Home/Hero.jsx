import React, { useEffect } from 'react';
import '../../assets/css/Hero.css'; // Thêm CSS để định dạng hero section
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS của AOS

import'../../assets/css/fonts.css';
const HeroSection = () => {
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
        <button className="btn-get-started" data-aos="fade-up" data-aos-delay="800">
          Tìm gia sư của bạn &raquo;
        </button>
      </div>
      <div className="hero-image" data-aos="fade-left" data-aos-delay="1000">
        <img src='https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/475952351_1142314570636535_57403209875741381_n.png?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=l38fdHOTuwYQ7kNvgF8Wk11&_nc_oc=AdgXrjQVLr6OgnCuoz-jxSJYDuhA1c3Tvi2YB6OCUjCFoZXQ3sj7JiGgzJnhoT9bM24WHiKCdYM9l1oiOhNVR0b8&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&oh=03_Q7cD1gG7n7mIuehQShlpQHyA5mfkRxq-yyt0fI04u8ECG8a3xg&oe=67D32244' alt="Language tutor" />
      </div>
    </section>
  );
};

export default HeroSection;

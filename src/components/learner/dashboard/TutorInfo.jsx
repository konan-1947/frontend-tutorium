import React from 'react';
import '../../../assets/css/tutorInfo.css';
import TutorImage from '../../../assets/img/tur.jpg';
import TutorVideoThumbnail from '../../../assets/img/tur.jpg';
import { FaCheckCircle, FaBolt, FaEnvelope, FaHeart, FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Định nghĩa một đối tượng dữ liệu cho tutor
const tutorData = {
  name: "Trần Văn A",
  category: "Toán",
  description: "Mô tả về giảng viên",
  descriptionVideoLink: "https://www.example.com/video-link", // Đây là đường dẫn video, có thể sử dụng cho video tutorial
  price: 50,
  rating: 4.5,
};

const TutorInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="tutor-info-page">
      <div className="tutor-info-container">
        <div className="tutor-header">
          <img src={TutorImage} alt="Tutor" className="tutor-profile-pic" />
          <div className="tutor-details">
            <h1 className="tutor-name">{tutorData.name} <span className="country-flag">🇨🇦</span></h1>
            <p className="tutor-description">{tutorData.category}</p>
          </div>
        </div>
        <div className="tutor-credentials">
        
      
        </div>
        <div className="about-section">
          <h2>Mô tả</h2>
          <p>{tutorData.description}</p>
          <a href="#" className="show-more"></a>
        </div>
      </div>
      <div className="tutor-sticky-card">
        <div className="video-thumbnail">
          <img src={TutorVideoThumbnail} alt="Tutor Video" className="video-preview" />
        </div>
        <div className="tutor-pricing">
          <span className="lesson-count"> Điểm đánh giá {tutorData.rating}</span>
          <span className="lesson-price">{tutorData.price} VND </span>
   
        </div>
        <button className="btn-primary" onClick={() => navigate('/learner/booking')}><FaBolt /> Đăng kí</button>
        <button className="btn-secondary"><FaEnvelope /> Nhắn tin</button>
        <button className="btn-secondary"><FaHeart /> Theo dõi</button>
      
      </div>
    </div>
  );
};

export default TutorInfo;

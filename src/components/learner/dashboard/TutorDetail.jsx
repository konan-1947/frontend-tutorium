import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@mui/material";
import '../../../assets/css/tutorInfo.css';
import { FaBolt, FaEnvelope, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TutorInfo = () => {
  const location = useLocation(); // Get the location object
  const { userid } = location.state || {}; // Retrieve user ID data from state
  const navigate = useNavigate();

  // States to handle data, loading, and error
  const [tutorData, setTutorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tutor details when userId changes
  useEffect(() => {
    const fetchTutorDetails = async () => {
      if (!userid) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/admin/getTutorDetail/${userid}`, {
          method: 'GET',
          credentials: 'true',
        });

        if (!response.ok) {
          throw new Error("Không thể lấy thông tin gia sư");
        }

        const data = await response.json();

        setTutorData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorDetails();
  }, [userid]);

  // Thêm hàm chuyển đổi URL YouTube
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // Xử lý URL YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Lấy video ID từ URL
      let videoId = '';
      
      if (url.includes('youtube.com/watch')) {
        videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1];
      }
      
      // Trả về URL embed
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tutor information: {error}</div>;

  return (
    <div className="tutor-info-page">
      <div className="tutor-info-container">
        <div className='section-header-tutor'>
          <div className="tutor-header">
            <img src={tutorData?.User?.imgurl} alt="Tutor" className="tutor-profile-pic" />
            <div className="tutor-details">
              <h1 className="tutor-name">{tutorData?.User.displayname}</h1>
              <p className="tutor-description">{tutorData?.User.email}</p>
              <p>{tutorData?.User.address}</p>
            </div>
          </div>
          <Button sx={{
            backgroundColor: '#ff5a8a',
            color: 'white',
            padding: '10px ',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          className='btn-schedule'
            onClick={() => navigate('/learner/booking')}> Lịch dạy </Button>

        </div>
        <div className="tutor-credentials">
          <p>Ngày sinh: {tutorData?.User.dateofbirth}</p>
          <p>Mức lương mong muốn: {tutorData?.expectedsalary} VND</p>
        </div>
        <div className="about-section">
          <h2>Mô tả</h2>
          <p>{tutorData?.description}</p>
          {tutorData?.descriptionvideolink && (
            <div className="video-section">
              <h3>Video giới thiệu</h3>
              <iframe 
                width="560" 
                height="315" 
                src={getEmbedUrl(tutorData.descriptionvideolink)}
                title="Tutor Introduction"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      <div className="tutor-sticky-card">
        {tutorData?.descriptionvideolink && (
          <iframe 
            width="100%" 
            height="200"
            src={getEmbedUrl(tutorData.descriptionvideolink)}
            title="Tutor Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        <div className="tutor-pricing">
          <span >Điểm đánh giá {tutorData.socialcredit} </span>
          <span className="lesson-price">{tutorData?.expectedsalary} VND</span>
        </div>
        <button className="btn-primary" onClick={() => navigate('/learner/booking')}><FaBolt /> Đăng kí</button>
        <button className="btn-secondary"><FaEnvelope /> Nhắn tin</button>
        <button className="btn-secondary"><FaHeart /> Theo dõi</button>
      </div>
    </div>
  );
};

export default TutorInfo;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@mui/material";
import '../../../assets/css/tutorInfo.css';
import { FaBolt, FaEnvelope, FaHeart, FaHeartBroken } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFollow } from '../../../hooks/learner/useFollow';
import { useUnfollow } from '../../../hooks/learner/useUnfollow';

const TutorInfo = () => {
  const location = useLocation();
  const { userid } = location.state || {};
  const navigate = useNavigate();
  const { mutate: followTutor, isLoading: isFollowing } = useFollow();
  const { mutate: unfollowTutor, isLoading: isUnfollowing } = useUnfollow();

  // States to handle data, loading, and error
  const [tutorData, setTutorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

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
        // Check if the tutor is already followed
        setIsFollowed(data.data.isFollowed || false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorDetails();
  }, [userid]);

  const handleFollow = async () => {
    try {
      await followTutor(userid, {
        onSuccess: (data) => {
          alert('Theo dõi gia sư thành công!');
          setIsFollowed(true);
        },
        onError: (error) => {
          alert(error.message || 'Có lỗi xảy ra khi theo dõi gia sư');
        }
      });
    } catch (error) {
      alert('Có lỗi xảy ra khi theo dõi gia sư');
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowTutor(userid, {
        onSuccess: (data) => {
          alert('Đã hủy theo dõi gia sư thành công!');
          setIsFollowed(false);
        },
        onError: (error) => {
          alert(error.message || 'Có lỗi xảy ra khi hủy theo dõi gia sư');
        }
      });
    } catch (error) {
      alert('Có lỗi xảy ra khi hủy theo dõi gia sư');
    }
  };

  // Thêm hàm chuyển đổi URL YouTube
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
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
          <span>Điểm đánh giá {tutorData.socialcredit} </span>
          <span className="lesson-price">{tutorData?.expectedsalary} VND</span>
        </div>
        <button className="btn-primary" onClick={() => navigate('/learner/booking')}><FaBolt /> Đăng kí</button>
        <button className="btn-secondary"><FaEnvelope /> Nhắn tin</button>
     
          <button 
            className="btn-secondary "
            onClick={handleUnfollow}
         
          >
            <FaHeartBroken /> {isUnfollowing ? 'Đang hủy...' : 'Hủy theo dõi'}
          </button>
 
          <button 
            className="btn-secondary"
            onClick={handleFollow}
          
          >
            <FaHeart /> {isFollowing ? 'Đang theo dõi...' : 'Theo dõi'}
          </button>
      
      </div>
    </div>
  );
};

export default TutorInfo;

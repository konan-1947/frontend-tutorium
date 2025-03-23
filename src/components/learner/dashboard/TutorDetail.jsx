import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBolt, FaEnvelope, FaHeart, FaHeartBroken, FaCalendar } from 'react-icons/fa';
import { useFollow } from '../../../hooks/learner/useFollow';
import { useUnfollow } from '../../../hooks/learner/useUnfollow';
import { useSpring, animated } from '@react-spring/web'; // Import react-spring

const TutorInfo = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const { mutate: followTutor, isLoading: isFollowing } = useFollow();
  const { mutate: unfollowTutor, isLoading: isUnfollowing } = useUnfollow();

  const [tutorData, setTutorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      if (!userid) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/admin/getTutorDetail/${userid}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error("Không thể lấy thông tin gia sư");
        }

        const data = await response.json();
        setTutorData(data.data);
        setIsFollowed(data.data.isFollowed || false);
      } catch (err) {
        navigate('/error404');
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorDetails();
  }, [userid, navigate]);

  const handleFollow = async () => {
    try {
      await followTutor(userid, {
        onSuccess: () => {
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
        onSuccess: () => {
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

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtube.com/watch')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  // Define spring animations
  const headerProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
  });

  const descriptionProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 400,
  });

  const stickyCardProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 600,
  });

  if (isLoading) return <div className="text-center mt-5 text-primary">Đang tải...</div>;
  if (error) return <div className="text-center mt-5 text-danger fw-bold">Lỗi: {error}</div>;

  return (
    <div className="container my-5" style={{ maxWidth: '1200px' }}>
      <div className="row g-4">
        {/* Main Tutor Info */}
        <div className="col-lg-8 pt-4">
          <animated.div style={headerProps}>
            <div className="card shadow-lg border-0" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <img
                    src={tutorData?.User?.imgurl}
                    alt="Tutor"
                    className="rounded-circle me-4 border border-3 border-primary"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                  <div>
                    <h1 className="card-title text-primary mb-2" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {tutorData?.User?.displayname}
                    </h1>
                    <p className="text-muted mb-2">
                      {tutorData?.Categories?.map((category, index) => (
                        <span key={index} className="badge bg-info text-dark me-1">
                          {category.categoryname}
                        </span>
                      ))}
                    </p>
                    <p className="text-dark"><strong>Email:</strong> {tutorData?.User?.email}</p>
                    <p className="text-dark"><strong>Địa chỉ:</strong> {tutorData?.User?.address}</p>
                    <p className="text-dark"><strong>Ngày sinh:</strong> {tutorData?.User?.dateofbirth}</p>
                    <p className="text-dark"><strong>Mức lương:</strong> <span className="text-success fw-bold">{tutorData?.expectedsalary} VND</span></p>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>

          <animated.div style={descriptionProps}>
            <div className="card shadow-lg border-0 mt-4" style={{ background: '#fff' }}>
              <div className="card-body p-4">
                <h5 className="card-title text-primary mb-3">Mô tả</h5>
                <p className="text-dark">{tutorData?.description}</p>
              </div>
            </div>
          </animated.div>
        </div>

        {/* Sticky Card */}
        <div className="col-lg-4">
          <animated.div style={stickyCardProps}>
            <div className="card shadow-lg border-0" style={{ top: '20px', background: 'linear-gradient(135deg, #ffffff, #f1f3f5)' }}>
              <div className="card-body p-4">
                {tutorData?.descriptionvideolink && (
                  <div className="ratio ratio-16x9 mb-4 shadow-sm">
                    <iframe
                      src={getEmbedUrl(tutorData.descriptionvideolink)}
                      title="Tutor Introduction"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="text-center mb-4">
                  <p className="text-dark"><strong>Điểm đánh giá:</strong> <span className="badge bg-warning text-dark">{tutorData?.socialcredit}</span></p>
                </div>
                <button
                    className="btn btn-primary btn-md"
                    onClick={() => navigate('/learner/booking')}
                    style={{ background: 'linear-gradient(90deg, #007bff, #00c4ff)', border: 'none' ,width:'100%' }}
                  >
                    <FaBolt className="me-2" /> Đăng ký
                  </button>
                <div className="d-grid gap-2 mt-2 "style={{ gridTemplateColumns: '1fr 1fr ' }}>
                
                  <button
                    className="btn btn-outline-info btn-md"
                    style={{ transition: 'all 0.3s' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e7f5ff'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <FaEnvelope className="me-2" /> Nhắn tin
                  </button>
                  <button
                    className="btn btn-outline-info btn-md"
                    onClick={() => navigate('/learner/booking')}
                    style={{ transition: 'all 0.3s' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <FaCalendar className="me-2" /> Xem lịch học
                  </button>

                  <button
                    className="btn btn-outline-info btn-md "
                    onClick={handleUnfollow}
                  
                    style={{ transition: 'all 0.3s'}}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#eed94a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <FaHeartBroken className="me-2" /> {isUnfollowing ? 'Đang hủy...' : 'Hủy theo dõi'}
                  </button>

                  <button
                    className="btn btn-outline-info btn-md"
                    onClick={handleFollow}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f45f73'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    style={{ transition: 'all 0.3s' }}
                  >
                    <FaHeart className="me-2" /> {isFollowing ? 'Đang theo dõi...' : 'Theo dõi'}
                  </button>

                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default TutorInfo;
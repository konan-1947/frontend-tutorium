import React from 'react';
import '../assets/css/tutorInfo.css';
import TutorImage from '../assets/img/tur.jpg';
import TutorVideoThumbnail from '../assets/img/tur.jpg';
import { FaCheckCircle, FaBolt, FaEnvelope, FaHeart, FaPlayCircle } from 'react-icons/fa';

const TutorInfo = () => {
    return (
        <div className="tutor-info-page">
            <div className="tutor-info-container">
                <div className="tutor-header">
                    <img src={TutorImage} alt="Tutor" className="tutor-profile-pic" />
                    <div className="tutor-details">
                        <h1 className="tutor-name">Cristina P. <span className="country-flag">🇨🇦</span></h1>
                        <p className="tutor-description">
                            Certified Teacher Helping You Master Business English, Job Interviews, Conversational Skills & Professional Communication! — Schedule Your Lesson Today!
                        </p>
                    </div>
                </div>
                <div className="tutor-credentials">
                    <div className="credential-item">
                        <FaCheckCircle className="credential-icon" />
                        <div>
                            <strong>Professional Tutor</strong>
                            <p>Cristina P. is a highly qualified tutor with a verified teaching certificate. <a href="#">Learn more</a></p>
                        </div>
                    </div>
                    <div className="credential-item">
                        <FaCheckCircle className="credential-icon" />
                        <div>
                            <strong>Trials are 100% refundable</strong>
                            <p>Try another tutor for free or get a refund</p>
                        </div>
                    </div>
                    <div className="credential-item">
                        <FaCheckCircle className="credential-icon" />
                        <div>
                            <strong>Teaches</strong>
                            <p>English lessons</p>
                        </div>
                    </div>
                </div>
                <div className="about-section">
                    <h2>About me</h2>
                    <p>Hello, my name is Cristina, and I live in beautiful Toronto, Canada.</p>
                    <p>I have a Bachelor's Degree in English Literature from York University and a TESOL Certification.</p>
                    <p>My passion for language includes everything from creative writing and grammar to engaging in meaningful conversations.</p>
                    <a href="#" className="show-more">Show more</a>
                </div>
            </div>
            <div className="tutor-sticky-card">
                <div className="video-thumbnail">
                    <img src={TutorVideoThumbnail} alt="Tutor Video" className="video-preview" />
                  
                </div>
                <div className="tutor-pricing">
                    <span className="new-tutor">New</span>
                    <span className="lesson-count">2 lessons</span>
                    <span className="lesson-price">$16 </span>
                    <span className="lesson-price">50-min lesson</span>
                </div>
                <button className="btn-primary"><FaBolt /> Book trial lesson</button>
                <button className="btn-secondary"><FaEnvelope /> Send message</button>
                <button className="btn-secondary"><FaHeart /> Save to my list</button>
                <div className="tutor-status">
                    <p><strong>Super popular</strong></p>
                    <p>11 new contacts and 1 lesson booking in the last 48 hours</p>
                    <p>Usually responds in less than an hour</p>
                </div>
            </div>
        </div>
    );
};

export default TutorInfo;

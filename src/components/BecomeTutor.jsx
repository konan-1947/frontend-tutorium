import React from 'react';
import Tur from '../assets/img/tur.jpg';
import '../assets/css/becometutor.css';
const BecomeTutorSection = () => {
  return (
    <section className="become-tutor-section">
      <div className="become-tutor-image">
        <img src={Tur} alt="Tutor" /> {/* Thay đổi URL ảnh theo ý bạn */}
      </div>
      <div className="become-tutor-content">
        <h1>Become a tutor</h1>
        <p>Earn money sharing your expert knowledge with students. </p>
        <p>Sign up to start tutoring online with Preply.</p>
        <ul>
          <li>Find new students</li>
          <li>Grow your business</li>
          <li>Get paid securely</li>
        </ul>
        <button className="become-tutor-button">Become a tutor &rarr;</button>
        <div className="platform-info">
          <a href="#">How our platform works</a>
        </div>
      </div>
    </section>
  );
};

export default BecomeTutorSection;

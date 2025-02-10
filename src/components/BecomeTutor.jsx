import React, { useEffect } from 'react';
import Tur from '../assets/img/tur.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS của AOS
import '../assets/css/becometutor.css';

const BecomeTutorSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="become-tutor-section">
      <div className="become-tutor-image" data-aos="fade-right">
        <img src={Tur} alt="Tutor" />
      </div>
      <div className="become-tutor-content">
        <h1 data-aos="fade-up" data-aos-delay="200">Become a tutor</h1>
        <p data-aos="fade-up" data-aos-delay="400">Earn money sharing your expert knowledge with students.</p>
        <p data-aos="fade-up" data-aos-delay="600">Sign up to start tutoring online with Preply.</p>
        <ul>
          <li data-aos="fade-up" data-aos-delay="800">Find new students</li>
          <li data-aos="fade-up" data-aos-delay="1000">Grow your business</li>
          <li data-aos="fade-up" data-aos-delay="1200">Get paid securely</li>
        </ul>
        <button className="become-tutor-button" data-aos="fade-up" data-aos-delay="1400">Become a tutor &rarr;</button>
        <div className="platform-info" data-aos="fade-up" data-aos-delay="1600">
          <a href="#">How our platform works</a>
        </div>
      </div>
    </section>
  );
};

export default BecomeTutorSection;

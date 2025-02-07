import React from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Dùng thư viện react-icons cho mũi tên
import '../assets/css/footer.css';


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>ABOUT US</h3>
          <ul>
            <li><a href="#">Who we are</a></li>
            <li><a href="#">How it works</a></li>
            <li><a href="#">Preply reviews</a></li>
            <li><a href="#">Preply app</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">We stand with Ukraine</a></li>
            <li><a href="#">Affiliate program</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>FOR STUDENTS</h3>
          <ul>
            <li><a href="#">Preply Blog</a></li>
            <li><a href="#">Questions and Answers</a></li>
            <li><a href="#">Student discount</a></li>
            <li><a href="#">Refer a friend</a></li>
            <li><a href="#">Test your English for free</a></li>
            <li><a href="#">Preply discounts</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>FOR TUTORS</h3>
          <ul>
            <li><a href="#">Become an online tutor</a></li>
            <li><a href="#">Teach English online</a></li>
            <li><a href="#">Teach French online</a></li>
            <li><a href="#">Teach Spanish online</a></li>
            <li><a href="#">Teach German online</a></li>
            <li><a href="#">See all online tutoring jobs</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>CONTACTS</h3>
          <ul>
            <li><a href="#">USA</a></li>
            <li><a href="#">1309 Beacon Street, Suite 300, Brookline, MA, 02446</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">LinkedIn</a>
          <a href="#">TikTok</a>
        </div>
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp className='iconup'/>
        </button>
      </div>
    </footer>
  );
};

export default Footer;

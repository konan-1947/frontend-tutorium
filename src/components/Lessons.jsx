import React from 'react';
import '../assets/css/LessonsSection.css';

const LanguageLessonsSection = () => {
  return (
    <section className="language-lessons-section">
      <div className="section-title">
        <h2>Online tutoring & Language lessons and classes</h2>
      </div>

      <div className="courses-section">
        <div className="course-category">
          <h3>Popular online language courses</h3>
          <ul>
            <li>Online English classes</li>
            <li>Online Spanish classes</li>
            <li>Online German classes</li>
            <li>Online French classes</li>
            <li>Online Business English courses</li>
          </ul>
        </div>
        <div className="course-category">
          <h3>Learn a language online</h3>
          <ul>
            <li>Learn English online</li>
            <li>Learn Spanish online</li>
            <li>Learn French online</li>
            <li>Learn Japanese online</li>
            <li>Learn German online</li>
          </ul>
        </div>
        <div className="course-category">
          <h3>Tutors for different learning needs</h3>
          <ul>
            <li>English classes for kids</li>
            <li>IELTS tutors</li>
            <li>Native English speakers online</li>
            <li>Online English courses for adults</li>
            <li>Spanish tutors for high school students</li>
            <li>Online Spanish courses for adults</li>
          </ul>
        </div>
        <div className="course-category">
          <h3>Other popular courses</h3>
          <ul>
            <li>English conversational classes</li>
            <li>English classes for Spanish speakers</li>
            <li>Business English lessons</li>
            <li>Canadian English tutors</li>
            <li>Intensive Spanish classes</li>
          </ul>
        </div>
      </div>

      <div className="section-title">
        <h2>Find a language tutor near you</h2>
      </div>

      <div className="tutor-categories">
        <div className="tutor-category">
          <h3>Tutors from top cities around the globe</h3>
          <ul>
            <li>English classes in NYC</li>
            <li>Spanish classes in NYC</li>
            <li>English classes in Los Angeles</li>
            <li>Spanish classes in Los Angeles</li>
            <li>English classes in Miami</li>
            <li>Spanish classes in Miami</li>
            <li>English classes in Toronto</li>
            <li>French classes in Toronto</li>
            <li>Spanish classes in London</li>
            <li>English classes in London</li>
          </ul>
        </div>

        <div className="tutor-category">
          <h3>Tutors from English speaking countries around the globe</h3>
          <ul>
            <li>Spanish tutors near me in the USA</li>
            <li>Spanish tutors near me in the United Kingdom</li>
            <li>French tutors near me in Canada</li>
            <li>Spanish tutors near me in Australia</li>
          </ul>
        </div>

        <div className="tutor-category">
          <h3>Preply global</h3>
          <ul>
            <li>Español</li>
            <li>Français</li>
            <li>Deutsch</li>
            <li>Italiano</li>
            <li>Русский</li>
            <li>Português</li>
            <li>Polski</li>
            <li>Nederlands</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LanguageLessonsSection;

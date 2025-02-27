import React from 'react';
import '../../assets/css/LessonsSection.css';

const LanguageLessonsSection = () => {
  return (
    <section className="language-lessons-section">
      <div className="section-title">
        <h2>Dạy kèm trực tuyến & Các bài học và lớp học ngôn ngữ</h2>
      </div>

      <div className="courses-section">
        <div className="course-category">
          <h3>Dạy các lớp học lớp 1-5</h3>
          <ul>
            <li>Content 1</li>
            <li>Content 2</li>
            <li>Content 3</li>

          </ul>
        </div>
        <div className="course-category">
          <h3>Dạy chương trình ôn thi Cấp 3</h3>
          <ul>
            <li>Content 1</li>
            <li>Content 2</li>
            <li>Content 3</li>

          </ul>
        </div>
        <div className="course-category">
          <h3>Gia sư cho các nhu cầu học tập khác nhau</h3>
          <ul>
            <li>Content 1</li>
            <li>Content 2</li>
            <li>Content 3</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default LanguageLessonsSection;

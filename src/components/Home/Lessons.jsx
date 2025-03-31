import React from 'react';
import '../../assets/css/LessonsSection.css';

const LanguageLessonsSection = () => {
  return (
    <section className="language-lessons-section">
      <div className="section-title">
        <h2>Dạy kèm trực tuyến & Các khóa học và lớp học ngôn ngữ</h2>
      </div>

      <div className="courses-section">
        <div className="course-category">
          <h3>Dạy các lớp học lớp 1-5</h3>
          <ul>
            <li>Toán học cơ bản</li>
            <li>Tiếng Việt và Kỹ năng đọc hiểu</li>
            <li>Tiếng Anh giao tiếp</li>
          </ul>
        </div>
        <div className="course-category">
          <h3>Dạy chương trình ôn thi Cấp 3</h3>
          <ul>
            <li>Ôn luyện Toán nâng cao</li>
            <li>Luyện thi Tiếng Anh</li>
            <li>Hướng dẫn làm bài thi Ngữ văn</li>
          </ul>
        </div>
        <div className="course-category">
          <h3>Gia sư cho các nhu cầu học tập khác nhau</h3>
          <ul>
            <li>Luyện thi IELTS, TOEFL</li>
            <li>Học tiếng Nhật, Hàn, Trung</li>
            <li>Gia sư chuyên biệt theo yêu cầu</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LanguageLessonsSection;

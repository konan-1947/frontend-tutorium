import React from 'react';
import '../assets/css/LessonsSection.css';

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
            <li>Lớp học tiếng Anh trực tuyến</li>
            <li>Lớp học Ngữ Văn trực tuyến</li>
            <li>Lớp học Toán trực tuyến</li>
            <li>Lớp học Tin học trực tuyến</li>
           
          </ul>
        </div>
        <div className="course-category">
          <h3>Dạy chương trình ôn thi Cấp 3</h3>
          <ul>
            <li>Luyện đề nâng cao các môn Toán, Văn, Anh</li>
            <li>Tổng hợp kiến thức trọng tâm và luyện đề</li>
            <li>Hệ thống kiến thức, giải đề sát với đề thi thật</li>
           
          </ul>
        </div>
        <div className="course-category">
          <h3>Gia sư cho các nhu cầu học tập khác nhau</h3>
          <ul>
            <li>Lớp học tiếng Anh cho trẻ em</li>
            <li>Gia sư luyện thi IELTS</li>
            <li>Gia sư Toán học nâng cao</li>
            <li>Khóa học tiếng Anh trực tuyến cho người lớn</li>
            <li>Khóa học Vật lí, Hoá học, Sinh học</li>
       
          </ul>
        </div>
        <div className="course-category">
          <h3>Các khóa học phổ biến khác</h3>
          <ul>
            <li>Lớp học tiếng Anh giao tiếp</li>
            <li>Lớp học tiếng Anh cho người nói tiếng Tây Ban Nha</li>
            <li>Bài học tiếng Anh thương mại</li>
            <li>Gia sư tiếng Anh Canada</li>
            <li>Lớp học tiếng Tây Ban Nha chuyên sâu</li>
          </ul>
        </div>
      </div>

      <div className="section-title">
        <h2>Tìm gia sư ngôn ngữ gần bạn</h2>
      </div>

      <div className="tutor-categories">
        <div className="tutor-category">
          <h3>Gia sư từ các thành phố hàng đầu trên thế giới</h3>
          <ul>
            <li>Lớp học tiếng Anh ở NYC</li>
            <li>Lớp học tiếng Tây Ban Nha ở NYC</li>
            <li>Lớp học tiếng Anh ở Los Angeles</li>
            <li>Lớp học tiếng Tây Ban Nha ở Los Angeles</li>
            <li>Lớp học tiếng Anh ở Miami</li>
            <li>Lớp học tiếng Tây Ban Nha ở Miami</li>
            <li>Lớp học tiếng Anh ở Toronto</li>
            <li>Lớp học tiếng Pháp ở Toronto</li>
            <li>Lớp học tiếng Tây Ban Nha ở London</li>
            <li>Lớp học tiếng Anh ở London</li>
          </ul>
        </div>

        <div className="tutor-category">
          <h3>Gia sư từ các quốc gia nói tiếng Anh trên toàn thế giới</h3>
          <ul>
            <li>Gia sư tiếng Tây Ban Nha gần tôi ở Hoa Kỳ</li>
            <li>Gia sư tiếng Tây Ban Nha gần tôi ở Vương quốc Anh</li>
            <li>Gia sư tiếng Pháp gần tôi ở Canada</li>
            <li>Gia sư tiếng Tây Ban Nha gần tôi ở Úc</li>
          </ul>
        </div>

        <div className="tutor-category">
          <h3>Preply toàn cầu</h3>
          <ul>
            <li>Tiếng Tây Ban Nha</li>
            <li>Tiếng Pháp</li>
            <li>Tiếng Đức</li>
            <li>Tiếng Ý</li>
            <li>Tiếng Nga</li>
            <li>Tiếng Bồ Đào Nha</li>
            <li>Tiếng Ba Lan</li>
            <li>Tiếng Hà Lan</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LanguageLessonsSection;

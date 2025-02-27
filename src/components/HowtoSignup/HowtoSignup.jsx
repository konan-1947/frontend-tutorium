import "../../assets/css/HowtoSignUp.css"; // Import CSS
import React from "react";
import { useNavigate } from "react-router-dom";

const HowtoSignUp = () => {
  const Navigate = useNavigate();
  
  return (
    <div className="howto-signup-container">
      <div className="signup-content">
        <h1 className="title">
          Kiếm tiền bằng cách dạy học cho cộng đồng học viên lớn nhất thế giới
        </h1>

        {/* Quá trình đăng ký */}
        <div className="steps-container">
          <div className="step completed">
            <span className="step-number">✔</span>
            <h3>Đăng ký</h3>
            <p>để tạo hồ sơ gia sư của bạn</p>
          </div>
          <div className="step active">
            <span className="step-number">2</span>
            <h3>Được duyệt</h3>
            <p>bởi đội ngũ của chúng tôi trong 5 ngày làm việc</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Bắt đầu kiếm tiền</h3>
            <p>bằng cách dạy học sinh trên toàn thế giới!</p>
          </div>
        </div>

        {/* Nút đăng ký */}
        <button className="register-button" onClick={() => Navigate("/TutorRegister")}>Hoàn tất đăng ký</button>

        {/* Phần lợi ích */}
        <div className="benefits-container">
          <div className="benefit">
            <h2>Đặt giá của riêng bạn</h2>
            <p>
              Chọn mức giá theo giờ và thay đổi bất cứ lúc nào. Trung bình, gia sư tiếng Anh tính phí từ $15-25 mỗi giờ.
            </p>
          </div>
          <div className="benefit">
            <h2>Dạy bất cứ khi nào, ở đâu</h2>
            <p>
              Quyết định khi nào và số giờ bạn muốn dạy. Không có cam kết thời gian tối thiểu hay lịch cố định. Làm ông chủ của chính bạn!
            </p>
          </div>
          <div className="benefit">
            <h2>Phát triển chuyên môn</h2>
            <p>
              Tham gia các hội thảo phát triển nghề nghiệp và nhận lời khuyên để nâng cao kỹ năng của bạn. Bạn sẽ nhận được tất cả sự hỗ trợ cần thiết từ đội ngũ của chúng tôi để phát triển.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowtoSignUp;

import React from "react";
import "../../../assets/css/StepEducation.css";

const StepEducation = ({ nextStep, prevStep }) => {
  return (
    <div className="step-education">
      <h2>Thông tin học vấn</h2>
      <p>Thêm thông tin về trình độ học vấn của bạn.</p>

      <label>Tên trường đại học</label>
      <input type="text" placeholder="Ví dụ: Đại học Quốc gia" />

      <label>Bằng cấp</label>
      <input type="text" placeholder="Ví dụ: Cử nhân Ngôn ngữ Anh" />

      <input type="file" className="upload-button" placeholder="Tải lên url CV"> </input>

      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-button">Quay lại</button>
        <button onClick={nextStep} className="next-button">Lưu và tiếp tục</button>
      </div>
    </div>
  );
};

export default StepEducation;

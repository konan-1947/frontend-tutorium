import React, { useState } from "react";
import "../../../assets/css/StepPricing.css";

const StepPricing = ({ prevStep }) => {
  const [price, setPrice] = useState("");

  return (
    <div className="step-pricing">
      <h2>Định giá buổi học</h2>
      <p>Chọn mức giá bạn muốn tính cho mỗi buổi học 50 phút.</p>

      <label>Giá (USD)</label>
      <input 
        type="number" 
        placeholder="Nhập số tiền" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-button">Quay lại</button>
        <button className="finish-button">Hoàn tất đăng ký</button>
      </div>
    </div>
  );
};

export default StepPricing;

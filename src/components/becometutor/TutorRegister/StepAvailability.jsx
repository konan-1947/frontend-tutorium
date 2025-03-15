import React, { useState } from "react";
import "../../../assets/css/StepAvailability.css";

const StepAvailability = ({ nextStep, prevStep }) => {
  const [dateTime, setDateTime] = useState('');

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };
  

  return (
    <div className="step-availability">
      <h2>Cài đặt lịch bắt đầu dạy</h2>
      <label htmlFor="datetime">Chọn thời gian:</label>
      <input
        type="datetime-local"
        id="datetime"
        value={dateTime}
        onChange={handleChange}
      />
      <p>Thời gian đã chọn: {dateTime}</p>
      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-button">Quay lại</button>
        <button onClick={nextStep} className="next-button">Lưu và tiếp tục</button>
      </div>
    </div>
  );
};

export default StepAvailability;

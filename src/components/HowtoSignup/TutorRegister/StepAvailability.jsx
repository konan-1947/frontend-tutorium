import React, { useState } from "react";
import "../../../assets/css/StepAvailability.css";

const StepAvailability = ({ nextStep, prevStep }) => {
  const [availability, setAvailability] = useState({
    Monday: { from: "09:00", to: "17:00" },
    Tuesday: { from: "09:00", to: "17:00" },
  });

  return (
    <div className="step-availability">
      <h2>Cài đặt lịch dạy</h2>
      <p>Chọn khung giờ mà bạn sẵn sàng giảng dạy.</p>

      {Object.keys(availability).map((day) => (
        <div key={day} className="availability-row">
          <label>{day}</label>
          <input type="time" value={availability[day].from} />
          <input type="time" value={availability[day].to} />
        </div>
      ))}

      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-button">Quay lại</button>
        <button onClick={nextStep} className="next-button">Lưu và tiếp tục</button>
      </div>
    </div>
  );
};

export default StepAvailability;

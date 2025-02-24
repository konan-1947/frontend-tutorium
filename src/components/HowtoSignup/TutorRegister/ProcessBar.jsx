import React from "react";
import "../../../assets/css/ProcessBar.css";

const steps = [
  "About", "Photo", "Certification",
  "Description", "Video", "Availability", "Pricing"
];

const ProgressBar = ({ step, setStep }) => {
  return (
    <div className="progress-bar">
      {steps.map((label, index) => (
        <div 
          key={index} // Thêm key để tránh lỗi React
          className={`step2 ${index + 1 <= step ? "completed" : ""}`}
          onClick={() => index + 1 <= step && setStep && setStep(index + 1)} 
          style={{ cursor: index + 1 <= step ? "pointer" : "default" }} // Sửa lỗi 'defaulat'
        >
          <div className="step-circle">
            {index + 1 <= step ? "✔" : index + 1}
          </div>
          <div className="step-label">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;

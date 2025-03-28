// file: src/pages/Oops.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/Oops.css"; 

const Oops = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const errorMessage = state?.error || "Đã xảy ra lỗi không xác định";
  const [showError, setShowError] = useState(false);

  const handleRetry = () => {
    window.location.reload(); // Tải lại trang
  };

  const handleGoHome = () => {
    navigate("/"); // Quay về trang chủ
  };

  return (
    <div className="oops-container">
      <div className="oops-content">
        <h1 className="oops-title">Oops!</h1>
        <p className="oops-subtitle">Có vẻ như chúng ta đã gặp chút trục trặc...</p>
        
        {/* Nút ẩn để hiển thị lỗi */}
        <div className="error-toggle">
          <button
            className="error-toggle-btn"
            onClick={() => setShowError(!showError)}
          >
            {showError ? "Ẩn chi tiết" : "Xem chi tiết lỗi"}
          </button>
          {showError && (
            <p className="error-detail animate-error">{errorMessage}</p>
          )}
        </div>

        {/* Nút hành động */}
        <div className="oops-actions">
          <button className="oops-btn retry-btn" onClick={handleRetry}>
            Thử lại
          </button>
          <button className="oops-btn home-btn" onClick={handleGoHome}>
            Quay về trang chủ
          </button>
        </div>
      </div>

      {/* Animation nền */}
      <div className="oops-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
};

export default Oops;
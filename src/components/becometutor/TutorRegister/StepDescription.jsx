import React, { useState } from "react";
import "../../../assets/css/StepDescription.css";

const StepDescription = ({ nextStep, prevStep }) => {
  const [sections, setSections] = useState([
    { id: 1, title: "Giới thiệu bản thân", content: "", isCollapsed: false },
  
  ]);

  // Cập nhật nội dung khi nhập liệu
  const handleChange = (id, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, content: value } : section
      )
    );
  };

  // Xử lý thu gọn khi người dùng nhập xong
  const handleBlur = (id) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id && section.content.trim() !== ""
          ? { ...section, isCollapsed: true }
          : section
      )
    );
  };

  // Mở lại nội dung khi click
  const toggleExpand = (id) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, isCollapsed: false } : section
      )
    );
  };

  return (
    <div className="step-description">
      <h2>Mô tả hồ sơ</h2>
      <p>Thông tin này sẽ xuất hiện trên hồ sơ công khai của bạn.</p>

      {sections.map((section) => (
        <div
          key={section.id}
          className="section"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          <div className="section-header" onClick={() => toggleExpand(section.id)}>
            <h4>{section.id}. {section.title}</h4>
            {section.content && section.isCollapsed && <span className="checkmark">✔</span>}
          </div>

          {!section.isCollapsed ? (
            <>
              <p>Nhập chi tiết về: {section.title.toLowerCase()}.</p>
              <textarea
                rows="5"
                placeholder={`Nhập thông tin về ${section.title.toLowerCase()} của bạn...`}
                value={section.content}
                onChange={(e) => handleChange(section.id, e.target.value)}
                onBlur={() => handleBlur(section.id)}
              />
              <p className="note">
                ⚠ Không bao gồm họ của bạn và không trình bày thông tin như một sơ yếu lý lịch.
              </p>
            </>
          ) : (
            <p className="summary-text" onClick={() => toggleExpand(section.id)}>
              {section.content}
            </p>
          )}
        </div>
      ))}

      {/* Điều hướng */}
      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-button">Quay lại</button>
        <button onClick={nextStep} className="next-button">Lưu và tiếp tục</button>
      </div>
    </div>
  );
};

export default StepDescription;

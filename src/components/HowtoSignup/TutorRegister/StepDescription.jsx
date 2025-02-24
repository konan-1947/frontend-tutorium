import React, { useState } from "react";
import "../../../assets/css/StepDescription.css";

const StepDescription = ({ nextStep, prevStep }) => {
  const [sections, setSections] = useState([
    { id: 1, title: "Introduce yourself", content: "", isCollapsed: false },
    { id: 2, title: "Teaching experience", content: "", isCollapsed: false },
    { id: 3, title: "Motivate potential students", content: "", isCollapsed: false },
    { id: 4, title: "Write a catchy headline", content: "", isCollapsed: false },
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
      <h2>Profile description</h2>
      <p>This info will go on your public profile.</p>

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
              <p>Provide details about: {section.title.toLowerCase()}.</p>
              <textarea
                rows="5"
                placeholder={`Enter your ${section.title.toLowerCase()} here...`}
                value={section.content}
                onChange={(e) => handleChange(section.id, e.target.value)}
                onBlur={() => handleBlur(section.id)}
              />
              <p className="note">
                ⚠ Don’t include your last name or present your information in a CV format.
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
        <button onClick={prevStep} className="back-button">Back</button>
        <button onClick={nextStep} className="next-button">Save and continue</button>
      </div>
    </div>
  );
};

export default StepDescription;

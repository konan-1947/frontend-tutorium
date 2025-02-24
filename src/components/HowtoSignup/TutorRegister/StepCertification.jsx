import React, { useState } from "react";
import "../../../assets/css/StepCertification.css";

const StepCertification = ({ nextStep, prevStep }) => {
  const [cvLinks, setCvLinks] = useState([""]); // Mảng chứa các link CV

  // Xử lý thay đổi giá trị input
  const handleCvChange = (index, value) => {
    const newCvLinks = [...cvLinks];
    newCvLinks[index] = value;
    setCvLinks(newCvLinks);
  };

  // Thêm ô nhập mới khi bấm "Add More"
  const addMoreCv = () => {
    setCvLinks([...cvLinks, ""]);
  };

  // Xóa một link CV cụ thể
  const removeCv = (index) => {
    if (cvLinks.length > 1) {
      const newCvLinks = cvLinks.filter((_, i) => i !== index);
      setCvLinks(newCvLinks);
    }
  };

  return (
    <div className="step-certification">
      <h2>Chứng chỉ giảng dạy</h2>
      <p>Hãy tải lên link CV hoặc chứng chỉ để tăng độ tin cậy.</p>

      <label>Chọn chuyên môn giảng dạy</label>
      <select>
        <option>Tiếng Anh</option>
        <option>Toán</option>
        <option>Vật lý</option>
      </select>

      <label>Nhập link URL CV / Chứng chỉ</label>
      {cvLinks.map((link, index) => (
        <div key={index} className="cv-input-group">
          <input
            type="url"
            placeholder="Nhập link URL"
            value={link}
            onChange={(e) => handleCvChange(index, e.target.value)}
            required
          />
          {cvLinks.length > 1 && (
            <button className="remove-button" onClick={() => removeCv(index)}>Xóa</button>
          )}
        </div>
      ))}

      <button className="add-more-button" onClick={addMoreCv}>+ Thêm link khác</button>

      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-button">Quay lại</button>
        <button onClick={nextStep} className="next-button">Lưu và tiếp tục</button>
      </div>
    </div>
  );
};

export default StepCertification;

import React, { useState } from "react";
import "../../../assets/css/StepVideo.css";

const StepVideo = ({ nextStep, prevStep }) => {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div className="step-video">
      <h2>Giới thiệu bằng video</h2>
      <p>Tải lên một video ngắn để học viên hiểu rõ hơn về bạn.</p>

      <label>Thêm liên kết video YouTube/Vimeo</label>
      <input 
        type="text" 
        placeholder="Dán URL video của bạn"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <button className="upload-button">Tải lên video</button>

      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-button">Quay lại</button>
        <button onClick={nextStep} className="next-button">Lưu và tiếp tục</button>
      </div>
    </div>
  );
};

export default StepVideo;

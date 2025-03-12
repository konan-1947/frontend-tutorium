import React, { useState, useRef } from "react";
import "../../../assets/css/StepPhoto.css";
import ReactCrop, { makeAspectCrop, centerCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Avatar from "../../../assets/img/avatar.png";
const StepPhoto = ({ nextStep, prevStep }) => {
  const [avatar, setAvatar] = useState(Avatar); // Ảnh mặc định
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);

  // Xử lý chọn ảnh
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Cắt ảnh và lưu làm avatar
  const handleCropComplete = async () => {
    if (!imageRef.current || !crop.width || !crop.height) return;

    const croppedCanvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    croppedCanvas.width = crop.width * scaleX;
    croppedCanvas.height = crop.height * scaleY;
    const ctx = croppedCanvas.getContext("2d");

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    croppedCanvas.toBlob((blob) => {
      const croppedImageUrl = URL.createObjectURL(blob);
      setCroppedImage(croppedImageUrl);
    });
  };

  // Xác nhận và lưu ảnh làm avatar
  const handleConfirmAvatar = () => {
    if (croppedImage) {
      setAvatar(croppedImage);
      setSelectedImage(null);
    }
  };

  return (
    <div className="step-photo">
      <h2>Ảnh hồ sơ</h2>
      <p>Chọn một bức ảnh giúp học viên nhận diện bạn dễ dàng.</p>
      <hr />

      <div className="profile-card">
        <img src={avatar} alt="Ảnh hồ sơ" className="profile-avatar" />
        <div className="profile-info">
          <h3>Tezdy N. 🇸🇪</h3>
          <p> Dạy tiếng Anh</p>
        
        </div>
      </div>

      {/* Hiển thị modal cắt ảnh nếu có ảnh được chọn */}
      {selectedImage && (
        <div className="crop-container">
          <h3>Cắt ảnh của bạn</h3>
          <ReactCrop
            src={selectedImage}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={handleCropComplete}
            aspect={1}
          >
            <img ref={imageRef} src={selectedImage} alt="Đang cắt ảnh" />
          </ReactCrop>
          <button onClick={handleConfirmAvatar} className="confirm-button">
            Xác nhận ảnh đại diện
          </button>
        </div>
      )}

      <label className="upload-button">
        Chọn ảnh mới
        <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
      </label>

      <div className="navigation-buttons">
        <button onClick={prevStep} className="back-button">Quay lại</button>
        <button onClick={nextStep} className="next-button">Lưu và tiếp tục</button>
      </div>
    </div>
  );
};

export default StepPhoto;

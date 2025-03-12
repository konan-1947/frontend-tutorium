import React from "react";
import "../../../assets/css/StepAbout.css";
import Form from 'react-bootstrap/Form';

const StepAbout = ({ nextStep }) => {
    return (
        <div className="step-about">
            <h2>Thông tin cá nhân</h2>
            <p>Bắt đầu tạo hồ sơ gia sư công khai của bạn.</p>
            <form>
                <label>Họ</label>
                <input type="text" placeholder="Họ của bạn" />

                <label>Tên</label>
                <input type="text" placeholder="Tên của bạn" />

                <label>Email</label>
                <input type="email" placeholder="Email của bạn" />

                <label>Quốc gia sinh</label>
                <select>
                    <option>Quần đảo Aland</option>
                    <option>Việt Nam</option>
                </select>

                <label>Môn học bạn dạy</label>
                <select>
                    <option>Tiếng Anh</option>
                    <option>Toán</option>
                </select>
              
                <button type="button" onClick={nextStep}>
                    Lưu và Tiếp tục
                </button>
            </form>
        </div>
    );
};

export default StepAbout;

import React from "react";
import "../../../assets/css/StepAbout.css";
import Form from 'react-bootstrap/Form';

const StepAbout = ({ nextStep }) => {
    return (
        <div className="step-about">
            <h2>Thông tin cá nhân</h2>
            <p>Bắt đầu tạo hồ sơ gia sư công khai của bạn.</p>
            <form>
                <label>Tên người dùng </label>
                <input type="text" placeholder="Tên người dùng" className="form-control" />

                <label>Tên hiển thị </label>
                <input type="text" placeholder="Tên hiển thị của bạn" />
                
                <label>Email</label>
                <input type="email" placeholder="Email của bạn" />

                <label>Địa chỉ</label>
                <input type="text" placeholder="Địa chỉ của bạn" />


                <label>Thể loại bạn dạy</label>
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

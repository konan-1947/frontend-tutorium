import React, { useState, useEffect } from 'react';
import { MenuItem, Select, TextField, Button, Box } from '@mui/material';
import '../../../../src/assets/css/ChooseAddress.css';
import Gif from '../../../../src/assets/img/output-onlinegiftools.gif';

const Step2 = ({ formData, setFormData, prevStep, nextStep }) => {
    const [address, setAddress] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Input changed:', name, value);
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        // Lấy dữ liệu đã lưu từ localStorage
        const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
        if (savedData) {
            console.log('Dữ liệu từ localStorage:', savedData);
            setAddress(savedData.address);
        }
    }, []);

    const handleSelect = (e) => {
        e.preventDefault();
        console.log('Form submitted với địa chỉ:', address);
    };

    const handleAddressChange = (e) => {
        const newAddress = e.target.value;
        console.log('Address field thay đổi:', newAddress);
        setAddress(newAddress);
        handleInputChange(e);
    };

    return (
        <form onSubmit={handleSelect}>
            <div className="step-section2">
                <div className="form-section2">
                    <p className="subheading">Nhập địa chỉ của bạn:</p>

                    {/* Address Section */}
                    <div className="section2">
                        <TextField
                            name="address"
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Nhập địa chỉ của bạn"
                        />
                    </div>

                    <div className="navigation-buttons2">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                console.log('Quay lại được nhấn');
                                prevStep();
                            }}
                        >
                            Quay lại
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                console.log('Tiếp theo được nhấn với formData:', formData);
                                nextStep();
                            }}
                        >
                            Tiếp theo
                        </Button>
                    </div>
                </div>

                <div className="div-color">
                    <img src={Gif} alt="Gif" />
                </div>
            </div>
        </form>
    );
};

export default Step2;

import React, { useState, useEffect } from 'react';
import { MenuItem, Select, TextField, Button, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import '../../../../src/assets/css/ChooseAddress.css';
import { useNavigate } from 'react-router-dom';
const Step3 = ({ formData, setFormData, prevStep }) => {
    const [wallet, setWallet] = useState('');
    const Navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(() => {
        // Lấy dữ liệu đã lưu từ localStorage
        const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
        if (savedData) {
            setWallet(savedData.wallet);
        }
    }, []);
    const handleSelect = (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSelect}>
            <div className="step-section2">
                <div className="form-section2">

                    <p className="subheading">Chọn túi tiền của bạn:</p>

                    {/* Wallet Section */}
                    <div className="section2">
                        <Select
                            name="wallet"
                            value={wallet}
                            onChange={(e) => { setAddress(e.target.value), handleInputChange }}
                            fullWidth
                        >
                            <MenuItem value="">Chọn Túi tiền</MenuItem>
                            <MenuItem value="wallet1">Túi tiền 1</MenuItem>
                            <MenuItem value="wallet2">Túi tiền 2</MenuItem>
                            <MenuItem value="wallet3">Túi tiền 3</MenuItem>
                        </Select>
                    </div>

                    <div className="navigation-buttons2">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={prevStep}
                        >
                            Quay lại
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => Navigate('/find')}
                        >
                            Lưu thông tin
                        </Button>
                    </div>
                </div>

                <div className="div-color">

                </div>
            </div>
        </form>
    );
};

export default Step3;

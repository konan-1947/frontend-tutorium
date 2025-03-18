import React, { useState, useEffect } from 'react';
import { MenuItem, Select, TextField, Button, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import '../../../../src/assets/css/ChooseAddress.css';
import { useNavigate } from 'react-router-dom';
import Gif from '../../../../src/assets/img/gif2.gif';
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

                    <p className="subheading">Mục tiêu học tập của bạn:</p>
                    <TextField
                        name="wallet"
                        value={wallet}
                        placeholder="Mục tiêu của bạn"
                        onChange={(e) => { setWallet(e.target.value), handleInputChange }}
                        fullWidth
                    />
                    {/* Wallet Section */}
                    <div className="section2">
                 
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

                <div className="div-color2">
                    <img src={Gif} alt="Gif" />
                </div>
            </div>
        </form>
    );
};

export default Step3;

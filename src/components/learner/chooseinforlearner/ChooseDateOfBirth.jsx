import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import '../../../../src/assets/css/ChooseAddress.css';
import Gif from '../../../../src/assets/img/deadline-unscreen.gif';

const Step3 = ({ formData, setFormData, prevStep, nextStep }) => {
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
        if (savedData && savedData.dateofbirth) {
            setDateOfBirth(dayjs(savedData.dateofbirth));
        }
    }, []);



    const handleSelect = (e) => {
        e.preventDefault();
        
        if (!dateOfBirth) {
            setError('Vui lòng chọn ngày sinh của bạn');
            return;
        }
        setDateOfBirth(dateOfBirth);
        setFormData({ ...formData, dateofbirth: dateOfBirth.format('YYYY-MM-DD') });
        // Lưu vào localStorage
        const savedData = JSON.parse(localStorage.getItem('chooseCustomData')) || {};
        localStorage.setItem('chooseCustomData', JSON.stringify({
            ...savedData,
            dateofbirth: dateOfBirth.format('YYYY-MM-DD')
        }));

        nextStep();
    };

    return (
        <form onSubmit={handleSelect}>
            <div className="step-section2">
            
                <div className="form-section4">
                    <p className="subheading">Chọn ngày sinh của bạn:</p>

                    <div className="section2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={dateOfBirth}
                                onChange={(e) => {setDateOfBirth(e.target.value), handleSelect(e)}}
                                format="DD/MM/YYYY"
                                sx={{
                                    width: '100%',
                                    color: '#ffffff',
                                    '& .MuiOutlinedInput-root': {
                                        color: '#ffffff',
                                        
                                      
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                    },
                                    
                                    
                                }}
                             
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="navigation-buttons2">
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#ffffff',
                                borderColor: '#ffffff',
                                '&:hover': {
                                    borderColor: '#ffffff'
                                }
                            }}
                            onClick={prevStep}
                        >
                            Quay lại
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                color: '#ffffff',
                                backgroundColor: 'transparent',
                                borderColor: '#ffffff',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                            onClick={handleSelect}
                        >
                            Tiếp theo
                        </Button>
                    </div>
                </div>
                <div className="div-color3">
                    <img src={Gif} alt="Gif" />
                </div>
            </div>
        </form>
    );
};

export default Step3; 
import React, { useState, useEffect } from 'react';
import { MenuItem, Select, TextField, Button, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import '../../../../src/assets/css/ChooseAddress.css';
import { useNavigate } from 'react-router-dom';
import Gif from '../../../../src/assets/img/gif2.gif';
import { useChooseCustomInfo } from '../../../hooks/learner/chooseCustomInfo';
const Step3 = ({ formData, setFormData, prevStep }) => {
    const [learninggoal, setLearninggoal] = useState('');
    const { mutate: chooseCustomInfo, isLoading, error } = useChooseCustomInfo();
  
    const Navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData.category);
    };
    useEffect(() => {
        // Lấy dữ liệu đã lưu từ localStorage
        const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
        if (savedData) {
            setLearninggoal(savedData.learninggoal);
        }
    }, []);
    const handleSelect = (e) => {
        e.preventDefault();
        
    }
    const handleSubmit = async () => {
        alert("aa");
        try {
          await chooseCustomInfo.mutateAsync(formData);
      
          
        } catch (err) {
        
        }
      };
    return (
        <form onSubmit={handleSelect}>
            <div className="step-section2">
                <div className="form-section3">

                    <p className="subheading">Mục tiêu học tập của bạn:</p>
                    <TextField
                        sx={{
                            color: '#ffffff',

                            '& .MuiOutlinedInput-root': {
                                color: '#ffffff',

                            },

                        }}
                        name="learninggoal"
                        value={learninggoal}
                        placeholder="Mục tiêu của bạn"
                        onChange={(e) => { setLearninggoal(e.target.value), handleInputChange(e) }}
                        fullWidth
                    />
                    {/* Wallet Section */}
                    <div className="section2">

                    </div>

                    <div className="navigation-buttons2">
                        <Button
                            sx={{

                                color: '#ffffff',
                                borderColor: '#ffffff',
                                '& .MuiOutlinedInput-root': {
                                    color: '#ffffff',


                                },
                                '& .MuiInputLabel-root': {
                                    color: '#ffffff',
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#ffffff',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: '#ffffff',
                                    opacity: 0.7,
                                },
                            }}
                            variant="outlined"
                            color="primary"
                            onClick={prevStep}
                        >
                            Quay lại
                        </Button>
                        <Button
                            sx={{
                                color: '#fd6051',
                                backgroundColor: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Lưu thông tin
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

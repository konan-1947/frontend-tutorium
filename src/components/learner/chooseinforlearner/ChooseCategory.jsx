import React, { useState, useEffect } from 'react';
import { MenuItem, Select, Button, Box } from '@mui/material';
import '../../../../src/assets/css/ChooseCustomInfo.css';
import Img from '../../../../src/assets/img/imgchoosecustominfo.jpg';

const Step1 = ({ formData, setFormData, nextStep }) => {
  const [category, setCategory] = useState('');

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    console.log('Category đã chọn:', value);
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
    if (savedData) {
      console.log('Dữ liệu từ localStorage:', savedData);
      setCategory(savedData.category);
    }
  }, []);

  const handleSelect = (e) => {
    e.preventDefault();
    console.log('Form được submit');
  };

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <form onSubmit={handleSelect}>
        <div className="step-section">
          <div className="form-section">
            <h1>Tài khoản của bạn đã được xác minh</h1>
            <p className="subheading">Chọn Category của bạn:</p>

            {/* Category Section */}
            <div className="section">
              <Select
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  handleSelectChange(e);
                }}
                fullWidth
              >
                <MenuItem value="Chọn Category">Chọn Category</MenuItem>
                <MenuItem value="Tiếng Anh">Tiếng Anh</MenuItem>
                <MenuItem value="Toán">Toán</MenuItem>
              
              </Select>
            </div>

            <div className="navigation-buttons">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log('Nút Tiếp theo được nhấn');
                  console.log('Dữ liệu form:', formData);
                  nextStep();
                }}
              >
                Tiếp theo
              </Button>
            </div>
          </div>

          <div className="image-section">
            <img src={Img} alt="Account" className="image1" />
          </div>
        </div>
      </form>
    </Box>
  );
};

export default Step1;

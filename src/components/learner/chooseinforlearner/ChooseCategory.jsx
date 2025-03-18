import React, { useState, useEffect } from 'react';
import { MenuItem, Select, Button, Box } from '@mui/material';
import '../../../../src/assets/css/ChooseCustomInfo.css';
import Img from '../../../../src/assets/img/imgchoosecustominfo.jpg';
import { useGetCategories } from '../../../hooks/category/getCategories';

const Step1 = ({ formData, setFormData, nextStep }) => {
  const [category, setCategory] = useState('');
  const { mutate: getCategories, data: categories, isLoading } = useGetCategories();

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Lấy dữ liệu đã lưu từ localStorage
    const savedData = JSON.parse(localStorage.getItem('chooseCustomData'));
    if (savedData) {
      setCategory(savedData.category);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const handleSelect = (e) => {
    e.preventDefault();
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', alignItems: 'center', justifyItems: 'center', display: 'flex', flexDirection: 'column' }}>
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
                onChange={(e) => { setCategory(e.target.value), handleSelectChange(e) }}
                fullWidth
                disabled={isLoading}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <>Chọn danh mục</>;
                  }
                  return selected;
                }}
              >
                <MenuItem value="">
                  <>Chọn danh mục</>
                </MenuItem>
                {categories?.data.map((category) => (
                  <MenuItem 
                    key={category.categoryid}
                    value={category.categoryname}
                  >
                    {category.categoryname}
                  </MenuItem>
                ))}
              </Select>
         
            </div>

            <div className="navigation-buttons">
              <Button
                variant="contained"
                color="primary"
                onClick={nextStep}
              >
                Tiếp theo
              </Button>
            </div>
          </div>

          <div className="image-section">
            <img
              src={Img} // Thay thế URL ảnh tại đây
              alt="Account"
              className="image1"
            />
          </div>
        </div>
      </form>
    </Box>
  );
};

export default Step1;

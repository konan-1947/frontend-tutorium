import React, { useState, useEffect } from "react";
import { MenuItem, Select, TextField, Button, Box, Typography, Container, Paper, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useGetCategories } from '../../../hooks/category/getCategories';
import { useChooseCustomInfo } from '../../../hooks/learner/chooseCustomInfo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Gif1 from "../../../assets/img/target.gif";
import Gif2 from "../../../assets/img/books.gif";
import Gif3 from "../../../assets/img/location.gif";
import Gif4 from "../../../assets/img/calendar1.gif";
const TutorRegistrationForm = () => {
  const { mutate: getCategories, data: categories, isLoading } = useGetCategories();
  const { mutate: chooseCustomInfo } = useChooseCustomInfo();
  const navigate = useNavigate();

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState('');
  const [categoryid, setCategoryid] = useState('');
  const [learninggoal, setLearninggoal] = useState('');
  const [formData, setFormData] = useState({ categoryid: '', address: '', dateofbirth: '', learninggoal: '' });
  const [step, setStep] = useState(1);
  const [age, setAge] = useState(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => { getCategories(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    chooseCustomInfo(formData);
    navigate('/find');
  };

  const calculateAge = (dob) => {
    const today = dayjs();
    const birthDate = dayjs(dob);
    return today.diff(birthDate, 'year');
  };

  const getCategorySuggestion = (id) => {
    const category = categories?.data?.find(cat => cat.categoryid === id);
    return category ? `Gợi ý: ${category.categoryname} - Rèn luyện kỹ năng đặc biệt!` : '';
  };

  return (
    <Container maxWidth={false} sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(135deg, #e0f7fa, #f8bbd0)", padding: "0 !important" }}>
      <Paper elevation={6} sx={{ padding: 5, borderRadius: 4, backgroundColor: "#fff", width: "100%", maxWidth: "1200px", border: "2px solid #42a5f5", margin: "auto" }}>
        <Grid container spacing={3}>
          {/* Avatar bên trái */}
          <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
                src={step === 1 ? Gif1 : step === 2 ? Gif2 : step === 3 ? Gif3 : Gif4}
              alt="Avatar"
              style={{ maxWidth: "40%", borderRadius: "8px" }}
            />
          </Grid>
          {/* Form bên phải */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ color: "#1976d2" }}>
              Hành Trình Tìm Gia Sư
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingTop: "10px" }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Bước 1: Mục tiêu học tập */}
                  {step === 1 && (
                    <div style={{ width: '100%' }}>
                      <TextField
                        label="Mục tiêu học tập của bạn là gì?"
                        variant="outlined"
                        fullWidth
                        name="learninggoal"
                        value={learninggoal}
                        onChange={(e) => { setLearninggoal(e.target.value); handleInputChange(e); }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: "14px" } }}
                      />
                      <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                       
                        <Button 
                          onClick={handleNextStep} 
                          variant="contained" 
                          fullWidth 
                          sx={{ borderRadius: "14px" }}
                        >
                          Tiếp tục
                        </Button>
                      </Box>
                    </div>
                  )}
                  {/* Bước 2: Danh mục */}
                  {step === 2 && (
                    <div style={{ width: '100%' }}>
                      <Select
                        name="categoryid"
                        value={categoryid}
                        onChange={(e) => { setCategoryid(e.target.value); handleInputChange(e); }}
                        fullWidth
                        displayEmpty
                        variant="outlined"
                        sx={{ borderRadius: "14px" }}
                      >
                        <MenuItem value=""><em>Chọn lĩnh vực yêu thích</em></MenuItem>
                        {categories?.data?.map((category) => (
                          <MenuItem key={category.categoryid} value={category.categoryid}>
                            {category.categoryname}
                          </MenuItem>
                        ))}
                      </Select>
                      {categoryid && <Typography sx={{ mt: 2, color: "#4caf50" }}>{getCategorySuggestion(categoryid)}</Typography>}
                      <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                        <Button 
                          onClick={handlePrevStep} 
                          variant="outlined" 
                          fullWidth 
                          sx={{ borderRadius: "14px" }}
                        >
                          Quay về
                        </Button>
                        <Button 
                          onClick={handleNextStep} 
                          variant="contained" 
                          fullWidth 
                          sx={{ borderRadius: "14px" }}
                        >
                          Tiếp tục
                        </Button>
                      </Box>
                    </div>
                  )}
                  {/* Bước 3: Địa chỉ */}
                  {step === 3 && (
                    <div style={{ width: '120%' }}>
                      <TextField
                        label="Bạn sống ở đâu?"
                        variant="outlined"
                        fullWidth
                        name="address"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); handleInputChange(e); }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: "14px" } }}
                      />
                      <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                        <Button 
                          onClick={handlePrevStep} 
                          variant="outlined" 
                          fullWidth 
                          sx={{ borderRadius: "14px", padding: '10x 0' }}
                        >
                          Quay về
                        </Button>
                        <Button 
                          onClick={handleNextStep} 
                          variant="contained" 
                          fullWidth 
                          sx={{ borderRadius: "16px", padding: '9px 10px' }}
                        >
                          Tiếp tục
                        </Button>
                      </Box>
                    </div>
                  )}
                  {/* Bước 4: Ngày sinh & Submit */}
                  {step === 4 && (
                    <div style={{ width: '80%', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Ngày đặc biệt của bạn"
                          value={dateOfBirth}
                          onChange={(newValue) => {
                            setDateOfBirth(newValue);
                            setFormData({ ...formData, dateofbirth: newValue ? newValue.format('YYYY-MM-DD') : '' });
                            setAge(calculateAge(newValue));
                          }}
                          format="DD/MM/YYYY"
                          renderInput={(params) => <TextField {...params} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: "8px" } }} />}
                        />
                      </LocalizationProvider>
                      {age && <Typography sx={{ mt: 1, color: "#1976d2", fontSize: '0.9rem' }}>Chào bạn {age} tuổi đầy năng lượng!</Typography>}
                      <Button onClick={() => setPreview(true)} variant="outlined" fullWidth sx={{ mt: 1, borderRadius: "8px", fontSize: '0.9rem' }}>
                        Xem trước hành trình
                      </Button>
                      {preview && (
                        <Box sx={{ mt: 1, p: 1, border: "1px solid #42a5f5", borderRadius: "8px" }}>
                          <Typography sx={{ fontSize: '0.9rem' }}>Mục tiêu: {formData.learninggoal}</Typography>
                          <Typography sx={{ fontSize: '0.9rem' }}>Danh mục: {categories?.data?.find(cat => cat.categoryid === formData.categoryid)?.categoryname}</Typography>
                          <Typography sx={{ fontSize: '0.9rem' }}>Địa chỉ: {formData.address}</Typography>
                          <Typography sx={{ fontSize: '0.9rem' }}>Ngày sinh: {formData.dateofbirth}</Typography>
                        </Box>
                      )}
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button 
                          onClick={handlePrevStep} 
                          variant="outlined" 
                          fullWidth 
                          sx={{ borderRadius: "8px", fontSize: '0.9rem' }}
                        >
                          Quay về
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="medium"
                          fullWidth
                          sx={{ borderRadius: "8px", padding: 1, fontSize: '1rem', '&:hover': { boxShadow: "0 0 5px #42a5f5" } }}
                        >
                          Bắt Đầu
                        </Button>
                      </Box>
                    </div>
                  )}
                  
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TutorRegistrationForm;
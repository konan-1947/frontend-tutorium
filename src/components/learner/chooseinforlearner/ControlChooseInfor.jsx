import React, { useState, useEffect } from "react";
import { MenuItem, Select, TextField, Button, Box, Typography, Container, Paper, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useGetCategories } from '../../../hooks/category/getCategories';
import { useChooseCustomInfo } from '../../../hooks/learner/chooseCustomInfo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { motion } from "framer-motion"; // Thêm animation
import Confetti from 'react-confetti'; // Hiệu ứng pháo hoa
import dayjs from 'dayjs';

const TutorRegistrationForm = () => {
  const { mutate: getCategories, data: categories, isLoading } = useGetCategories();
  const { mutate: chooseCustomInfo } = useChooseCustomInfo();
  const navigate = useNavigate();

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState('');
  const [categoryid, setCategoryid] = useState('');
  const [learninggoal, setLearninggoal] = useState('');
  const [formData, setFormData] = useState({ categoryid: '', address: '', dateofbirth: '', learninggoal: '' });
  const [step, setStep] = useState(1); // Quản lý các bước
  const [showConfetti, setShowConfetti] = useState(false); // Hiệu ứng pháo hoa
  const [age, setAge] = useState(null); // Tính tuổi
  const [preview, setPreview] = useState(false); // Xem trước

  useEffect(() => { getCategories(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    chooseCustomInfo(formData);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      navigate('/find'); // Điều hướng sau khi submit
    }, 3000);
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
      {showConfetti && <Confetti />}
      <Paper elevation={6} sx={{ padding: 5, borderRadius: 4, backgroundColor: "#fff", width: "100%", maxWidth: "1200px", border: "2px solid #42a5f5", margin: "auto" }}>
        <Grid container spacing={3}>
          {/* Avatar động bên trái */}
          <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <motion.img
              src={step === 1 ? "/avatar_goal.png" : step === 2 ? "/avatar_book.png" : step === 3 ? "/avatar_map.png" : "/avatar_calendar.png"}
              alt="Avatar"
              style={{ maxWidth: "80%", borderRadius: "8px" }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </Grid>
          {/* Form bên phải */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ color: "#1976d2" }}>
              Hành Trình Tìm Gia Sư
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' ,paddingTop: "10px"  }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Bước 1: Mục tiêu học tập */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <TextField
                        label="Mục tiêu học tập của cậu là gì?"
                        variant="outlined"
                        fullWidth
                        name="learninggoal"
                        value={learninggoal}
                        onChange={(e) => { setLearninggoal(e.target.value); handleInputChange(e); }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: "12px" } }}
                      />
                      <Button onClick={handleNextStep} variant="outlined" fullWidth sx={{ mt: 2, borderRadius: "12px" }}>
                        Tiếp tục
                      </Button>
                    </motion.div>
                  )}
                  {/* Bước 2: Danh mục */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <Select
                        name="categoryid"
                        value={categoryid}
                        onChange={(e) => { setCategoryid(e.target.value); handleInputChange(e); }}
                        fullWidth
                        displayEmpty
                        variant="outlined"
                        sx={{ borderRadius: "12px" }}
                      >
                        <MenuItem value=""><em>Chọn lĩnh vực yêu thích</em></MenuItem>
                        {categories?.data?.map((category) => (
                          <MenuItem key={category.categoryid} value={category.categoryid}>
                            {category.categoryname}
                          </MenuItem>
                        ))}
                      </Select>
                      {categoryid && <Typography sx={{ mt: 1, color: "#4caf50" }}>{getCategorySuggestion(categoryid)}</Typography>}
                      <Button onClick={handleNextStep} variant="outlined" fullWidth sx={{ mt: 2, borderRadius: "12px" }}>
                        Tiếp tục
                      </Button>
                    </motion.div>
                  )}
                  {/* Bước 3: Địa chỉ */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <TextField
                        label="Cậu sống ở đâu?"
                        variant="outlined"
                        fullWidth
                        name="address"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); handleInputChange(e); }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: "12px" } }}
                      />
                      <Button onClick={handleNextStep} variant="outlined" fullWidth sx={{ mt: 2, borderRadius: "12px" }}>
                        Tiếp tục
                      </Button>
                    </motion.div>
                  )}
                  {/* Bước 4: Ngày sinh & Submit */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Ngày đặc biệt của cậu"
                          value={dateOfBirth}
                          onChange={(newValue) => {
                            setDateOfBirth(newValue);
                            setFormData({ ...formData, dateofbirth: newValue ? newValue.format('YYYY-MM-DD') : '' });
                            setAge(calculateAge(newValue));
                          }}
                          format="DD/MM/YYYY"
                          renderInput={(params) => <TextField {...params} fullWidth variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: "12px" } }} />}
                        />
                      </LocalizationProvider>
                      {age && <Typography sx={{ mt: 1, color: "#1976d2" }}>Chào bạn {age} tuổi đầy năng lượng!</Typography>}
                      <FormControlLabel control={<Checkbox color="primary" />} label="Ghi nhớ hành trình" />
                      <Button onClick={() => setPreview(true)} variant="outlined" fullWidth sx={{ mt: 2, borderRadius: "12px" }}>
                        Xem trước hành trình
                      </Button>
                      {preview && (
                        <Box sx={{ mt: 2, p: 2, border: "1px solid #42a5f5", borderRadius: "12px" }}>
                          <Typography>Mục tiêu: {formData.learninggoal}</Typography>
                          <Typography>Danh mục: {categories?.data?.find(cat => cat.categoryid === formData.categoryid)?.categoryname}</Typography>
                          <Typography>Địa chỉ: {formData.address}</Typography>
                          <Typography>Ngày sinh: {formData.dateofbirth}</Typography>
                        </Box>
                      )}
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{ mt: 2, borderRadius: "12px", padding: 1.5, fontSize: '1.1rem', '&:hover': { boxShadow: "0 0 10px #42a5f5" } }}
                      >
                        Bắt Đầu Hành Trình
                      </Button>
                    </motion.div>
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
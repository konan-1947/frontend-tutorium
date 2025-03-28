import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useResetPassword } from '../../hooks/auth/resetPassword';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { mutate: resetPassword, isLoading, error, isSuccess } = useResetPassword();
  const [formData, setFormData] = useState({
    oldPassword: '',

    newPassword: '',
    confirmPassword: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate form
    if (!formData.oldPassword  || !formData.newPassword || !formData.confirmPassword) {
      setFormError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setFormError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    if (formData.newPassword.length < 6) {
      setFormError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    // Call API
    resetPassword(formData, {
      onSuccess: () => {
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    });
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh",
        padding: "0 !important"
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          padding: 5, 
          borderRadius: 4, 
          backgroundColor: "#fff", 
          width: "100%", 
          maxWidth: "500px", 
          border: "2px solid #42a5f5", 
          margin: "auto" 
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          fontWeight="bold" 
          sx={{ color: "#1976d2" }}
        >
          Đặt Lại Mật Khẩu
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          sx={{ mb: 4, color: "#666" }}
        >
          Vui lòng nhập thông tin để đặt lại mật khẩu
        </Typography>

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Đặt lại mật khẩu thành công! Bạn sẽ được chuyển đến trang đăng nhập.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message || 'Có lỗi xảy ra. Vui lòng thử lại.'}
          </Alert>
        )}

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
    
          <TextField
            fullWidth
            label="Mật khẩu cũ"
            name="oldPassword"
            type={showOldPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.oldPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': { 
                borderRadius: "12px" 
              }
            }}
          />

          <TextField
            fullWidth
            label="Mật khẩu mới"
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.newPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': { 
                borderRadius: "12px" 
              }
            }}
          />

          <TextField
            fullWidth
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': { 
                borderRadius: "12px" 
              }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ 
              borderRadius: "12px", 
              padding: 1.5, 
              fontSize: '1.1rem',
              '&:hover': { 
                boxShadow: "0 0 10px #42a5f5" 
              }
            }}
          >
            {isLoading ? 'Đang xử lý...' : 'Đặt Lại Mật Khẩu'}
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Quay lại đăng nhập
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
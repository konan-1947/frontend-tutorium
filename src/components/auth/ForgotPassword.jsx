import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Alert
} from '@mui/material';
import { useForgotPassword } from '../../hooks/auth/forgotPassword';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: forgotPassword, isLoading, error, isSuccess } = useForgotPassword();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate email
    if (!email) {
      setFormError('Vui lòng nhập email');
      return;
    }

  

    // Call API
    forgotPassword(email);
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
          Quên Mật Khẩu
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          sx={{ mb: 4, color: "#666" }}
        >
          Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
        </Typography>

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Đã gửi email khôi phục mật khẩu thành công! Vui lòng kiểm tra hộp thư của bạn.
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
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? 'Đang gửi...' : 'Gửi Email Khôi Phục'}
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

export default ForgotPassword; 
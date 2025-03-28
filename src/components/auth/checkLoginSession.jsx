import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckLoginSession } from '../../hooks/auth/checkLoginSession'; // Điều chỉnh đường dẫn
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { mutate: checkLogin, data, isPending, isError } = useCheckLoginSession();

  useEffect(() => {
    checkLogin(); // Gọi API kiểm tra khi component mount
  }, [checkLogin]);
console.log(data);
  // Đang tải
  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Đang kiểm tra trạng thái đăng nhập...</Typography>
      </Box>
    );
  }

  // Lỗi khi kiểm tra
  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Không thể kiểm tra trạng thái đăng nhập. Vui lòng thử lại!</Typography>
      </Box>
    );
  }

  // Kiểm tra dữ liệu trả về
  if (data) {
    const { isAuthenticated, roles } = data;

    // Chưa đăng nhập
    if (!isAuthenticated) {
      navigate('/login'); // Chuyển hướng đến trang đăng nhập
      return null;
    }

    // Kiểm tra role
    if (allowedRoles && !allowedRoles.includes(roles)) {
      return (
      <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
        Bạn không có quyền truy cập trang này!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
        <a
          href="/login"
          style={{
          color: '#1976d2',
          textDecoration: 'underline',
          fontWeight: 'bold',
          }}
        >
          Quay về trang đăng nhập
        </a>
        </Typography>
      </Box>
      );
    }
    

    // Đúng role, render nội dung
    return children;
  }

  return null; // Trường hợp chưa có dữ liệu
};

export default ProtectedRoute;
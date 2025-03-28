import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, Chip } from '@mui/material';
import { useGetListAllContracts } from '../../../hooks/learner/getListAllContracts';
import { useNavigate } from 'react-router-dom';

const ListAllContract = () => {
  const { mutate: getListAllContracts, data: tutorData, isPending, isError, error } = useGetListAllContracts();
  const navigate = useNavigate();

  useEffect(() => {
    getListAllContracts(); // Gọi API mà không cần truyền learnerId
  }, [getListAllContracts]);

  console.log(tutorData);

  // Hàm định dạng màu sắc cho từng trạng thái
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { backgroundColor: '#4caf50', color: '#fff' }; // Xanh lá
      case 'completed':
        return { backgroundColor: '#2196f3', color: '#fff' }; // Xanh dương
      case 'pending':
        return { backgroundColor: '#ff9800', color: '#fff' }; // Cam
      case 'cancelled': // Sửa 'cancel' thành 'cancelled' để khớp với DB
        return { backgroundColor: '#f44336', color: '#fff' }; // Đỏ
      default:
        return { backgroundColor: '#e0e0e0', color: '#000' }; // Mặc định
    }
  };

  // Hàm định dạng ngày giờ
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Typography variant="h6" color="textSecondary">
          Đang tải danh sách hợp đồng...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Typography variant="h6" color="error">
          Lỗi: {error.message || 'Không thể tải danh sách hợp đồng.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f7fa', borderRadius: 2, boxShadow: 1 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2', textAlign: 'center' }}
      >
        Danh sách hợp đồng
      </Typography>

      {tutorData?.data?.length > 0 ? (
        <List sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
          {tutorData.data.map((contract, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  py: 2,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f8f9fa',
                  },
                  display: 'flex',
                  flexDirection: 'column', // Sắp xếp theo cột để dễ đọc
                  alignItems: 'flex-start', // Căn trái
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <ListItemAvatar>
                    <Avatar
                      src={contract.imgurl} // Nếu có ảnh tutor, cần thêm JOIN để lấy từ Users
                      sx={{ width: 50, height: 50, border: '2px solid #007bff' }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {contract.tutor_name || 'Chưa có tên'}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          Mục tiêu: {contract.target || 'Chưa xác định'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Thời gian bắt đầu: {formatDateTime(contract.timestart)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Thời gian kết thúc: {formatDateTime(contract.timeend)}
                        </Typography>
                      </>
                    }
                    sx={{ ml: 2 }}
                  />
                  <Chip
                    label={contract.status || 'Không xác định'}
                    sx={{
                      fontWeight: 'bold',
                      ...getStatusStyles(contract.status),
                      minWidth: '100px',
                      textAlign: 'center',
                      ml: 'auto', // Đẩy Chip sang phải
                    }}
                  />
                </Box>
              </ListItem>
              {index < tutorData.data.length - 1 && (
                <Divider sx={{ mx: 2, backgroundColor: '#e0e0e0' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
          Bạn chưa có hợp đồng nào.
        </Typography>
      )}
    </Box>
  );
};

export default ListAllContract;
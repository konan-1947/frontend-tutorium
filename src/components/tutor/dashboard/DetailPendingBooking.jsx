import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useGetDetailPendingBooking } from '../../../hooks/tutor/getDetailPendingBooking';
import {useApproveContract} from '../../../hooks/tutor/approveContract';
const DetailPendingBooking = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const { mutate: getBookingDetails, data, isLoading, error } = useGetDetailPendingBooking();
  const {mutate: approveContract} = useApproveContract();
  useEffect(() => {
    getBookingDetails(contractId);
  }, [contractId, getBookingDetails]);
const HandldApprove = () => {
    approveContract(contractId);
  
}
  // Hàm định dạng thời gian: dd/mm/yyyy, hh:mm
  const formatDateTime = (isoString) => {
    if (!isoString) return 'Không có';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  // Hàm định dạng tiền tệ
  const formatCurrency = (value) => {
    return value ? `${value.toLocaleString('vi-VN')} VND` : 'Không có';
  };

  // Render chi tiết hợp đồng
  const renderContractDetails = () => {
    if (!data?.data?.contractDetail) return null;

    const { contractDetail } = data.data;
    return (
      <Box sx={{ mb: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Chi Tiết Hợp Đồng
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Mã Hợp Đồng:</strong> {contractDetail.contractid}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Tên Học Viên:</strong> {contractDetail.learnerName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Thời Gian Bắt Đầu:</strong> {formatDateTime(contractDetail.timestart)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Thời Gian Kết Thúc:</strong> {formatDateTime(contractDetail.timeend)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Thanh Toán:</strong> {formatCurrency(contractDetail.payment)}
        </Typography>
        <Typography variant="body1">
          <strong>Mã Gia Sư:</strong> {contractDetail.tutorid}
        </Typography>
      </Box>
    );
  };

  // Render các lịch trình xung đột
  const renderConflictingBookings = () => {
    if (!data?.data?.conflictingBookings || data.data.conflictingBookings.length === 0) {
      return (
        <Box sx={{ mb: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Lịch Trình Xung Đột
          </Typography>
          <Typography>Không có lịch trình xung đột.</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ mb: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Lịch Trình Xung Đột
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Mã Hợp Đồng</strong></TableCell>
                <TableCell><strong>Thời Gian Bắt Đầu</strong></TableCell>
                <TableCell><strong>Thời Gian Kết Thúc</strong></TableCell>
                <TableCell><strong>Người học</strong></TableCell>
                <TableCell><strong>Lương</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.conflictingBookings.map((booking) => (
                <TableRow key={booking.contractid}>
                  <TableCell>{booking.contractid}</TableCell>
                  <TableCell>{formatDateTime(booking.timestart)}</TableCell>
                  <TableCell>{formatDateTime(booking.timeend)}</TableCell>
                  <TableCell>{booking.learnerName}</TableCell>
                  <TableCell>{booking.payment}VND</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Đang tải...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error.message || 'Lỗi khi tải chi tiết hợp đồng'}</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Quay Lại
        </Button>
      </Box>
    );
  }

  if (!data || !data.data) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Không có dữ liệu</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Quay Lại
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Chi Tiết Hợp Đồng Đang Chờ
      </Typography>

      {renderContractDetails()}
      {renderConflictingBookings()}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Quay Lại
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            HandldApprove();
            window.location.reload();
          }}
        >
          Chấp Nhận Hợp Đồng
        </Button>
        <Button variant="contained" color="error">
          Từ Chối Hợp Đồng
        </Button>
      </Box>
    </Box>
  );
};

export default DetailPendingBooking;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Box, Typography, Button } from '@mui/material';
import { Table } from "react-bootstrap";
import { useGetListPendingBooking } from "../../../hooks/tutor/getListPendingBooking";

const ListPendingBooking = () => {
  const { mutate: getListPending, data, isLoading, error } = useGetListPendingBooking();
  const navigate = useNavigate();

  useEffect(() => {
    getListPending();
  }, [getListPending]);

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Đang tải...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">\Lỗi: {error.message}</Typography>
      </Box>
    );
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Không có hợp đồng nào đang chờ</Typography>
      </Box>
    );
  }

  // Hàm format ngày giờ
  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      dateStyle: 'short',
      timeStyle: 'short'
    });
  };

  // Hàm điều hướng đến trang chi tiết
  const handleViewDetails = (contractId) => {
    navigate(`/tutor/dashboard/pending-booking/${contractId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Hợp đồng đang chờ
      </Typography>
      <Table striped bordered hover>
        <thead>
          <tr>

            <th>Tên người học</th>
            <th>Thời gian bắt đầu</th>
            <th>Thời gian kết thúc</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((booking, index) => (
            <tr key={booking?.contractid || index}>

              <td>{booking?.learnerName || 'Unknown'}</td>
              <td>{formatDateTime(booking?.timestart)}</td>
              <td>{formatDateTime(booking?.timeend)}</td>
              <td>{booking?.payment || 'N/A'}</td>
              <td>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/tutor/dashboard/pending-booking/${booking?.contractid}`, { state: booking?.contractid })}
                >
                  Xem chi tiết
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default ListPendingBooking;
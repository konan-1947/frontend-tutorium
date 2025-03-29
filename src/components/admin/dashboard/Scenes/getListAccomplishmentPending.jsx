import React, { useEffect, useState } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import getAccompList from '../../../../hooks/admin/getListAccomplishmentPending';
import Header from "../Header";
import { Button } from "@mui/material";
import { useApproveAccomplishmentPending } from '../../../../hooks/admin/approveAccomplishmentPending'; // Import the corrected hook

const PendingAccomplishments = () => {
  const [accompData, setAccompData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Use the corrected hook
  const { mutate: approveAccomplishmentMutation, isPending: isProcessing } = useApproveAccomplishmentPending();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "displayname", headerName: "Tên người dùng", flex: 1, cellClassName: "name-column--cell" },
    { field: "accomplishmentid", headerName: "ID Thành tựu", flex: 1 },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    { 
      field: "verifylink", 
      headerName: "Link xác thực", 
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          Xem link
        </a>
      ),
    },
    { field: "achievement_date", headerName: "Ngày đạt", flex: 1 },
    { field: "issuer", headerName: "Nơi cấp", flex: 1 },
    { field: "expiration_date", headerName: "Ngày hết hạn", flex: 1 },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1.5,
      renderCell: ({ row }) => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleApprove(row.accomplishmentid)}
            disabled={isProcessing}
          >
            {isProcessing ? "Đang xử lý..." : "Xác nhận"}
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleReject(row.accomplishmentid)}
            disabled={isProcessing}
          >
            {isProcessing ? "Đang xử lý..." : "Hủy"}
          </Button>
        </Box>
      ),
    },
  ];

  // Hook để lấy danh sách thành tựu đang chờ duyệt
  const fetchData = async () => {
    try {
      const data = await getAccompList();
      console.log("Fetched accomplishment data:", JSON.stringify(data));
      setAccompData(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thành tựu: ", error);
      setError("Có lỗi xảy ra khi lấy dữ liệu thành tựu.");
      setLoading(false);
    }
  };

  // Xử lý khi nhấn nút Xác nhận
  const handleApprove = (accomplishmentid) => {
    if (window.confirm("Bạn có chắc chắn muốn xác nhận thành tựu này?")) {
      approveAccomplishmentMutation(
        { accomplishmentid, action: "approve" },
        {
          onSuccess: () => {
            alert("Xác nhận thành tựu thành công!");
            window.location.reload();
          },
          onError: (error) => {
            alert("Xác nhận thành tựu thất bại: " + error.message);
          },
        }
      );
    }
  };

  // Xử lý khi nhấn nút Hủy
  const handleReject = (accomplishmentid) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy thành tựu này?")) {
      approveAccomplishmentMutation(
        { accomplishmentid, action: "reject" },
        {
          onSuccess: () => {
            alert("Hủy thành tựu thành công!");
            window.location.reload();
          },
          onError: (error) => {
            alert("Hủy thành tựu thất bại: " + error.message);
          },
        }
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Chuyển đổi dữ liệu từ API thành định dạng mà DataGrid cần
  const rows = accompData?.data?.map((accomp, index) => ({
    id: accomp.accomplishmentid || index + 1,
    displayname: accomp.displayname,
    accomplishmentid: accomp.accomplishmentid,
    status: accomp.status,
    verifylink: accomp.verifylink,
    achievement_date: new Date(accomp.achievement_date).toLocaleDateString("vi-VN"),
    issuer: accomp.issuer,
    expiration_date: new Date(accomp.expiration_date).toLocaleDateString("vi-VN"),
  }));

  return (
    <Box m="20px">
      <Header title="PENDING ACCOMPLISHMENTS" subtitle="Managing Pending Accomplishments" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default PendingAccomplishments;
import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import getTutorList from '../../../../hooks/admin/getTutorList'; // Hàm lấy dữ liệu giảng viên
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../Header";

const Team = () => {
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Tên", flex: 1, cellClassName: "name-column--cell" },
    { field: "specialization", headerName: "Lĩnh vực", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "dateOfBirth", headerName: "Ngày sinh", flex: 1 },
    { field: "expectedSalary", headerName: "Lương (Million VND)", flex: 1 },
    { field: "socialCredit", headerName: "Điểm đánh giá", flex: 1 },
    {
      field: "videoLink",
      headerName: "Video Link",
      flex: 1,
      renderCell: ({ row: { videoLink } }) => (
        <a href={videoLink} target="_blank" rel="noopener noreferrer">Watch Video</a>
      ),
    },
  ];

  // Hàm để lấy dữ liệu trước khi render
  const fetchData = async () => {
    try {
      const data = await getTutorList();
      setTutorData(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giảng viên: ", error);
      setError("Có lỗi xảy ra khi lấy dữ liệu giảng viên.");
      setLoading(false);
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
  const rows = tutorData?.data?.map(tutor => ({
    id: tutor.userid,
    name: tutor.User.displayname,
    specialization: tutor.description,
    address: tutor.User.address,
    email: tutor.User.email,
    dateOfBirth: new Date(tutor.User.dateofbirth).toLocaleDateString(),
    expectedSalary: tutor.expectedsalary,
    socialCredit: tutor.socialcredit,
    videoLink: tutor.descriptionvideolink,
  }));

  return (
    <Box m="20px">
      <Header title="" subtitle="" />
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
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </Box>
    </Box>
  );
};

export default Team;

import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import { useGetListUnverifyTutor } from '../../../../hooks/admin/getListUnverifyTutor';
import Header from "../Header";
import { useNavigate } from 'react-router-dom';

const Team = () => {
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { mutate: getListUnverifyTutor } = useGetListUnverifyTutor();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Tên", flex: 1, cellClassName: "name-column--cell" },
    { field: "specialization", headerName: "Lĩnh vực", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "dateOfBirth", headerName: "Ngày sinh", flex: 1 },
    { field: "username", headerName: "Tên đăng nhập", flex: 1 }, // Thêm cột username

    {
      field: "edit",
      headerName: "Sửa",
      flex: 0.5,
      renderCell: (params) => {
        const tutorData = {
          userid: params.row.id,
        };
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/admin/TutorDetail/${params.row.id}`)}
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  // Hàm để lấy dữ liệu từ hook
  const fetchData = () => {
    getListUnverifyTutor(null, {
      onSuccess: (data) => {
        setTutorData(data);
        setLoading(false);
      },
      onError: (error) => {
        console.error("Lỗi khi lấy danh sách gia sư chưa xác minh: ", error);
        setError("Có lỗi xảy ra khi lấy dữ liệu gia sư chưa xác minh.");
        setLoading(false);
      },
    });
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
    name: tutor.displayname || "Không có tên",
    specialization: tutor.description || "Không có mô tả",
    address: tutor.address || "Không có địa chỉ",
    email: tutor.email || "Không có email",
    dateOfBirth: tutor.dateofbirth
      ? new Date(tutor.dateofbirth).toLocaleDateString('vi-VN')
      : "Không có ngày sinh",
    username: tutor.username || "Không có tên đăng nhập",
    videoLink: tutor.descriptionvideolink || "Không có link",
  })) || [];

  return (
    <Box m="20px">
      <Header title="Danh sách gia sư chưa xác minh" subtitle="Quản lý gia sư chưa được duyệt" />
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
        <DataGrid rows={rows} columns={columns}  />
      </Box>
    </Box>
  );
};

export default Team;

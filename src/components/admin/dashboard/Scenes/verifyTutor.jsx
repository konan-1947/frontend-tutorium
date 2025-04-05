import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import getTutorList from '../../../../hooks/admin/getTutorList';
import Header from "../Header";
import { useNavigate } from 'react-router-dom';

const Team = () => {
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Tên", flex: 1, cellClassName: "name-column--cell" },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "edit",
      headerName: "xác minh",
      flex: 0.5,
      renderCell: (params) => {
        const tutorData = {
          userid: params.row.id,
        };

        console.log("Click vào giảng viên:", tutorData); // Log thông tin khi nhấn nút xem chi tiết

        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate(`/admin/verifytutordetail/${params.row.id}`, { state: tutorData })
            }
          >
            xem chi tiết
          </Button>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      console.log("Đang lấy dữ liệu giảng viên...");
      const data = await getTutorList();
      console.log("Dữ liệu nhận được từ API:", data); // Log dữ liệu thô từ API

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

  const rows = tutorData?.data?.map(tutor => {
    const transformedTutor = {
      id: tutor.userid,
      name: tutor.User.displayname,
      specialization: tutor.description,
      address: tutor.User.address,
      email: tutor.User.email,
      dateOfBirth: new Date(tutor.User.dateofbirth).toLocaleDateString(),
      expectedSalary: tutor.expectedsalary,
      socialCredit: tutor.socialcredit,
      videoLink: tutor.descriptionvideolink,
    };

    console.log("Giảng viên sau khi chuyển đổi:", transformedTutor); // Log mỗi bản ghi sau khi format

    return transformedTutor;
  });

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

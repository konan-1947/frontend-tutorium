import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import getLearnerList from '../../../../hooks/admin/getLearnerList'; // Gọi API lấy dữ liệu học viên
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Header from "../Header";

const Learner = () => {
  const [learnerData, setLearnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();  // Initialize navigate hook

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Tên", flex: 1, cellClassName: "name-column--cell" },
    { field: "specialization", headerName: "Mục tiêu", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "dateOfBirth", headerName: "Ngày sinh", flex: 1 },
    { field: "role", headerName: "Vai trò", flex: 1 },
    {
      field: "edit",
      headerName: "Sửa",
      flex: 1,
      renderCell: (params) => {
        const learnerData = {
          userid: params.row.id, // Ensure categoryId is correctly passed
        }
        return (
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate(`/admin/updateLearner/${params.row.id}`, { state: learnerData  })}  // Pass learner data via navigate
          >
            Sửa
          </Button>
        );
      }
    }
  ];

  // Hàm để lấy dữ liệu trước khi render
  const fetchData = async () => {
    try {
      const data = await getLearnerList(); // Gọi API lấy danh sách học viên
      setLearnerData(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu học viên: ", error);
      setError("Có lỗi xảy ra khi lấy dữ liệu học viên.");
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
  const rows = learnerData?.data?.map(learner => ({
    id: learner.userid,
    name: learner.User.displayname,
    specialization: learner.learninggoal, // Lĩnh vực (hoặc mục tiêu học tập)
    address: learner.User.address,
    email: learner.User.email,
    dateOfBirth: new Date(learner.User.dateofbirth).toLocaleDateString(),
    role: learner.User.Roles[0].rolename
  }));

  return (
    <Box m="20px">
      <Header title="" subtitle="" /> {/* Cập nhật tiêu đề */}
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

export default Learner;

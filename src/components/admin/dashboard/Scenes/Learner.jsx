import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import getLearnerList from '../../../../hooks/admin/getLearnerList';
import { useDeleteLearner } from '../../../../hooks/admin/deleteLearner'; // Import hook mới
import { useNavigate } from 'react-router-dom';
import Header from "../Header";

const Learner = () => {
  const [learnerData, setLearnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { mutate: deleteLearner } = useDeleteLearner(); // Sử dụng hook xóa

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
          userid: params.row.id,
        };
        return (
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate(`/admin/updateLearner/${params.row.id}`, { state: learnerData })}
          >
            Sửa
          </Button>
        );
      }
    },
    {
      field: "delete",
      headerName: "Xóa",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn muốn xóa học viên này?")) {
                deleteLearner(params.row.id, {
                  onSuccess: () => {
                    fetchData(); // Cập nhật lại danh sách sau khi xóa
                  },
                  onError: (error) => {
                    alert("Xóa học viên thất bại: " + error.message);
                  },
                });
              }
            }}
          >
            Xóa
          </Button>
        );
      }
    }
  ];

  // Hàm để lấy dữ liệu trước khi render
  const fetchData = async () => {
    try {
      const data = await getLearnerList();
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
    specialization: learner.learninggoal,
    address: learner.User.address,
    email: learner.User.email,
    dateOfBirth: new Date(learner.User.dateofbirth).toLocaleDateString(),
    role: learner.User.Roles[0].rolename
  }));

  return (
    <Box m="20px">
      <Header title="Danh sách học viên" subtitle="Quản lý học viên" />
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
              display:'none',
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

export default Learner;
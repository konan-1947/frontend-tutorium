import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import getTutorList from '../../../../hooks/admin/getTutorList'; // Hàm lấy dữ liệu giảng viên
import { useDeleteTutor } from '../../../../hooks/admin/deleteTutor'; // Hook để xóa giảng viên
import Header from "../Header";
import { useNavigate } from 'react-router-dom'; // Hook để điều hướng

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
    },
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
            onClick={() => navigate(`/admin/updateTutor/${params.row.id}`, { state: tutorData })}
          >
            Sửa
          </Button>
        );
      }
    },
    {
      field: "delete", 
      headerName: "Xóa", 
      flex: 0.5, 
      renderCell: (params) => {
        const tutorId = params.row.id;
        const { mutate: deleteTutor } = useDeleteTutor();
        return (
          <Button 
            variant="contained"
            color="error"
            onClick={() => {
              deleteTutor(tutorId);
              window.location.reload();
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
      <Header title="Gia sư" subtitle="" />
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
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;


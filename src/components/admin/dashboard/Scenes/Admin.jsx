import React, { useEffect, useState } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import getAdminList from '../../../../hooks/admin/getAdminList'; // Hook lấy danh sách admin
import useDeleteAdmin from '../../../../hooks/admin/deleteAdmin'; // Hook xóa admin (đổi tên thành useDeleteAdmin để rõ ràng hơn)
import { useNavigate } from "react-router-dom"; // Import useNavigate để chuyển hướng
import Header from "../Header";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Team = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Để chuyển hướng

  // Sử dụng hook useDeleteAdmin
  const { mutate: deleteAdminMutation, isPending: isDeleting, isError: deleteError } = useDeleteAdmin();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Tên", flex: 1, cellClassName: "name-column--cell" },
    { field: "username", headerName: "Tên đăng nhập", flex: 1 },
    { field: "role", headerName: "Vai trò", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "dateOfBirth", headerName: "Ngày sinh", flex: 1 },
    {
      field: "edit",
      headerName: "Sửa",
      flex: 1,
      renderCell: (params) => {
        const adminData = {
          adminId: params.row.id, // Truyền ID admin
          displayname: params.row.name,
          username: params.row.username,
          address: params.row.address,
          email: params.row.email,
          dateofbirth: params.row.dateOfBirth,
        };
        return (
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate(`/admin/updateAdmin/${params.row.id}`, { state: adminData })} // Chuyển hướng và truyền dữ liệu admin
          >
            Sửa
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Dừng hoạt động",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(row.id)}
          disabled={isDeleting} // Vô hiệu hóa nút khi đang xóa
        >
          {isDeleting ? "Đang xóa..." : "Dừng"}
        </Button>
      ),
    },
  ];

  // Hook để lấy danh sách admin
  const fetchData = async () => {
    try {
      const data = await getAdminList();
      console.log("Fetched admin data:", JSON.stringify(data));
      setAdminData(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu admin: ", error);
      setError("Có lỗi xảy ra khi lấy dữ liệu admin.");
      setLoading(false);
    }
  };

  // Xử lý khi nhấn nút Xóa
  const handleDelete = (adminId) => {
    if (window.confirm("Bạn có chắc chắn muốn dừng admin này?")) {
      deleteAdminMutation(adminId, {
        onSuccess: () => {
          alert("Dừng admin thành công!");
          // Refresh lại trang
          window.location.reload();
        },
        onError: (error) => {
          console.error("Lỗi khi xóa admin:", error);
          alert("Xóa admin thất bại, vui lòng thử lại!");
        },
      });
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
  const rows = adminData?.data?.map((admin, index) => ({
    id: admin.userid || index + 1, // Nếu không có userid, dùng index làm ID
    name: admin.displayname,
    username: admin.username,
    role: admin.role || "Admin", // Mặc định là "Admin" nếu không có role
    address: admin.address,
    email: admin.email,
    dateOfBirth: new Date(admin.dateofbirth).toLocaleDateString("vi-VN"),
  }));

  return (
    <Box m="20px">
      <Header title="ADMIN LIST" subtitle="Managing the Admins" />
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
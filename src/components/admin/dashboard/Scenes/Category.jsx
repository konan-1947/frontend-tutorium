import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../data/theme";
import getCategoryList from '../../../../hooks/admin/getCategoryList'; // Hàm lấy dữ liệu category
import { useDeleteCategory } from '../../../../hooks/admin/deleteCategory'; // Import hook deleteMutation
import Header from "../Header";
const Category = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Hook để gọi deleteCategory
  const { mutate: deleteCategoryMutation, isLoading: deleting } = useDeleteCategory({
   
  });

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Tên", flex: 1, cellClassName: "name-column--cell" },
    { field: "specialization", headerName: "Mô tả", flex: 1 },
    {
      field: "delete",
      headerName: "Xoá",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            color="error"
            variant="contained"
            onClick={() => deleteCategoryMutation(params.row.id)} // Gọi deleteMutation với category ID
            disabled={deleting}
          >
            {deleting ? "Đang xoá..." : "Xoá"}
          </Button>
        );
      }
    },
  ];

  // Hàm để lấy dữ liệu trước khi render
  const fetchData = async () => {
    try {
      const data = await getCategoryList(); // Gọi API lấy danh sách category
      setCategoryData(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu category: ", error);
      setError("Có lỗi xảy ra khi lấy dữ liệu category.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Lấy dữ liệu khi trang được render lần đầu
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Chuyển đổi dữ liệu từ API thành định dạng mà DataGrid cần
  const rows = categoryData?.data?.map(category => ({
    id: category.categoryid,
    name: category.categoryname,
    specialization: category.description, // Mô tả
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

export default Category;

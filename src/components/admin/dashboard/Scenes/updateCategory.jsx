import { Box, Button, TextField, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import { useUpdateCategory } from "../../../../hooks/admin/updateCategory";

const UpdateCategoryForm = () => {
  const location = useLocation();
  const { categoryId, categoryname, description } = location.state || {};

  const updateMutation = useUpdateCategory();

  const [name, setCategoryname] = useState(categoryname || "");
  const [desc, setDescription] = useState(description || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  // Debug: check initial values
  useEffect(() => {
    console.log("Initial category data:", {
      categoryId,
      categoryname,
      description,
    });
  }, [categoryId, categoryname, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted");
    console.log("Current values:", { name, desc });

    if (!name || !desc) {
      setError("Both category name and description are required.");
      console.warn("Validation failed: missing name or description");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Sending update request with data:", {
        categoryid: categoryId,
        categoryname: name,
        description: desc,
      });

      const result = await updateMutation.mutateAsync({
        categoryid: categoryId,
        categoryname: name,
        description: desc,
      });

      console.log("Update success:", result);

      setAlertMessage("Category updated successfully!");
      setAlertType("success");
    } catch (err) {
      console.error("Update failed:", err);
      setAlertMessage("Failed to update category.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="UPDATE CATEGORY" subtitle="Update Category Details" />

      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <p><strong>ID:</strong> {categoryId}</p>
          <p><strong>Current Name:</strong> {categoryname || "Loading..."}</p>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên thể loại"
            name="categoryname"
            value={name}
            onChange={(e) => {
              console.log("Name changed:", e.target.value);
              setCategoryname(e.target.value);
            }}
            error={Boolean(error && !name)}
            helperText={error && !name ? "Tên thể loại là bắt buộc" : ""}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Mô tả"
            name="description"
            value={desc}
            onChange={(e) => {
              console.log("Description changed:", e.target.value);
              setDescription(e.target.value);
            }}
            error={Boolean(error && !desc)}
            helperText={error && !desc ? "Mô tả là bắt buộc" : ""}
          />
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          {error && <p className="text-danger">{error}</p>}
          {alertMessage && (
            <Alert severity={alertType} sx={{ width: "100%", mb: 2 }}>
              {alertMessage}
            </Alert>
          )}
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật thể loại"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateCategoryForm;

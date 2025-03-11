import { Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed state data
import Header from "../Header";
import { useUpdateCategory } from "../../../../hooks/admin/updateCategory";  // Assuming the hook is for updating

const UpdateCategoryForm = () => {
  const location = useLocation(); // Get the location object
  const { categoryId, categoryname, description } = location.state || {}; // Retrieve category data from state

  const updateMutation = useUpdateCategory();

  const [name, setCategoryname] = useState(categoryname || ""); // Set initial value from state
  const [desc, setDescription] = useState(description || ""); // Set initial value from state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  // Check if categoryId is passed correctly
  console.log("Category ID:", categoryId); // Debugging line

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!name || !desc) {
      setError("Both category name and description are required.");
      return;
    }
    
    setLoading(true);
    setError(null);

    // Call update category API
    try {
      console.log("Sending data:", { categoryId, categoryname: name, description: desc }); // Debugging line
      await updateMutation.mutateAsync({
        categoryid: categoryId,
        categoryname: name,
        description: desc,
      });

      setAlertMessage("Category updated successfully!");
      setAlertType("success");
    } catch (err) {
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
          <p><strong>ID:</strong> {categoryId}</p> {/* Display categoryId */}
          <p><strong>Current Name:</strong> {categoryname || "Loading..."}</p>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên thể loại"
            name="categoryname"
            value={name}
            onChange={(e) => setCategoryname(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
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

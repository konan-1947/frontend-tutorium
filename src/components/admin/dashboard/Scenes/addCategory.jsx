import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import { useAddCategory } from "../../../../hooks/admin/addCategory";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const addMutation = useAddCategory();

  const [categoryname, setCategoryname] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra đầu vào
    if (!categoryname || !description) {
      setError("Cả tên thể loại và mô tả đều là bắt buộc.");
      return;
    }
    
    setLoading(true);
    setError(null);

    // Gửi yêu cầu POST lên API
    try {
      addMutation.mutate({
        categoryname,
        description,
      });
    } catch (err) {
      setError("Có lỗi xảy ra khi tạo thể loại.");
    } finally {
      setLoading(false);
    
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE CATEGORY" subtitle="Create a New Category" />
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên thể loại"
            name="categoryname"
            value={categoryname}
            onChange={(e) => setCategoryname(e.target.value)}
            error={Boolean(error && !categoryname)}
            helperText={error && !categoryname ? "Tên thể loại là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Mô tả"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={Boolean(error && !description)}
            helperText={error && !description ? "Mô tả là bắt buộc" : ""}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          {error && <p className="text-danger">{error}</p>}
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo thể loại"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;

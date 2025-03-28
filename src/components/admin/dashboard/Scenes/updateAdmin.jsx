import { Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed state data
import Header from "../Header";
import { useUpdateAdmin } from "../../../../hooks/admin/updateAdmin"; // Hook để cập nhật admin

const UpdateAdminForm = () => {
  const location = useLocation(); // Lấy dữ liệu từ state
  const { adminId, displayname, username, address, email, dateofbirth } = location.state || {}; // Lấy dữ liệu admin từ state

  // Sử dụng hook useUpdateAdmin
  const updateMutation = useUpdateAdmin();

  // State để quản lý form
  const [name, setName] = useState(displayname || "");
  const [userName, setUserName] = useState(username || "");
  const [adminAddress, setAddress] = useState(address || "");
  const [adminEmail, setEmail] = useState(email || "");
  const [dob, setDob] = useState(dateofbirth ? new Date(dateofbirth).toISOString().split("T")[0] : ""); // Chuyển đổi ngày sinh thành định dạng YYYY-MM-DD
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  // Kiểm tra dữ liệu đầu vào và gửi yêu cầu cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name || !userName || !adminAddress || !adminEmail || !dob) {
      setError("All fields are required.");
      return;
    }

    setError(null);

    // Định dạng dữ liệu theo yêu cầu của hook
    const formdata = {
      displayname: name,
   
      address: adminAddress,

      dateofbirth: dob,
    };

    // Gửi dữ liệu cập nhật
    try {
      console.log("Sending data:", { userId: adminId, formdata });
      await updateMutation.mutateAsync({    
        userId: adminId, // ID của admin
        formdata, // Dữ liệu cần cập nhật
      });
      setAlertMessage("Admin updated successfully!");
      setAlertType("success");
    } catch (err) {
      setAlertMessage("Failed to update admin: " + err.message);
      setAlertType("error");
    }
  };

  return (
    <Box m="20px">
      <Header title="UPDATE ADMIN" subtitle="Update Admin Details" />

      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <p><strong>ID:</strong> {adminId || "N/A"}</p> {/* Hiển thị ID admin */}
          <p><strong>Current Name:</strong> {displayname || "Loading..."}</p>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên admin"
            name="displayname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(error && !name)}
            helperText={error && !name ? "Tên admin là bắt buộc" : ""}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên đăng nhập"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={Boolean(error && !userName)}
            helperText={error && !userName ? "Tên đăng nhập là bắt buộc" : ""}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Địa chỉ"
            name="address"
            value={adminAddress}
            onChange={(e) => setAddress(e.target.value)}
            error={Boolean(error && !adminAddress)}
            helperText={error && !adminAddress ? "Địa chỉ là bắt buộc" : ""}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="email"
            value={adminEmail}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error && !adminEmail)}
            helperText={error && !adminEmail ? "Email là bắt buộc" : ""}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Ngày sinh"
            name="dateofbirth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            error={Boolean(error && !dob)}
            helperText={error && !dob ? "Ngày sinh là bắt buộc" : ""}
            sx={{ gridColumn: "span 4" }}
            InputLabelProps={{ shrink: true }} // Đảm bảo label không bị đè lên giá trị ngày
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
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading ? "Đang cập nhật..." : "Cập nhật admin"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateAdminForm;
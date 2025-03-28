import { Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import { useCreateAdmin } from "../../../../hooks/admin/createAdmin"; // Hook để tạo admin

const CreateAdminForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Sử dụng hook useCreateAdmin
  const { mutate: createAdminMutation, isPending: isCreating, isError, error: createError } = useCreateAdmin();

  // State để quản lý form
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Hàm xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra đầu vào
    if (!username || !displayname || !password || !email || !dateofbirth || !address) {
      setError("Tất cả các trường đều là bắt buộc.");
      return;
    }

    setError(null);
    setSuccessMessage(null);

    // Gửi yêu cầu POST lên API
    try {
      await createAdminMutation({ username, displayname, password, email, dateofbirth, address }, {
        onSuccess: () => {
          setSuccessMessage("Tạo admin thành công!");
          // Làm mới trang sau khi tạo thành công
          setTimeout(() => {
            window.location.reload();
          }, 1000); // Chờ 1 giây để người dùng thấy thông báo
        },
        onError: (err) => {
          setError("Có lỗi xảy ra khi tạo admin: " + err.message);
        },
      });
    } catch (err) {
      setError("Có lỗi xảy ra khi tạo admin.");
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE ADMIN" subtitle="Create a New Admin" />
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
            label="Tên đăng nhập"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(error && !username)}
            helperText={error && !username ? "Tên đăng nhập là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên hiển thị"
            name="displayname"
            value={displayname}
            onChange={(e) => setDisplayname(e.target.value)}
            error={Boolean(error && !displayname)}
            helperText={error && !displayname ? "Tên hiển thị là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Mật khẩu"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(error && !password)}
            helperText={error && !password ? "Mật khẩu là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error && !email)}
            helperText={error && !email ? "Email là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Ngày sinh"
            name="dateofbirth"
            value={dateofbirth}
            onChange={(e) => setDateofbirth(e.target.value)}
            error={Boolean(error && !dateofbirth)}
            helperText={error && !dateofbirth ? "Ngày sinh là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{ shrink: true }} // Đảm bảo label không bị đè lên giá trị ngày
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Địa chỉ"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={Boolean(error && !address)}
            helperText={error && !address ? "Địa chỉ là bắt buộc" : ""}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          {error && <Alert severity="error" sx={{ width: "100%", mr: 2 }}>{error}</Alert>}
          {successMessage && <Alert severity="success" sx={{ width: "100%", mr: 2 }}>{successMessage}</Alert>}
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={isCreating}
          >
            {isCreating ? "Đang tạo..." : "Tạo admin"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateAdminForm;    
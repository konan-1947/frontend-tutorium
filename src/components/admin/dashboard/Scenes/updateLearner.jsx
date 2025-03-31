import { Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed state data
import Header from "../Header";
import { useUpdateLearner } from "../../../../hooks/admin/updateLearner"; // Assuming you have a hook for updating learner data

const UpdateLearnerForm = () => {
  const location = useLocation(); // Get the location object
  const { userid, displayname, address, email,learneringgoal, dateofbirth} = location.state || {}; // Retrieve learner data from state

  const updateMutation = useUpdateLearner();

  const [learnerName, setLearnerName] = useState(displayname || ""); // Set initial value from state
  const [learnerAddress, setLearnerAddress] = useState(address || ""); // Set initial value from state
  const [learnerEmail, setLearnerEmail] = useState(email || ""); // Set initial value from state
  const [learnerLearningGoal, setLearnerLearningGoal] = useState(learneringgoal || ""); // Set initial value from state
  const [learnerDob, setLearnerDob] = useState(dateofbirth || ""); // Set initial value from state

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!learnerName || !learnerAddress || !learnerEmail || !learnerLearningGoal || !learnerDob) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    // Call update learner API
    try {
      await updateMutation.mutateAsync({
        userid: userid,
        displayname: learnerName,
        address: learnerAddress,
        email: learnerEmail,
        learninggoal: learnerLearningGoal,
        dateofbirth: learnerDob,
      });

      setAlertMessage("Learner updated successfully!");
      setAlertType("success");
    } catch (err) {
      setAlertMessage("Failed to update learner.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="Cập nhật người dùng" subtitle="" />

      <form onSubmit={handleSubmit}>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
   
          {/* Name */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên học viên"
            name="learnerName"
            value={learnerName}
            onChange={(e) => setLearnerName(e.target.value)}
            error={Boolean(error && !learnerName)}
            helperText={error && !learnerName ? "Tên học viên là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Address */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Địa chỉ"
            name="learnerAddress"
            value={learnerAddress}
            onChange={(e) => setLearnerAddress(e.target.value)}
            error={Boolean(error && !learnerAddress)}
            helperText={error && !learnerAddress ? "Địa chỉ là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Email */}
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="learnerEmail"
            value={learnerEmail}
            onChange={(e) => setLearnerEmail(e.target.value)}
            error={Boolean(error && !learnerEmail)}
            helperText={error && !learnerEmail ? "Email là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Learning Goal */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Mục tiêu học tập"
            name="learnerLearningGoal"
            value={learnerLearningGoal}
            onChange={(e) => setLearnerLearningGoal(e.target.value)}
            error={Boolean(error && !learnerLearningGoal)}
            helperText={error && !learnerLearningGoal ? "Mục tiêu học tập là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Date of Birth */}
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Ngày sinh"
            name="learnerDob"
            value={learnerDob}
            onChange={(e) => setLearnerDob(e.target.value)}
            error={Boolean(error && !learnerDob)}
            helperText={error && !learnerDob ? "Ngày sinh là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          {error && <p className="text-danger">{error}</p>}
          {alertMessage && (
            <Alert severity={alertType} sx={{ width: "100%", mb: 2 }}>
              {alertMessage}
            </Alert>
          )}
          <Button type="submit" color="secondary" variant="contained" disabled={loading}>
            {loading ? "Đang cập nhật..." : "Cập nhật học viên"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateLearnerForm;

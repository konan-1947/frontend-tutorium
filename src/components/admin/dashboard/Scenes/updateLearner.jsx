import { Box, Button, TextField, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import { useUpdateLearner } from "../../../../hooks/admin/updateLearner";

const UpdateLearnerForm = () => {
  const location = useLocation();
  const { userid, displayname, address, email, learneringgoal, dateofbirth } = location.state || {};

  const updateMutation = useUpdateLearner();

  const [learnerName, setLearnerName] = useState(displayname || "");
  const [learnerAddress, setLearnerAddress] = useState(address || "");
  const [learnerEmail, setLearnerEmail] = useState(email || "");
  const [learnerLearningGoal, setLearnerLearningGoal] = useState(learneringgoal || "");
  const [learnerDob, setLearnerDob] = useState(dateofbirth || "");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  // Log initial values
  useEffect(() => {
    console.log("Initial learner data from state:", {
      userid,
      displayname,
      address,
      email,
      learneringgoal,
      dateofbirth,
    });
  }, [userid, displayname, address, email, learneringgoal, dateofbirth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submission triggered");
    console.log("Current form values:", {
      learnerName,
      learnerAddress,
      learnerEmail,
      learnerLearningGoal,
      learnerDob,
    });

    if (!learnerName || !learnerAddress || !learnerEmail || !learnerLearningGoal || !learnerDob) {
      setError("All fields are required.");
      console.warn("Form validation failed: missing fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        userid: userid,
        displayname: learnerName,
        address: learnerAddress,
        email: learnerEmail,
        learninggoal: learnerLearningGoal,
        dateofbirth: learnerDob,
      };

      console.log("Sending update request with data:", payload);

      const result = await updateMutation.mutateAsync(payload);

      console.log("Update success response:", result);

      setAlertMessage("Learner updated successfully!");
      setAlertType("success");
    } catch (err) {
      console.error("Update failed:", err);
      setAlertMessage("Failed to update learner.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="UPDATE LEARNER" subtitle="Update Learner Details" />

      <form onSubmit={handleSubmit}>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
          <p><strong>ID:</strong> {userid}</p>
          <p><strong>Current Name:</strong> {learnerName || "Loading..."}</p>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tên học viên"
            name="learnerName"
            value={learnerName}
            onChange={(e) => {
              console.log("learnerName changed:", e.target.value);
              setLearnerName(e.target.value);
            }}
            error={Boolean(error && !learnerName)}
            helperText={error && !learnerName ? "Tên học viên là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Địa chỉ"
            name="learnerAddress"
            value={learnerAddress}
            onChange={(e) => {
              console.log("learnerAddress changed:", e.target.value);
              setLearnerAddress(e.target.value);
            }}
            error={Boolean(error && !learnerAddress)}
            helperText={error && !learnerAddress ? "Địa chỉ là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="learnerEmail"
            value={learnerEmail}
            onChange={(e) => {
              console.log("learnerEmail changed:", e.target.value);
              setLearnerEmail(e.target.value);
            }}
            error={Boolean(error && !learnerEmail)}
            helperText={error && !learnerEmail ? "Email là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Mục tiêu học tập"
            name="learnerLearningGoal"
            value={learnerLearningGoal}
            onChange={(e) => {
              console.log("learnerLearningGoal changed:", e.target.value);
              setLearnerLearningGoal(e.target.value);
            }}
            error={Boolean(error && !learnerLearningGoal)}
            helperText={error && !learnerLearningGoal ? "Mục tiêu học tập là bắt buộc" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Ngày sinh"
            name="learnerDob"
            value={learnerDob}
            onChange={(e) => {
              console.log("learnerDob changed:", e.target.value);
              setLearnerDob(e.target.value);
            }}
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

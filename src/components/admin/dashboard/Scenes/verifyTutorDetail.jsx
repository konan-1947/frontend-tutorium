import { Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import { useUpdateLearner } from "../../../../hooks/admin/updateLearner";

const VerifyTutorDetail = () => {
  const location = useLocation();
  const { userid, displayname, address, email, learneringgoal, dateofbirth } = location.state || {};

  console.log("Dữ liệu truyền qua từ state:", location.state); // Log dữ liệu nhận được

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Giá trị form trước khi gửi:", {
      userid,
      learnerName,
      learnerAddress,
      learnerEmail,
      learnerLearningGoal,
      learnerDob,
    });

    if (!learnerName || !learnerAddress || !learnerEmail || !learnerLearningGoal || !learnerDob) {
      setError("All fields are required.");
      console.warn("Lỗi: Thiếu trường bắt buộc");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateMutation.mutateAsync({
        userid: userid,
        displayname: learnerName,
        address: learnerAddress,
        email: learnerEmail,
        learninggoal: learnerLearningGoal,
        dateofbirth: learnerDob,
      });

      console.log("Cập nhật thành công!");
      setAlertMessage("Learner updated successfully!");
      setAlertType("success");
    } catch (err) {
      console.error("Lỗi khi cập nhật learner:", err);
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
          <p><strong>Name:</strong> {learnerName}</p>
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          {error && <p className="text-danger">{error}</p>}
          {alertMessage && (
            <Alert severity={alertType} sx={{ width: "100%", mb: 2 }}>
              {alertMessage}
            </Alert>
          )}
          <Button sx={{ margin: "20px" }} type="submit" color="secondary" variant="contained" disabled={loading}>
            {loading ? "Đang xác minh" : "xác minh "}
          </Button>
          <Button sx={{ margin: "20px" }} type="button" color="secondary" variant="contained" disabled={loading}>
            Huỷ
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default VerifyTutorDetail;

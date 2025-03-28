import { Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed state data
import Header from "../Header";
import { useUpdateLearner } from "../../../../hooks/admin/updateLearner"; // Assuming you have a hook for updating learner data

const VerifyTutorDetail = () => {
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
      <Header title="UPDATE LEARNER" subtitle="Update Learner Details" />

      <form onSubmit={handleSubmit}>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
          <p><strong>ID:</strong> {userid}</p> {/* Display learnerId */}
          <p><strong>Name:</strong> {learnerName}</p> 

          {/* Name */}
     
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          {error && <p className="text-danger">{error}</p>}
          {alertMessage && (
            <Alert severity={alertType} sx={{ width: "100%", mb: 2 }}>
              {alertMessage}
            </Alert>
          )}
          <Button sx={{ margin: "20px"  }} type="submit" color="secondary" variant="contained" disabled={loading}
            onClick={() => window.location.reload()}
          >
            {loading ? "Đang xác minh" : "xác minh "}
          </Button>
          <Button sx={{ margin: "20px" }} type="submit" color="secondary" variant="contained" disabled={loading}>
            {loading ? "Đang xác minh" : "Huỷ"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default VerifyTutorDetail;

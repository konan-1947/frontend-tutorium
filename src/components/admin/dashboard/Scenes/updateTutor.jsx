import { Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import { useUpdateTutor } from "../../../../hooks/admin/updateTutor";

const UpdateTutorForm = () => {
  const location = useLocation();
  console.log("Location State:", location.state); // Log dữ liệu nhận từ state

  const { userid, username, displayname, address, email, dateofbirth, description, descriptionvideolink, expectedsalary } = location.state || {};
  const updateMutation = useUpdateTutor();

  const [tutorUsername, setTutorUsername] = useState(username || "");
  const [tutorName, setTutorName] = useState(displayname || "");
  const [tutorAddress, setTutorAddress] = useState(address || "");
  const [tutorEmail, setTutorEmail] = useState(email || "");
  const [tutorDob, setTutorDob] = useState(dateofbirth || "");
  const [tutorDescription, setTutorDescription] = useState(description || "");
  const [tutorDescriptionVideoLink, setTutorDescriptionVideoLink] = useState(descriptionvideolink || "");
  const [tutorExpectedSalary, setTutorExpectedSalary] = useState(expectedsalary || "");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", {
      userid, tutorUsername, tutorName, tutorEmail, tutorDob, tutorAddress,
      tutorDescription, tutorDescriptionVideoLink, tutorExpectedSalary
    });

    setLoading(true);
    setError(null);

    try {
      console.log("Calling update API...");
      await updateMutation.mutateAsync({
        userid,
        username: tutorUsername,
        imgurl: "",
        displayname: tutorName,
        address: tutorAddress,
        email: tutorEmail,
        dateofbirth: tutorDob,
        description: tutorDescription,
        descriptionvideolink: tutorDescriptionVideoLink,
        expectedsalary: tutorExpectedSalary,
        contracts: []
      });
      console.log("Tutor updated successfully!");
      setAlertMessage("Tutor updated successfully!");
      setAlertType("success");
    } catch (err) {
      console.error("Error updating tutor:", err);
      setAlertMessage("Failed to update tutor.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="UPDATE TUTOR" subtitle="Update Tutor Details" />

      <form onSubmit={handleSubmit}>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
          <p><strong>ID:</strong> {userid}</p>
          <p><strong>Current Name:</strong> {tutorName || "Loading..."}</p>

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Username"
            value={tutorUsername}
            onChange={(e) => {
              setTutorUsername(e.target.value);
              console.log("Updated tutorUsername:", e.target.value);
            }}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tutor Name"
            value={tutorName}
            onChange={(e) => {
              setTutorName(e.target.value);
              console.log("Updated tutorName:", e.target.value);
            }}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            value={tutorAddress}
            onChange={(e) => {
              setTutorAddress(e.target.value);
              console.log("Updated tutorAddress:", e.target.value);
            }}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            value={tutorEmail}
            onChange={(e) => {
              setTutorEmail(e.target.value);
              console.log("Updated tutorEmail:", e.target.value);
            }}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date of Birth"
            value={tutorDob}
            onChange={(e) => {
              setTutorDob(e.target.value);
              console.log("Updated tutorDob:", e.target.value);
            }}
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            value={tutorDescription}
            onChange={(e) => {
              setTutorDescription(e.target.value);
              console.log("Updated tutorDescription:", e.target.value);
            }}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="url"
            label="Description Video Link"
            value={tutorDescriptionVideoLink}
            onChange={(e) => {
              setTutorDescriptionVideoLink(e.target.value);
              console.log("Updated tutorDescriptionVideoLink:", e.target.value);
            }}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Expected Salary"
            value={tutorExpectedSalary}
            onChange={(e) => {
              setTutorExpectedSalary(e.target.value);
              console.log("Updated tutorExpectedSalary:", e.target.value);
            }}
            sx={{ gridColumn: "span 2" }}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} disabled={loading}>
          {loading ? "Updating..." : "Update Tutor"}
        </Button>
      </form>

      {alertMessage && (
        <Alert severity={alertType} sx={{ mt: 2 }}>
          {alertMessage}
        </Alert>
      )}
    </Box>
  );
};

export default UpdateTutorForm;

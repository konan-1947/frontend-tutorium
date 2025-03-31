import { Box, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed state data
import Header from "../Header";
import { useUpdateTutor } from "../../../../hooks/admin/updateTutor"; // Assuming you have a hook for updating tutor data

const UpdateTutorForm = () => {
  const location = useLocation(); // Get the location object
  const { userid, username, displayname, address, email, dateofbirth, description, descriptionvideolink, expectedsalary } = location.state || {}; // Retrieve tutor data from state
  const updateMutation = useUpdateTutor();
  const [tutorUsername, setTutorUsername] = useState(username || ""); // Set initial value from state
  const [tutorName, setTutorName] = useState(displayname || ""); // Set initial value from state
  const [tutorAddress, setTutorAddress] = useState(address || ""); // Set initial value from state
  const [tutorEmail, setTutorEmail] = useState(email || ""); // Set initial value from state
  const [tutorDob, setTutorDob] = useState(dateofbirth || ""); // Set initial value from state
  const [tutorDescription, setTutorDescription] = useState(description || ""); // Set initial value from state
  const [tutorDescriptionVideoLink, setTutorDescriptionVideoLink] = useState(descriptionvideolink || ""); // Set initial value from state
  const [tutorExpectedSalary, setTutorExpectedSalary] = useState(expectedsalary || ""); // Set initial value from state

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("Sending data:", {
      userid, tutorUsername, tutorName, tutorEmail, tutorDob, tutorAddress,
      tutorDescription, tutorDescriptionVideoLink, tutorExpectedSalary
    });
    e.preventDefault();

    // Validate input
    setLoading(true);
    setError(null);

    // Call update tutor API
    try {
      await updateMutation.mutateAsync({
        userid,
        username: tutorUsername,
        imgurl: "", // Removed image field
        displayname: tutorName,
        address: tutorAddress,
        email: tutorEmail,
        dateofbirth: tutorDob,
        description: tutorDescription,
        descriptionvideolink: tutorDescriptionVideoLink,
        expectedsalary: tutorExpectedSalary,
        contracts: [] // Removed contracts
      });

      setAlertMessage("Tutor updated successfully!");
      setAlertType("success");
    } catch (err) {
      setAlertMessage("Failed to update tutor.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="Cập nhật gia sư" subtitle="" />

      <form onSubmit={handleSubmit}>
        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
      
          {/* Username */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Username"
            name="tutorUsername"
            value={tutorUsername}
            onChange={(e) => setTutorUsername(e.target.value)}
            error={Boolean(error && !tutorUsername)}
            helperText={error && !tutorUsername ? "Username is required" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Name */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Tutor Name"
            name="tutorName"
            value={tutorName}
            onChange={(e) => setTutorName(e.target.value)}
            error={Boolean(error && !tutorName)}
            helperText={error && !tutorName ? "Tutor name is required" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Address */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            name="tutorAddress"
            value={tutorAddress}
            onChange={(e) => setTutorAddress(e.target.value)}
            error={Boolean(error && !tutorAddress)}
            helperText={error && !tutorAddress ? "Address is required" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Email */}
          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            name="tutorEmail"
            value={tutorEmail}
            onChange={(e) => setTutorEmail(e.target.value)}
            error={Boolean(error && !tutorEmail)}
            helperText={error && !tutorEmail ? "Email is required" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Date of Birth */}
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date of Birth"
            name="tutorDob"
            value={tutorDob}
            onChange={(e) => setTutorDob(e.target.value)}
            error={Boolean(error && !tutorDob)}
            helperText={error && !tutorDob ? "Date of birth is required" : ""}
            sx={{ gridColumn: "span 2" }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Description */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            name="tutorDescription"
            value={tutorDescription}
            onChange={(e) => setTutorDescription(e.target.value)}
            error={Boolean(error && !tutorDescription)}
            helperText={error && !tutorDescription ? "Description is required" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Description Video Link */}
          <TextField
            fullWidth
            variant="filled"
            type="url"
            label="Description Video Link"
            name="tutorDescriptionVideoLink"
            value={tutorDescriptionVideoLink}
            onChange={(e) => setTutorDescriptionVideoLink(e.target.value)}
            error={Boolean(error && !tutorDescriptionVideoLink)}
            helperText={error && !tutorDescriptionVideoLink ? "Description video link is required" : ""}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Expected Salary */}
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Expected Salary"
            name="tutorExpectedSalary"
            value={tutorExpectedSalary}
            onChange={(e) => setTutorExpectedSalary(e.target.value)}
            error={Boolean(error && !tutorExpectedSalary)}
            helperText={error && !tutorExpectedSalary ? "Expected salary is required" : ""}
            sx={{ gridColumn: "span 2" }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={loading}
        >
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

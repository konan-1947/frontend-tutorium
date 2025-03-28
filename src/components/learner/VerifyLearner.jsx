import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import Turnstile from "react-turnstile";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/img/imgchoosecustominfo.jpg";
import { useVerifyLearner } from "../../hooks/learner/verifyLearner";
const SITE_KEY = "0x4AAAAAABBM7Xkmnn5KDQQM"; // Thay bằng Site Key của cậu

const VerifyLearner = () => {
  const navigate = useNavigate();
  const { mutate: verifyLearner, isLoading } = useVerifyLearner();
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleVerify = async () => {
    if (!captchaToken) {
      alert("Vui lòng xác nhận CAPTCHA trước!");
      return;
    }

    try {
      await verifyLearner(); // Gửi token lên server để xác minh
      console.log('adddd');
      navigate("/learner/choosecustominfo");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 5,
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 4,
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <VerifiedUserIcon
                sx={{
                  fontSize: 100,
                  color: "primary.main",
                  mb: 3,
                }}
              />
            </motion.div>

            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                backgroundClip: "text",
                textFillColor: "transparent",
                mb: 4,
              }}
            >
              Xác Minh Tài Khoản
            </Typography>

            <Typography variant="h6" sx={{ mb: 4, color: "text.secondary" }}>
              Để bắt đầu tìm kiếm gia sư phù hợp, vui lòng xác minh tài khoản của bạn
            </Typography>

            {/* Turnstile CAPTCHA */}
            <Turnstile
              sitekey={SITE_KEY}
              onVerify={(token) => setCaptchaToken(token)}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleVerify}
                disabled={isLoading}
                sx={{
                  py: 2,
                  px: 6,
                  fontSize: "1.2rem",
                  borderRadius: 3,
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
                  },
                  mt: 3,
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Xác Minh Ngay"}
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default VerifyLearner;

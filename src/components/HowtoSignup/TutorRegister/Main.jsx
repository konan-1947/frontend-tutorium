import React, { useState, useEffect } from "react";
import "../../../assets/css/main.css";
import "../../../assets/css/StepAbout.css";
import "../../../assets/css/ProcessBar.css";
import ProgressBar from "./Processbar";
import StepAbout from "./StepAbout";
import StepPhoto from "./StepPhoto";
import StepCertification from "./StepCertification";

import StepDescription from "./StepDescription";
import StepVideo from "./StepVideo";
import StepAvailability from "./StepAvailability";
import StepPricing from "./StepPricing";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate,useLocation } from "react-router-dom";

const TutorRegister = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Bạn có chắc chắn muốn rời khỏi trang? Dữ liệu chưa lưu sẽ bị mất!";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Chặn người dùng rời khỏi trang khi bấm nút quay lại hoặc chuyển route
  useEffect(() => {
    const handleRouteChange = (event) => {
      const confirmLeave = window.confirm("Bạn có chắc chắn muốn rời khỏi trang? Dữ liệu chưa lưu sẽ bị mất!");
      if (!confirmLeave) {
        event.preventDefault();
        navigate(location.pathname, { replace: true });
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [navigate, location.pathname]);  const nextStep = () => {
    if (step < 7) {
      setStep(step + 1);
      setIsFormDirty(true);
      localStorage.setItem("savedStep", step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setIsFormDirty(true);
      localStorage.setItem("savedStep", step - 1);
    }
  };

  return (
    <div className="body-container">
      <Container fluid className="tutor-register-container">
      <ProgressBar step={step} setStep={setStep} /> {/* Truyền setStep vào */}
        <Row>
 
          {/* Cột phải: Nội dung từng bước */}
          <Col className="step-column">
            {step === 1 && <StepAbout nextStep={nextStep} />}
            {step === 2 && <StepPhoto nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <StepCertification nextStep={nextStep} prevStep={prevStep} />}
            {step === 4 && <StepDescription nextStep={nextStep} prevStep={prevStep} />}
            {step === 5 && <StepVideo nextStep={nextStep} prevStep={prevStep} />}
            {step === 6 && <StepAvailability nextStep={nextStep} prevStep={prevStep} />}
            {step === 7 && <StepPricing prevStep={prevStep} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default TutorRegister;
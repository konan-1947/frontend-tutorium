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
import { useNavigate, useLocation } from "react-router-dom";

const TutorRegister = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Component mounted. Current step:", step);

    const handleBeforeUnload = (event) => {
      const confirmationMessage = "Bạn có chắc chắn muốn rời khỏi trang? Dữ liệu chưa lưu sẽ bị mất!";
      event.returnValue = confirmationMessage;
      console.log("beforeunload triggered");
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      console.log("Component unmounted");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = (event) => {
      console.log("Route change attempted");
      const confirmLeave = window.confirm("Bạn có chắc chắn muốn rời khỏi trang? Dữ liệu chưa lưu sẽ bị mất!");
      if (!confirmLeave) {
        event.preventDefault();
        navigate(location.pathname, { replace: true });
        console.log("Navigation prevented");
      } else {
        console.log("Navigation allowed");
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [navigate, location.pathname]);

  const nextStep = () => {
    if (step < 7) {
      console.log("Moving to next step:", step + 1);
      setStep(step + 1);
      localStorage.setItem("savedStep", step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      console.log("Moving to previous step:", step - 1);
      setStep(step - 1);
      localStorage.setItem("savedStep", step - 1);
    }
  };

  return (
    <div className="body-container">
      <Container fluid className="tutor-register-container">
        <ProgressBar step={step} setStep={(newStep) => {
          console.log("Progress bar clicked, setting step to:", newStep);
          setStep(newStep);
        }} />
        <Row>
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

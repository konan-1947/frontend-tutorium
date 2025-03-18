import React from "react";
import "../../../assets/css/main.css";
import TutorRegistrationForm from "./TutorRegistrationForm";
import { Container } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const TutorRegister = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="body-container">
        <Container fluid className="tutor-register-container">
          <TutorRegistrationForm />
        </Container>
      </div>
    </QueryClientProvider>
  );
};

export default TutorRegister;
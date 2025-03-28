// components/LoadingSpinner.js
import { Container, Spinner } from "react-bootstrap";

const LoadingSpinner = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <Spinner animation="border" variant="primary" />
  </Container>
);

export default LoadingSpinner;
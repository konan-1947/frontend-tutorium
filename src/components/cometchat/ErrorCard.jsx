// components/ErrorCard.js
import { Container, Card, Button } from "react-bootstrap";

const ErrorCard = ({ error }) => (
  <Container className="mt-5">
    <Card className="text-center p-4">
      <Card.Body>
        <Card.Title className="text-danger">Lỗi</Card.Title>
        <Card.Text>{error}</Card.Text>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Thử lại
        </Button>
      </Card.Body>
    </Card>
  </Container>
);

export default ErrorCard;
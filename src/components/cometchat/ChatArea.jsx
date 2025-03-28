// components/ChatArea.js
import { useEffect, useState, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const ChatArea = ({ selectedUser, messages, currentUser, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSendMessage(newMessage);
    if (success) setNewMessage("");
  };

  return selectedUser ? (
    <>
      <h4 className="mb-3">Trò chuyện với {selectedUser.name}</h4>
      <div
        className="flex-grow-1 overflow-auto border rounded p-3 bg-white"
        style={{ maxHeight: "calc(100vh - 150px)" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-2 ${
              msg.sender.uid === currentUser.uid ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded ${
                msg.sender.uid === currentUser.uid ? "bg-primary text-white" : "bg-light text-dark border"
              }`}
              style={{ maxWidth: "70%" }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Form onSubmit={handleSubmit} className="mt-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Nhập tin nhắn..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Gửi
          </Button>
        </InputGroup>
      </Form>
    </>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p>Chọn một người dùng để bắt đầu trò chuyện</p>
    </div>
  );
};

export default ChatArea;
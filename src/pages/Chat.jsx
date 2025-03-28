// pages/Chat.js
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserList from "../components/cometchat/UserList";
import ChatArea from "../components/cometchat/ChatArea";
import LoadingSpinner from "../components/cometchat/LoadingSpinner";
import ErrorCard from "../components/cometchat/ErrorCard";
import {
  initCometChat,
  loginCometChat,
  getUsers,
  getMessages,
  sendMessage,
  addMessageListener,
  removeMessageListener,
} from "../utils/cometChat";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Khởi tạo và đăng nhập CometChat
  useEffect(() => {
    const initializeChat = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/cometchat/token", { credentials: "include" });
        if (!response.ok) throw new Error("Lỗi lấy thông tin CometChat");
        const { appId, region, authToken } = await response.json();
        await initCometChat(appId, region);
        const user = await loginCometChat(authToken);
        setCurrentUser(user);
      } catch (err) {
        setError("Không thể đăng nhập vào CometChat. Vui lòng thử lại.");
        console.error("Lỗi khởi tạo hoặc đăng nhập:", err);
      } finally {
        setLoading(false);
      }
    };
    initializeChat();
  }, []);

  // Lấy danh sách người dùng
  useEffect(() => {
    if (currentUser) {
      const fetchUsers = async () => {
        try {
          const userList = await getUsers(10);
          setUsers(userList.filter((user) => user.uid !== currentUser.uid));
        } catch (err) {
          setError("Lỗi lấy danh sách người dùng.");
          console.error("Lỗi lấy danh sách người dùng:", err);
        }
      };
      fetchUsers();
    }
  }, [currentUser]);

  // Lấy tin nhắn khi chọn người dùng
  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const messageList = await getMessages(selectedUser.uid);
          setMessages(messageList);
        } catch (err) {
          setError("Lỗi lấy tin nhắn.");
          console.error("Lỗi lấy tin nhắn:", err);
        }
      };
      fetchMessages();

      const listenerID = `chat_${selectedUser.uid}`;
      addMessageListener(listenerID, (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => removeMessageListener(listenerID);
    }
  }, [selectedUser]);

  // Gửi tin nhắn
  const handleSendMessage = async (messageText) => {
    if (messageText.trim() && selectedUser) {
      try {
        const message = await sendMessage(selectedUser.uid, messageText);
        setMessages((prevMessages) => [...prevMessages, message]);
        return true; // Trả về true nếu gửi thành công
      } catch (err) {
        setError("Lỗi gửi tin nhắn.");
        console.error("Lỗi gửi tin nhắn:", err);
        return false;
      }
    }
    return false;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorCard error={error} />;

  return (
    <Container fluid className="p-0" style={{ height: "100vh" }}>
      <Row className="h-100 m-0">
        <Col md={4} lg={3} className="border-end p-3 bg-light">
          <UserList users={users} onSelectUser={setSelectedUser} selectedUser={selectedUser} />
        </Col>
        <Col md={8} lg={9} className="d-flex flex-column p-3">
          <ChatArea
            selectedUser={selectedUser}
            messages={messages}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
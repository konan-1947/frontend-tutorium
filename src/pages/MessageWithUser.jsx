// file: src/components/MessageWithUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate
import {
  initCometChat,
  loginCometChat,
  getMessages,
  sendMessage,
  addMessageListener,
  removeMessageListener,
} from "../utils/cometChat";
import "../assets/css/MessageWithUser.css";

const MessageWithUser = () => {
  const { username } = useParams();
  const navigate = useNavigate(); // Hook để điều hướng
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const listenerID = `chat_${username}`;

  // Khởi tạo và đăng nhập CometChat
  useEffect(() => {
    const initializeChat = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/cometchat/token", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Không thể lấy token CometChat từ server");
        }
        const { appId, region, authToken } = await response.json();

        await initCometChat(appId, region);
        const user = await loginCometChat(authToken);
        setCurrentUser(user);
      } catch (err) {
        navigate("/oops", {
          state: { error: err.message || "Lỗi không xác định khi khởi tạo CometChat" },
        });
      } finally {
        setLoading(false);
      }
    };

    initializeChat();
  }, [navigate]);

  // Lấy tin nhắn và thêm listener
  useEffect(() => {
    if (currentUser && username) {
      const fetchMessages = async () => {
        try {
          const messageList = await getMessages(username);
          setMessages(messageList);
        } catch (err) {
          navigate("/oops", {
            state: { error: "Không thể tải tin nhắn: " + err.message },
          });
        }
      };

      fetchMessages();

      addMessageListener(listenerID, (message) => {
        if (
          message.sender.uid === username ||
          message.receiverId === username
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => removeMessageListener(listenerID);
    }
  }, [currentUser, username, navigate]);

  // Gửi tin nhắn
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) {
      navigate("/oops", {
        state: { error: "Chưa đăng nhập hoặc tin nhắn trống" },
      });
      return;
    }

    try {
      const message = await sendMessage(username, newMessage);
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (err) {
      navigate("/oops", {
        state: { error: "Gửi tin nhắn thất bại: " + err.message },
      });
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="chat-container">
      <h2 className="chat-header">Nhắn tin với {username}</h2>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender.uid === currentUser.uid ? "right" : "left"}`}
          >
            <div className="message-bubble">
              <strong>{msg.sender.name}: </strong>
              {msg.data.text}
              <div className="message-time">
                {new Date(msg.sentAt * 1000).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="chat-input"
          disabled={!currentUser}
        />
        <button
          type="submit"
          className="chat-button"
          disabled={!currentUser}
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default MessageWithUser;
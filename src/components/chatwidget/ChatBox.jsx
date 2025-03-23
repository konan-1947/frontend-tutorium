import React, { useState } from "react";
import ChatInput from "./ChatInput";
import styles from "../../assets/css/chatWidget.module.css";
import supportIcon from "../../assets/img/logo.png";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(null);

  const handleNewMessage = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  return (
    <div className="offcanvas-body">
      <div className={styles.chatBox}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.supportIconWrapper}>
              <img
                src={supportIcon}
                alt="Support Icon"
                className={styles.supportIcon}
              />
            </div>
            <span>Hỗ trợ trực tuyến</span>
          </div>
          <button className={styles.closeBtn} data-bs-dismiss="offcanvas">
            ✕
          </button>
        </div>

        {/* Vùng hiển thị tin nhắn */}
        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                msg.type === "sent" ? styles.sent : styles.received
              }`}
            >
              <div className={styles.bubble}>{msg.content}</div>
            </div>
          ))}

          {/* Hiển thị tin nhắn loading nếu có */}
          {loadingMessage && (
            <div className={`${styles.message} ${styles.received}`}>
              <div className={`${styles.bubble} ${styles.loadingBubble}`}>
                <span className={styles.loadingDots}>...</span>
              </div>
            </div>
          )}
        </div>

        {/* Khu vực nhập tin nhắn */}
        <ChatInput onNewMessage={handleNewMessage} setLoadingMessage={setLoadingMessage} />
      </div>
    </div>
  );
};

export default ChatBox;

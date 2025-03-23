import React, { useState } from "react";
import styles from "../../assets/css/chatWidget.module.css";
import { sendMessage } from "../../hooks/chatwidget/chatService.js";

const ChatInput = ({ onNewMessage, setLoadingMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const formatResponse = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (/\*\*(.*?)\*\*/.test(part)) {
        return <strong key={index}>{part.replace(/\*\*/g, "")}</strong>;
      }
      return part;
    });
    return parts;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
  
    setInputValue("");
    onNewMessage({ type: "sent", content: inputValue });
    setLoadingMessage({ type: "received", content: "..." });
  
    try {
      const response = await sendMessage(inputValue);
      
      if (response && response.response) {
        setLoadingMessage(null);
        onNewMessage({ type: "received", content: formatResponse(response.response) });
      } else {
        setLoadingMessage(null);
        onNewMessage({ type: "received", content: "Lỗi: Không nhận được phản hồi hợp lệ." });
      }
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
      setLoadingMessage(null);
      onNewMessage({ type: "received", content: "Lỗi kết nối. Vui lòng thử lại!" });
    }
  };

  return (
    <div className={styles.chatInputContainer}>
      <input
        type="text"
        className={styles.chatInput}
        placeholder="Nhập tin nhắn..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className={styles.sendBtn} onClick={handleSend}>
        Gửi
      </button>
    </div>
  );
};

export default ChatInput;

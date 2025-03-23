import React from "react";
import styles from "../../assets/css/chatWidget.module.css";

const ChatButton = ({ onClick }) => {
  return (
    <button className={styles.chatButton} data-bs-toggle="offcanvas"
      data-bs-target="#chatBox" onClick={onClick}>
      💬
    </button>
  );
};

export default ChatButton;

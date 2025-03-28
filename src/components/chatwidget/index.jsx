import ChatButton from "./ChatButton";
import ChatBox from "./ChatBox";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import { useState } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="position-fixed bottom-0 end-0 me-4 mb-3">
      {/* Nút mở chat */}
      <ChatButton onClick={toggleChat} />

      {/* ChatBox hiển thị bằng Bootstrap Offcanvas */}
      <div
        className={`offcanvas offcanvas-bottom border-0 ${isOpen ? "fade-in show" : "fade-out slide-out"}`}
        tabIndex="-1"
        id="chatBox"
        style={{ backgroundColor: "transparent", transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out", boxShadow: "none" }}
        data-bs-backdrop="false"
      >
        <ChatBox onClose={toggleChat} />
      </div>

      <style>
        {`
          .slide-out {
            transform: translate(100%, 100%);
          }
          .fade-in {
            opacity: 1;
          }
          .fade-out {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default ChatWidget;

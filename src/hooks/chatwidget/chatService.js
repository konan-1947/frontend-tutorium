export const sendMessage = async (message) => {
    try {
      const response = await fetch("http://localhost:8000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });
  
      if (!response.ok) {
        throw new Error(`Server trả về lỗi ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data); // Kiểm tra dữ liệu từ API
      return data;
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
      return null;
    }
  };
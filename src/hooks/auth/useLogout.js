// file: src/hooks/useLogout.js
export const useLogout = async () => {
    try {
      const response = await fetch("/auth/logout", {
        method: "GET",
        credentials: "include", // Để gửi cookie session
      });

      if (!response.ok) {
        throw new Error("Không thể đăng xuất");
      }

      window.location.href = "/"; // Chuyển hướng sau khi đăng xuất
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };
  
export default useLogout;
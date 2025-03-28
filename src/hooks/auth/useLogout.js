import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Gửi cookies để backend xử lý session
      });

      if (!response.ok) {
        throw new Error('Đăng xuất thất bại');
      }

      const data = await response.json();
      console.log("Logout response:", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("Đăng xuất thành công:", data);
    },
    onError: (error) => {
      console.error("Lỗi khi đăng xuất:", error.message);
    },
  });
};

export default useLogout;
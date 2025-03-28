import { useMutation } from '@tanstack/react-query';


export const useDeleteAdmin = () => {
  return useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/admin/deleteAdmin/${userId}`, {
        method: 'DELETE',
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
      alert("Admin  cập nhật thành công!");
    },
    onError: (error) => {
      console.error("Lỗi khi đăng xuất:", error.message);
    },
  });
};

export default useDeleteAdmin;
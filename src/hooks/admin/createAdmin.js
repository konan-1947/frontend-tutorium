import { useMutation } from '@tanstack/react-query';

export const useCreateAdmin = () => {
  return useMutation({
    mutationFn: async ({ username, displayname, password, email, dateofbirth, address }) => {
      const response = await fetch('/api/admin/createAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Gửi cookies để backend xử lý session
        body: JSON.stringify({ username, displayname, password, email, dateofbirth, address }), // Gửi dữ liệu admin trong body
      });

      if (!response.ok) {
        throw new Error('Tạo admin thất bại');
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      console.log("Tạo admin thành công:", data);
    },
    onError: (error) => {
      console.error("Lỗi khi tạo admin:", error.message);
    },
  });
};

export default useCreateAdmin;
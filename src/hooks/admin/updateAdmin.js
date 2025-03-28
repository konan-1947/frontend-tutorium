import { useMutation } from '@tanstack/react-query';

export const useUpdateAdmin = () => { 
  return useMutation({
    mutationFn: async ({userId,formdata}) => {
      const response = await fetch(`/api/admin/updateAdmin/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Gửi cookies để backend xử lý session
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        throw new Error('');
      }

      const data = await response.json();
      console.log("Logout response:", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("", data);
      alert("Admin cập nhật thành công!");
    },
    onError: (error) => {
      console.error(":", error.message);
    },
  });
};

export default useUpdateAdmin;
import { useMutation } from '@tanstack/react-query';

export const useChangeVerifyAtTutor = () => {
  return useMutation({
    mutationFn: async ({ verifytoken }) => {
        console.log("Mã xác minh:", verifytoken);
      const response = await fetch(`/api/tutor/changeVerifyAtTutor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Gửi cookies nếu cần xác thực
        body: JSON.stringify({verifytoken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Xác minh thất bại');
      }

      return data;
    },
    onSuccess: (data) => {
      console.log("Xác minh thành công:", data);
    },
    onError: (error) => {
      console.error("Lỗi khi xác minh:", error.message);
    },
  });
};

export default useChangeVerifyAtTutor;
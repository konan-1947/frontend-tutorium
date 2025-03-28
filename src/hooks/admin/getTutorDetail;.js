import { useMutation } from '@tanstack/react-query';

export const useGetTutorDetail = () => {
  return useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/admin/getTutorDetail/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
      return data;
    },
    onSuccess: (data) => {
      console.log(":", data);
    },
    onError: (error) => {
      console.error(":", error);
    },
  });
};

export default useGetTutorDetail; 
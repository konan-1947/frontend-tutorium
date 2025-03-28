import { useMutation } from '@tanstack/react-query';

export const useGetListUnverifyTutor = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/admin/getUnverifiedList', {
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
      console.log("Categories fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
    },
  });
};

export default useGetListUnverifyTutor; 
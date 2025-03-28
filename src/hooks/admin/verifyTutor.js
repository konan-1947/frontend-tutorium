import { useMutation } from '@tanstack/react-query';
import { use } from 'react';

export const useVerifyTutor= () => {
  return useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/admin/verifyTutor/${userId}`, {
        method: 'PUT',
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

export default useVerifyTutor; 
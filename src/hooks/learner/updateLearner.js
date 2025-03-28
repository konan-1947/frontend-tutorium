import { useMutation } from '@tanstack/react-query';

export const useUpdateLearner = () => {
  return useMutation({

    mutationFn: async (userInfo) => {
   console.log(userInfo);
      const response = await fetch('/api/learner/updateProfileLearner', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
        
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
       
      return { message: data.message, data }; // Trả về cả message và toàn bộ data
    },
    onSuccess: (data) => {
      console.log('Verification successful:', data);
    },
    onError: (error) => {
      console.error('Verification error:', error);
    },
  });
};

export default useUpdateLearner; 
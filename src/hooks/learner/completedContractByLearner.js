
import { useMutation } from '@tanstack/react-query';

export const useCompletedContractByLearner = () => {
  return useMutation({

    mutationFn: async (contractId) => {
    console.log(contractId) 
      const response = await fetch(`/api/learner/completedContractByLearner/${contractId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });
    
      // Parse response trước khi kiểm tra lỗi
      const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
    
      return data;
    },
    
    onSuccess: (data) => {
      console.log('Verification successful:', data);
    },
    onError: (error) => {
      console.error('Verification error:', error);
    },
  });
};

export default useCompletedContractByLearner; 
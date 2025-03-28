import { useMutation } from '@tanstack/react-query';

export const useGetActiveContracts  = () => {
  return useMutation({

    mutationFn: async () => {
   
      const response = await fetch('/api/learner/getListActiveContract', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });
   

      const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
    
      return data.data;
    },
    onSuccess: (data) => {
      console.log('Verification successful:', data);
    },
    onError: (error) => {
      console.error('Verification error:', error);
    },
  });
};

export default useGetActiveContracts ; 
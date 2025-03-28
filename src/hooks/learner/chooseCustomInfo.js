import { useMutation } from '@tanstack/react-query';

export const useChooseCustomInfo = () => {
  return useMutation({

    mutationFn: async (formData) => {
   
      const response = await fetch('/api/learner/chooseCustomInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
   

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

export default useChooseCustomInfo; 
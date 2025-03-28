import { useMutation } from '@tanstack/react-query';

export const useCreateWorkingTime = () => {
  return useMutation({
    mutationFn: async (formdata) => {
        console.log('aaaaaaaaaaaaaa')
      const response = await fetch(`/api/tutor/createWorkingTime`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
 console.log(response)
      const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
    
      return data;
    },
    onSuccess: (data) => {
      console.log("Learner detail fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching learner detail:", error);
    },
  });
};

export default useCreateWorkingTime; 
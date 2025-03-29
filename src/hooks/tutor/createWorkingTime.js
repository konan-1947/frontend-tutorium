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
        console.log(); // In lỗi rõ ràng
        throw new Error(); // Ném lỗi ra ngoài để xử lý tiếp
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

export default useCreateWorkingTime; 
import { useMutation } from '@tanstack/react-query';

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async (username) => {
      const response = await fetch(`/api/tutor/deleteTutorProfile`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
console.log(username)
      const data = await response.json(username);
    
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

export default useDeleteAccount; 
import { useMutation } from '@tanstack/react-query';

export const useDeleteAccomplishmentTutor = () => {
  return useMutation({
    mutationFn: async (accomplishmentid) => {
      const response = await fetch(`/api/tutor/deleteAccomplishmentTutor/${accomplishmentid}`, {
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
        alert(`Xoá thành công`)
      console.log("Learner detail fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching learner detail:", error);
    },
  });
};

export default useDeleteAccomplishmentTutor; 
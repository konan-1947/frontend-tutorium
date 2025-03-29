import { useMutation } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

export const useDeleteAccomplishmentTutor = () => {

  return useMutation({
    mutationFn: async (accomplishmentId) => {
      const response = await fetch(`/api/tutor/deleteAccomplishmentTutor/${accomplishmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

const data = await response.json();

    
      if (!response.ok) {
        throw new Error(); // Ném lỗi ra ngoài để xử lý tiếp
      }
   
      return data;
 
  
    },

    onSuccess: (data) => {
        alert(`Xoá thành công`);
       window.location.reload();
      console.log("Learner detail fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching learner detail:", error);
    },
  });
};

export default useDeleteAccomplishmentTutor; 
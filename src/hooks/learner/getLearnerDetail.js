import { useMutation } from '@tanstack/react-query';

export const useGetLearnerDetail = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/learner/getLearnerDetail', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch learner detail');
      }
     
      const data = await response.json();
     
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

export default useGetLearnerDetail; 
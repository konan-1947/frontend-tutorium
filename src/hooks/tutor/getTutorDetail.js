import { useMutation } from '@tanstack/react-query';

export const useGetTutorDetail = () => {
  return useMutation({
    mutationFn: async () => {
        console.log('aaaaaaaaaaaaaa')
      const response = await fetch(`/api/tutor/getTutorDetail`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch learner detail');
      }
     
      const data = await response.json();
     console.log(data);
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

export default useGetTutorDetail; 
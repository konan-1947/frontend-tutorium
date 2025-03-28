import { useMutation } from '@tanstack/react-query';

export const useGetListAllContracts = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/learner/getAllContract`, {
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

export default useGetListAllContracts; 
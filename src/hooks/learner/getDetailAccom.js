import { useMutation } from '@tanstack/react-query';

export const useWatchDetailAccomplishment = () => {
  return useMutation({
    mutationFn: async (accomplishmentid) => {
      const response = await fetch(`/api/learner/watchDetailAccomplishment/${accomplishmentid}`, {
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

export default useWatchDetailAccomplishment; 
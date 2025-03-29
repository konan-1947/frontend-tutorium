import { useMutation } from '@tanstack/react-query';

export const usewatchListAccomplishment = () => {
  return useMutation({
    mutationFn: async (username) => {
      console.log(username)
      const response = await fetch(`/api/learner/watchListAccomplishment/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('');
      }
     
      const data = await response.json();
     console.log(data);
      return data;
 
  
    },
    onSuccess: (data) => {
      console.log("", data);
    },
    onError: (error) => {
      console.error(":", error);
    },
  });
};

export default usewatchListAccomplishment; 
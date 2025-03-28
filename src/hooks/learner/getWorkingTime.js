import { useMutation } from '@tanstack/react-query';

export const useGetWorkingTime = () => {
  return useMutation({
    mutationFn: async (username) => {
      const response = await fetch(`/api/learner/getTutorWorkingTimes/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });


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

export default useGetWorkingTime; 
import { useMutation } from '@tanstack/react-query';

export const usegetTutorWorkingTimes = () => {
  return useMutation({
    mutationFn: async () => {
 
      const response = await fetch(`/api/tutor/getTutorWorkingTimes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Lỗi:", data.message);
        throw new Error(data.message);
      }

      return data;
 
  
    },
    onSuccess: (data) => {
      console.log(":", data);
    },
    onError: (error) => {
      console.error("", error);
    },
  });
};

export default usegetTutorWorkingTimes; 
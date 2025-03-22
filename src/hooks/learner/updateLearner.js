import { useMutation } from '@tanstack/react-query';

export const useUpdateLearner = () => {
  return useMutation({

    mutationFn: async (userInfo) => {
   console.log(userInfo);
      const response = await fetch('/api/learner/chooseCustomInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
   

      if (!response.ok) {
        throw new Error('Verification failed111');
      }
      console.log("aa");
      return response.json();
    },
    onSuccess: (data) => {
      console.log('Verification successful:', data);
    },
    onError: (error) => {
      console.error('Verification error:', error);
    },
  });
};

export default useUpdateLearner; 
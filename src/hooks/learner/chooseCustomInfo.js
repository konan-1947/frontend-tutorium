import { useMutation } from '@tanstack/react-query';

export const useChooseCustomInfo = () => {
  return useMutation({
  
    mutationFn: async (formData) => {
      console.log(formData);
      const response = await fetch('/api/learner/chooseCustomInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

export default useChooseCustomInfo; 
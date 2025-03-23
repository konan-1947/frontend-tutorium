import { useMutation } from '@tanstack/react-query';

export const useRegisterTutor = () => {
  return useMutation({

    mutationFn: async (formdata) => {
      console.log(formdata);  
      const response = await fetch('/api/tutor/registertutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
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

export default useRegisterTutor; 
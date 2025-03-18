import { useMutation } from '@tanstack/react-query';

export const useVerifyLearner = () => {
  return useMutation({
    mutationFn: async (userId) => {
      const response = await fetch('/api/learner/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

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

export default useVerifyLearner; 
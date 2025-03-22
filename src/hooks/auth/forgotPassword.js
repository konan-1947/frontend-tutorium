import { useMutation } from '@tanstack/react-query';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email) => {
     
      const response = await fetch('/api/auth/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }
 
      return response.json();
    },
    onSuccess: (data) => {
      console.log('Reset email sent successfully:', data);
    },
    onError: (error) => {
      console.error('Error sending reset email:', error);
    },
  });
};

export default useForgotPassword; 
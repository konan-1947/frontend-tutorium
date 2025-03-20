import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ oldPassword, email, newPassword, confirmPassword }) => {
      const response = await axios.post('/api/auth/resetPassword', {
        oldPassword,
        email,
        newPassword,
        confirmPassword
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Password reset successful:', data);
    },
    onError: (error) => {
      console.error('Error resetting password:', error);
      throw error;
    }
  });
};

export default useResetPassword; 
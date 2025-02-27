import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      navigate('/find');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export default useLogin;
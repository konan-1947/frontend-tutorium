import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ username, displayname, email, password }) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, displayname, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }
      return data;
    },
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      // Có thể thêm logic chuyển hướng hoặc thông báo sau khi đăng ký
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

export default useRegister;
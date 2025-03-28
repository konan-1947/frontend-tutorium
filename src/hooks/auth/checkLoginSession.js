import { useMutation } from '@tanstack/react-query';

export const useCheckLoginSession = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/auth/checkLoginSession`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Lỗi check login');
      }
     
      const data = await response.json();
     console.log(data);
      return data;
 
  
    },
    onSuccess: (data) => {
      console.log(":", data);
    },
    onError: (error) => {
      console.error(":", error);
    },
  });
};

export default useCheckLoginSession; 
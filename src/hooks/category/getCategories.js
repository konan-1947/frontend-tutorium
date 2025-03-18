import { useMutation } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/util/getCategories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      console.log("Categories fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching categories:", error);
    },
  });
};

export default useGetCategories; 
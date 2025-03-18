import { useMutation } from '@tanstack/react-query';

export const useSearchTutors = () => {
  return useMutation({
    mutationFn: async (formData) => {
      // Convert FormData to query string
      const queryString = new URLSearchParams(formData).toString();
      console.log(queryString);
      const response = await fetch(`/api/learner/findTutor?${queryString}`, {
        method: 'GET',
        headers: {
          // Add any necessary headers here
        },
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch tutors');
      }

      return data.data;
    },
    onError: (error) => {
      console.error('Error fetching tutors:', error);
    },
  });
};

export default useSearchTutors;

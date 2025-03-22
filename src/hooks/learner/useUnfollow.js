import { useMutation } from '@tanstack/react-query';

export const useUnfollow = () => {
    return useMutation({
        mutationFn: async (tutorId) => {
            const response = await fetch('/api/learner/unfollow', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tutorId }),
                credentials: 'include'
            });
      
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to unfollow tutor');
            }

            return response.json();
        }
    });
}; 
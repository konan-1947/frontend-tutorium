import { useMutation } from '@tanstack/react-query';

export const useFollow = () => {
    return useMutation({
        mutationFn: async (tutorId) => {
            const response = await fetch('/api/learner/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tutorId }),
                credentials: 'include'
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to follow tutor');
            }

            return response.json();
        }
    });
}; 
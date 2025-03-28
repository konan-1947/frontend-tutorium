import { useMutation } from '@tanstack/react-query';

export const useVerifyLearner = () => {
    return useMutation({

        mutationFn: async () => {
            const response = await fetch('/api/learner/changeVerifiedAt', {
                method: 'GET',
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
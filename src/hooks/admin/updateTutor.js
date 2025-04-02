import { useMutation } from '@tanstack/react-query';

export const useUpdateTutor = () => {
    return useMutation({
        mutationFn: async ({ userid, username, imgurl, displayname, email, dateofbirth, address,
            description, descriptionvideolink, expectedsalary, contracts }) => {
        
            console.log("Starting mutation function...");
            console.log("Received parameters:", { userid, username, imgurl, displayname, email, dateofbirth, address, description, descriptionvideolink, expectedsalary, contracts });

            const requestBody = JSON.stringify({
                username, imgurl, displayname, email, dateofbirth, address,
                description, descriptionvideolink, expectedsalary, contracts
            });

            console.log("Request body:", requestBody);

            try {
                const response = await fetch(`/api/admin/updateTutor/${userid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: requestBody,
                });

                console.log("Response received:", response);

                const data = await response.json();
                console.log("Parsed response JSON:", data);

                if (!response.ok) {
                    console.error("Response error:", data);
                    throw new Error(data.message || 'Update failed');
                }

                return data;
            } catch (error) {
                console.error("Fetch error:", error);
                throw error;
            }
        },
        onSuccess: (data) => {
            console.log("Tutor updated successfully:", data);
        },
        onError: (error) => {
            console.error("Error updating tutor:", error);
        },
    });
};

export default useUpdateTutor;

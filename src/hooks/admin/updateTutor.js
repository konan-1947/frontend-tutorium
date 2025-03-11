import { useMutation } from '@tanstack/react-query';

export const useUpdateTutor = () => {
    return useMutation({
        mutationFn: async ({userid, username, imgurl, displayname, email, dateofbirth, address,
            description, descriptionvideolink, expectedsalary, contracts}) => {
               
            const response = await fetch(`/api/admin/updateTutor/${userid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, imgurl, displayname, email, dateofbirth, address,
                    description, descriptionvideolink, expectedsalary, contracts}),
            });
        
            const data = await response.json();
            
            if (!response.ok) {
                // Handle unsuccessful update
                throw new Error(data.message || 'Update failed');
            }

            return data;
        },
        onSuccess: (data) => {
            console.log("Tutor updated successfully:", data); // More specific log message
        },
        onError: (error) => {
            console.error("Error updating tutor:", error); // Better error log message
        },
    });
};

export default useUpdateTutor;

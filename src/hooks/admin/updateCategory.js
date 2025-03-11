import { useMutation } from '@tanstack/react-query';

export const useUpdateCategory = () => {
    return useMutation({
        mutationFn: async ({ categoryid, categoryname, description }) => {
            console.log("Sending data:", { categoryid, categoryname, description });  // Log dữ liệu trước khi gửi

            const response = await fetch(`/api/admin/updateCategory/${categoryid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryname, description }),
            });
        
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Update failed');
            }
            return data;
        },
        onSuccess: () => {
            console.log("Category updated successfully");
        },
        onError: (error) => {
            console.error(error);
        },
    });
};

export default useUpdateCategory;

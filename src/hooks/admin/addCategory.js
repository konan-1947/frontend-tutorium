import { useMutation } from '@tanstack/react-query';

export const useAddCategory = () => {
    return useMutation({
        mutationFn: async ({ categoryname, description }) => {
            console.log("Sending data:", { categoryname, description });  // Log dữ liệu trước khi gửi

            const response = await fetch('/api/admin/createCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                 
                body: JSON.stringify({ categoryname, description }),
            });
            console.log("hahahahaaaaa");
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Add failed');
            }
            return data;
        },
        onSuccess: () => {
            console.log("Category added successfully");
        },
        onError: (error) => {
            console.error(error);
        },
    });
};

export default useAddCategory;

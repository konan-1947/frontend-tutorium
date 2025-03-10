import { useMutation } from '@tanstack/react-query';

export const useDeleteCategory = () => {
    return useMutation({
        mutationFn: async (categoryId) => {
         // Log dữ liệu trước khi gửi

         const response = await fetch(`/api/admin/deleteCategory/${categoryId}`, {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
   
            });
        
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message);
            }
            return data;
        },
        onSuccess: () => {
            window.location.reload();
        },
        onError: (error) => {
            console.log("không xoá được");
        },
    });
};

export default useDeleteCategory;

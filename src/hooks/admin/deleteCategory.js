import { useMutation } from '@tanstack/react-query';

export const useDeleteCategory = () => {
    return useMutation({
        mutationFn: async (categoryId) => {
            // Log dữ liệu trước khi gửi
            console.log('Starting category deletion for categoryId:', categoryId);

            console.log('Sending DELETE request to:', `/api/admin/deleteCategory/${categoryId}`);
            const response = await fetch(`/api/admin/deleteCategory/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);
            
            if (!response.ok) {
                console.log('Request failed with status:', response.status);
                throw new Error(data.message);
            }
            
            console.log('Category deleted successfully, returning data:', data);
            return data;
        },
        onSuccess: (data) => {
            console.log('Mutation successful, response data:', data);
            window.location.reload();
        },
        onError: (error) => {
            console.error('Error deleting category:', error.message);
            console.log("không xoá được");
        },
    });
};

export default useDeleteCategory;
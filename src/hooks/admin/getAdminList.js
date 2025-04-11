import { useMutation } from '@tanstack/react-query';

export const useFetchTutors = async () => {
    try {
        console.log('Starting useFetchTutors execution');
        
        //lấy api
        console.log('Preparing to fetch from /api/admin/getAdminList');
        console.log('Request config:', {
            method: 'GET',
            credentials: 'true'
        });
        const response = await fetch("/api/admin/getAdminList", {
            //gửi thuộc tính của api
            method: 'GET',
            credentials: 'true'
        });
        console.log('Fetch request completed');
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        console.log('hhahahahah');
        //lỗi của api
        if (!response.ok) {
            console.log('Response not ok, preparing to throw error');
            throw new Error("Không thể lấy AdminList");
        }
        
        console.log('Response is ok, parsing JSON');
        const data = await response.json();
        console.log('Parsed data:', data);
        
        console.log('Returning data:', data);
        return data;

    } catch (error) {
        //xuất lỗi  
        console.log('Caught error:', error);
        console.log('Error message:', error.message);
    }
};

export default useFetchTutors;
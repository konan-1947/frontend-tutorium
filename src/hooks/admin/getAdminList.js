import { useMutation } from '@tanstack/react-query';

export const useFetchTutors = async () => {
    try {
        //lấy api
        const response = await fetch("/api/admin/getAdminList",{
            //gửi thuộc tính của api
            method:'GET',
            credentials:'include'
        });
        //lỗi của api
        if(!response.ok){
            throw new Error("Không thể lấy AdminList")
        }
        console.log(response)
        const data = await response.json();
        console.log("Danh sách Admin:", data);
        return data;

    } catch (error) {
      //xuất lỗi  
      console.log(error);
    }
    
   
};

export default useFetchTutors;

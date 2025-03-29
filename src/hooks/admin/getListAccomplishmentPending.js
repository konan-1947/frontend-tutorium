import { useMutation } from '@tanstack/react-query';

export const usegetListAccomplishmentPending = async () => {
    try {
        //lấy api
        const response = await fetch("/api/admin/getListAccomplishmentPending",{
            //gửi thuộc tính của api
            method:'GET',
            credentials:'include',
        });
        //lỗi của api
        if(!response.ok){
            throw new Error("Không thể lấy TutorList")
        }
        const data = await response.json();

        return data;

    } catch (error) {
      //xuất lỗi  
      console.log(error);
    }
    
   
};

export default usegetListAccomplishmentPending;

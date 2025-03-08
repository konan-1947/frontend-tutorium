import { useMutation } from '@tanstack/react-query';

export const useFetchTutors = async () => {
    try {
        //lấy api
        const response = await fetch("/api/admin/getTutorList",{
            //gửi thuộc tính của api
            method:'GET',
            credentials:'true'
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

export default useFetchTutors;

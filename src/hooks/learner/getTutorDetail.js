import { useMutation } from '@tanstack/react-query';

export const useFetchTutors = async () => {
    try {
        //lấy api
        const response = await fetch(`/api/admin/getTutorDetail/${userid}`,{
            //gửi thuộc tính của api
            method:'GET',
            credentials:'true'
        });
        //lỗi của api
        if(!response.ok){
            throw new Error("lỗi")
        }
        const data = await response.json();

        return data.data;

    } catch (error) {
      //xuất lỗi  
      console.log(error);
    }
     
};

export default useFetchTutors;

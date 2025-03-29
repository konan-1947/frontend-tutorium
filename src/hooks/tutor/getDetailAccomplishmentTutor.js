import { useMutation } from '@tanstack/react-query';

export const useGetDetailAccomplishmentTutor = () => {
  return useMutation({
    mutationFn: async (accomplishmentid) => {
console.log(accomplishmentid)
      const response = await fetch(`/api/tutor/getDetailAccomplishmentTutor/${accomplishmentid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

     const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(); // Ném lỗi ra ngoài để xử lý tiếp
      }
      console.log("Danh sách:", data);

      return data;
    
    },
    onSuccess: (data) => {
      console.log(":", data);
    },
    onError: (error) => {
      console.error();
    },
  });
};

export default useGetDetailAccomplishmentTutor; 
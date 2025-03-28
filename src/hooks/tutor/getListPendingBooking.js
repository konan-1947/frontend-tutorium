import { useMutation } from '@tanstack/react-query';

export const useGetListPendingBooking = () => {
  return useMutation({
    mutationFn: async () => {

      const response = await fetch(`/api/tutor/getListPendingBooking`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

     const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
      console.log("Danh sách pending booking:", data);
      return data.data;
    },
    onSuccess: (data) => {
      console.log(":", data);
    },
    onError: (error) => {
      console.error("", error);
    },
  });
};

export default useGetListPendingBooking; 
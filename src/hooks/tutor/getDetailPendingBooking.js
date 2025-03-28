import { useMutation } from '@tanstack/react-query';

export const useGetDetailPendingBooking = () => {
  return useMutation({
    mutationFn: async (contractId) => {
console.log(contractId)
      const response = await fetch(`/api/tutor/getDetailPendingBooking/${contractId}`, {
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

      return data;
    
    },
    onSuccess: (data) => {
      console.log(":", data);
    },
    onError: (error) => {
      console.error("", error);
    },
  });
};

export default useGetDetailPendingBooking; 
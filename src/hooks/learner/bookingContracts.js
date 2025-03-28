import { Message } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';

export const useBookingContracts = () => {
  return useMutation({

    mutationFn: async ({ username, payment, target, endtime, starttime }) => {
      console.log(username);
      const response = await fetch(`/api/learner/BookingContract/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment, target, endtime, starttime }),
      });
    
      // Parse response trước khi kiểm tra lỗi
      const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
    
      return data;
    },
    
    onSuccess: (data) => {
      console.log('Verification successful:', data);
    },
    onError: (error) => {
      console.error('Verification error:', error);
    },
  });
};

export default useBookingContracts; 
import { useMutation } from '@tanstack/react-query';

export const useApproveContract = () => {
  return useMutation({
    mutationFn: async (contractId) => {
        console.log(contractId)
      const response = await fetch(`/api/tutor/approveContract/${contractId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });

      const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
      alert('Đã duyệt hợp đồng thành công!')
      return data;
    },
    onSuccess: (data) => {
      console.log("Learner detail fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching learner detail:", error);
    },
  });
};

export default useApproveContract; 
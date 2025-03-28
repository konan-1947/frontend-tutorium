import { useMutation } from '@tanstack/react-query';


export const useDeleteLearner = () => {
  return useMutation({
    mutationFn: async (userId) => {
      const response = await fetch(`/api/admin/deleteLearner/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Gửi cookies để backend xử lý session
      });

      const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.message); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
    
      return data;
 
    },
    onSuccess: (data) => {
      console.log("Đăng xuất thành công:", data);
      alert("Learner xoá thành công!");
    },
    onError: (error) => {
      console.error("Lỗi khi đăng xuất:", error.message);
    },
  });
};

export default useDeleteLearner;
import { useMutation } from '@tanstack/react-query';

export const useGetListFollower = () => {
  return useMutation({
    mutationFn: async (username) => {
        
      const response = await fetch(`/api/tutor//getListFollower/${username}`, {
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
      console.log("Danh sách follower:", data);
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

export default useGetListFollower; 
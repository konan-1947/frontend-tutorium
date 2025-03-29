import { useMutation } from '@tanstack/react-query';

export const useApproveAccomplishmentPending = () => {
  return useMutation({
    mutationFn: async ({ accomplishmentid, action }) => {
      console.log("Dữ liệu gửi đi:", { accomplishmentid, status }); 
      const response = await fetch(`/api/admin/approveAccomplishmentPending/${accomplishmentid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }), // Wrap status in an object
      });

      const data = await response.json(); // Parse the response body

      if (!response.ok) {
        console.log("Lỗi:", data.message); // Log the error message from the response
        throw new Error(data.message); // Throw the error to be caught by onError
      }

      return data; // Return the parsed data on success
    },
    onSuccess: (data) => {
      console.log("Thành công:", data); // Log success message
    },
    onError: (error) => {
      console.error("Lỗi khi xử lý thành tựu:", error.message); // Log the error
    },
  });
};

export default useApproveAccomplishmentPending;
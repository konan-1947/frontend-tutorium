import { useMutation } from '@tanstack/react-query';

export const useupdateAccomplishmentTutor = () => {
  return useMutation({
    mutationFn: async ({ accomplishmentid, ...formData }) => {
      console.log("Dữ liệu gửi đi:", formData);
      const response = await fetch(`/api/tutor/updateAccomplishmentTutor/${accomplishmentid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Gửi formData trong body
      });

      console.log("Phản hồi từ API:", response);
      const data = await response.json();

      if (!response.ok) {
        console.log("Lỗi:", data.message);
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data) => {
      console.log("Cập nhật thành tích thành công:", data);
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật thành tích:", error);
    },
  });
};

export default useupdateAccomplishmentTutor;
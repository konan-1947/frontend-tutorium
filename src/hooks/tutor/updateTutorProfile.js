import { useMutation } from '@tanstack/react-query';

export const useUpdateTutorProfile = () => {
  return useMutation({
    mutationFn: async (profileData) => {
      // Tách riêng các trường cần gửi
      const dataToSend = {
        displayname: profileData.User.displayname,
        imgurl: profileData.User.imgurl,
        dateofbirth: profileData.User.dateofbirth,
        address: profileData.User.address,
        description: profileData.User.description,
        descriptionvideolink: profileData.User.descriptionvideolink,
      };

      console.log("Dữ liệu gửi đi:", dataToSend); // Log dữ liệu gửi đi
      const response = await fetch(`/api/tutor/updateTutorProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Gửi cookies nếu cần xác thực
        body: JSON.stringify(dataToSend), // Chỉ gửi các trường cần thiết
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Lỗi:", data.message);
        throw new Error(data.message || 'Cập nhật thất bại');
      }
      
      alert('Cập nhật thành công!');
      return data;
    },
    onSuccess: (data) => {
      console.log("Cập nhật thông tin gia sư thành công:", data);
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật thông tin gia sư:", error.message);
    },
  });
};

export default useUpdateTutorProfile;
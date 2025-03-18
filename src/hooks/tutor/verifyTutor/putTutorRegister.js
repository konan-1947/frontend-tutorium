import { useMutation } from '@tanstack/react-query';

export const usePutTutorRegister = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { 
        firstName,
        lastName,
        email,
        phone,
        photoUrl,
        title,
        introduction,
        teachingExperience,
        methodology,
        videoUrl,
        hourlyRate
      } = formData;

      console.log("Sending tutor registration data:", formData);

      const response = await fetch('/api/tutor/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          photoUrl,
          title,
          introduction,
          teachingExperience,
          methodology,
          videoUrl,
          hourlyRate: Number(hourlyRate)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }
      return data;
    },
    onSuccess: () => {
      console.log("Đăng ký gia sư thành công");
    },
    onError: (error) => {
      console.error("Lỗi khi đăng ký gia sư:", error);
    },
  });
};

export default usePutTutorRegister; 
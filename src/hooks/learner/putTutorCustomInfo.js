import { useMutation } from '@tanstack/react-query';

export const usePutTutorCustomInfo = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { 
        category,
        address,
        dateofbirth,
        learninggoal

      } = formData;

      console.log("Sending tutor registration data:", formData);

      const response = await fetch('/learner/verifyLearner/:userid', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          address,
          dateofbirth,
          learninggoal
         
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
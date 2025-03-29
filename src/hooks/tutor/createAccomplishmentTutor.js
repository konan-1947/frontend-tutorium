import { useMutation } from '@tanstack/react-query';

export const useCreateAccomplishmentTutor = () => {
  return useMutation({
    mutationFn: async (formdata) => {
        console.log('aaaaaaaaaaaaaa')
      const response = await fetch(`/api/tutor/createAccomplishmentTutor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
 console.log(response)
      const data = await response.json();
    
      if (!response.ok) {
        alert(data.message);
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
    
      return data;
    },
    onSuccess: (data) => {
      console.log(":", data);
    },
    onError: (error) => {
      console.error("Error detail:", error);
    },
  });
};

export default useCreateAccomplishmentTutor; 
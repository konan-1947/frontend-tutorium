import { useMutation } from '@tanstack/react-query';

export const useRegisterTutor = () => {
  return useMutation({

    mutationFn: async (formdata) => {
      console.log(formdata);  
      const response = await fetch('/api/auth/registertutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
   

      const data = await response.json();
    
      if (!response.ok) {
        console.log("Lỗi:", data.error); // In lỗi rõ ràng
        throw new Error(data.message); // Ném lỗi ra ngoài để xử lý tiếp
      }
    
      return data;
    },
    onSuccess: (data) => {

    },
    onError: (error) => {
      alert("Tên người dùng hoặc email đã được dùng. Vui lý nhập lại!");
    },
  });
};

export default useRegisterTutor; 
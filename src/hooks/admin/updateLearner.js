import { useMutation } from '@tanstack/react-query';

export const useUpdateLearner = () => {
  return useMutation({
    mutationFn: async ({ userid, displayname, address, email,learneringgoal, dateofbirth }) => {
      console.log("Sending data:", { userid, displayname, address, email,learneringgoal, dateofbirth });

      const response = await fetch(`/api/admin/updateLearner/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, displayname, address, email,learneringgoal, dateofbirth }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Update failed');
      }
      return data;
    },
    onSuccess: () => {
      console.log("Learner updated successfully");
      alert("Learner  cập nhật thành công!");
    },
    onError: (error) => {
      console.error("Error updating learner:", error);
    },
  });
};

export default useUpdateLearner;

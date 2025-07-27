import { useMutation } from "@tanstack/react-query";


export const useTechTalentProfileUpdate = () => {
  const mutation = useMutation({
    mutationFn: async ({ techId, payload }) => {
      const res = await axios.put(`${API_HOST_URL}/api/v1/tech-talent/${techId}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
  });

  return {
    updateTechProfile: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

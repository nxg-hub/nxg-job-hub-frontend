import { useQuery } from "@tanstack/react-query";

export const useCheckCompleteProfileFlag = () => {
  return useQuery({
    queryKey: ["completeProfileFlag"],
    queryFn: () => {
      const flag = localStorage.getItem("complete-profile");
      if (flag === null) {
        // null means key not found
        return null;
      }
      // Assuming it stores "true" or "false" strings
      return flag === "true";
    },
    staleTime: Infinity, // Keep it fresh indefinitely
    gcTime: Infinity, // Keep it in cache
    refetchOnMount: false, // Don't refetch on every mount
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};

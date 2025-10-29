import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchUsersToChat = (userType) => {
  const fetchUsers = async ({ pageParam = 0 }) => {
    const response = await axios.get(
      `${API_HOST_URL}/api/v1/auth/type/${userType}`,
      {
        params: { page: pageParam, size: 20 },
      }
    );
    return response.data;
  };
  return useInfiniteQuery({
    queryKey: ["searchUserToChat"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
  });
};

export const useFetchInboxMessages = ({
  size = 10,
  receiverId,
  senderId,
} = {}) => {
  const storeKey =
    localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
    sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

  if (!storeKey) throw new Error("No key stored");

  const authKey = JSON.parse(storeKey)?.authKey;

  const fetchInboxMessages = async ({ pageParam = 0 }) => {
    //query params
    const queryParams = new URLSearchParams({
      page: pageParam,
      size,
    });

    if (receiverId) queryParams.append("receiverId", receiverId);
    if (senderId) queryParams.append("senderId", senderId);

    const response = await axios.get(
      `${API_HOST_URL}/api/inbox/get-inbox?${queryParams.toString()}`,
      {
        headers: {
          authorization: authKey,
        },
      }
    );
    return response.data;
  };
  return useInfiniteQuery({
    queryKey: ["inboxMessages"],
    queryFn: fetchInboxMessages,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pageable.pageNumber;
      const totalPages = lastPage.totalPages;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!authKey,
    staleTime: 1000 * 60,
    keepPreviousData: true,
  });
};

export const useFetchMessageThreads = (threadId) => {
  const fetchThreads = async () => {
    const response = await axios.get(
      `${API_HOST_URL}/api/inbox/thread/${threadId}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["getMessageThreads", threadId],
    queryFn: fetchThreads,
    staleTime: 1000 * 60 * 5,
    enabled: !!threadId,
  });
};

export const useSendMessage = () => {
  const storeKey =
    localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
    sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

  if (!storeKey) throw new Error("No key stored");

  const authKey = JSON.parse(storeKey)?.authKey;

  const sendMessage = async ({ payload }) => {
    const response = await axios.post(
      `${API_HOST_URL}/api/inbox/send-inbox-message`,
      payload,
      {
        headers: {
          authorization: authKey,
        },
      }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: sendMessage,
  });

  return {
    mutate: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useFetchMessages = () => {
  const storeKey =
    localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
    sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

  if (!storeKey) throw new Error("No key stored");

  const authKey = JSON.parse(storeKey)?.authKey;

  const fetchInbox = async () => {
    const response = await axios.get(`${API_HOST_URL}/api/inbox/get-inbox`, {
      headers: {
        authorization: authKey,
      },
    });
    return response.data;
  };

  const fetchThreadMessages = async (threadId) => {
    const response = await axios.get(
      `${API_HOST_URL}/api/inbox/thread/${threadId}`
    );
    return response.data;
  };

  const { data: inboxData } = useQuery({
    queryKey: ["inboxMessages"],
    queryFn: fetchInbox,
  });

  const messageId = inboxData?.content?.[0]?.threadId;

  const {
    data: threadData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["historyMessages", messageId],
    queryFn: () => fetchThreadMessages(messageId),
    enabled: !!messageId,
    staleTime: 1000 * 60 * 0.5,
  });
  return {
    messages: threadData || [],
    isLoading,
    isSuccess,
  };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
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

  return useMutation({
    mutationFn: sendMessage,
    onError: (err, variables, context) => {
      queryClient.setQueryData(["inboxMessages"], context.previousData);
    },
    onSuccess: (saveMessage, newMessage) => {
      queryClient.invalidateQueries({ queryKey: ["inboxMessages"] });
    },
  });
};

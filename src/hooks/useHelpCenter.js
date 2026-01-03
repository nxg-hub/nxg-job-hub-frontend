import { API_HOST_URL } from "@/utils/api/API_HOST";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";

const STORAGE_KEY = "NXGJOBHUBLOGINKEYV1";
const getAuthHeader = () => {
  const storeKey =
    localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
  return storeKey ? JSON.parse(storeKey)?.authKey : null;
};

export const useFetchMessages = ({ page, size }) => {
  const { data: inboxData } = useQuery({
    queryKey: ["inboxMessages"],
    queryFn: async () => {
      const authKey = getAuthHeader();
      const { data } = await axios.get(`${API_HOST_URL}/api/inbox/get-inbox`, {
        headers: { authorization: authKey },
      });
      return data;
    },
  });

  const threadId = inboxData?.content?.[0]?.threadId;

  const query = useInfiniteQuery({
    queryKey: ["historyMessages", threadId],
    enabled: !!threadId,
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const authKey = getAuthHeader();
      const { data } = await axios.get(
        `${API_HOST_URL}/api/inbox/thread/${threadId}`,
        {
          params: { page: pageParam, size },
          headers: { authorization: authKey },
        }
      );
      return data;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    staleTime: 1000 * 60 * 5,
  });

  const allMessages = query.data?.pages.flatMap((page) => page.content) ?? [];

  return {
    ...query,
    messages: allMessages,
    threadId,
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

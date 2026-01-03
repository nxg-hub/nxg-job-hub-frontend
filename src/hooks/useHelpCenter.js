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
  const { data: inboxData, isLoading: isLoadingInbox } = useQuery({
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
    messages: allMessages,
    threadId,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isSuccess: query.isSuccess,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading || isLoadingInbox,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  const sendMessageFn = async ({ payload }) => {
    const authKey = getAuthHeader();
    const response = await axios.post(
      `${API_HOST_URL}/api/inbox/send-inbox-message`,
      payload,
      {
        headers: { authorization: authKey },
      }
    );
    return response.data;
  };

  return useMutation({
    mutationFn: sendMessageFn,

    // Fires before the mutation function runs
    onMutate: async (variables) => {
      const threadId = variables.payload.threadId;

      // 1. Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["historyMessages", threadId],
      });
      await queryClient.cancelQueries({ queryKey: ["inboxMessages"] });

      // 2. Snapshot the previous value for rollback if needed
      const previousHistory = queryClient.getQueryData([
        "historyMessages",
        threadId,
      ]);

      return { previousHistory, threadId };
    },

    onError: (err, variables, context) => {
      // Roll back to the previous history if the message fails
      if (context?.threadId) {
        queryClient.setQueryData(
          ["historyMessages", context.threadId],
          context.previousHistory
        );
      }
    },

    onSuccess: (data, variables) => {
      const threadId = variables.payload.threadId;
      queryClient.invalidateQueries({ queryKey: ["inboxMessages"] });
      if (threadId) {
        queryClient.invalidateQueries({
          queryKey: ["historyMessages", threadId],
        });
      }
    },
  });
};

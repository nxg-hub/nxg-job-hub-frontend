import { useState, useRef, useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MessageSquare } from "lucide-react";
import { cn, getDateAsTextLabel } from "@/lib/utils";
import {
  useFetchInboxMessages,
  useFetchUsersToChat,
} from "@/hooks/useMessaging";
import { useEmployerData } from "@/store/employer/employerStore";

export default function ChatSidebar({
  selectedChat,
  onSelectChat,
  onSetChatDetails,
}) {
  const employer = useEmployerData((state) => state.employerData);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchUsersToChat("TECHTALENT");

  const chatHistories = useFetchInboxMessages();

  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);
  const loadMoreRef = useRef(null);
  const dropdownRef = useRef(null);

  //flatten all pages into an array
  const allUsersToChat = useMemo(() => {
    return data?.pages.flatMap((page) => page.content) || [];
  }, [data]);

  //filter searched user
  const filteredUsers = useMemo(() => {
    if (!debounceSearch.trim()) return allUsersToChat;

    const search_key = debounceSearch.toLowerCase();

    return allUsersToChat.filter((chatUser) => {
      const { firstName = "", lastName = "" } = chatUser.user || {};
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      return fullName.includes(search_key);
    });
  }, [debounceSearch, allUsersToChat]);

  //flatten all pages into an array
  const allChatHistories = useMemo(() => {
    const all = chatHistories.data?.pages.flatMap((page) => page.content) || [];

    // Remove duplicates by threadId
    const unique = Array.from(
      new Map(all.map((chat) => [chat.threadId, chat])).values()
    );

    return unique;
  }, [chatHistories.data]);

  //filter searched user
  const filteredChatHistories = useMemo(() => {
    if (!debounceSearch.trim()) return allChatHistories;

    const search_key = debounceSearch.toLowerCase();

    return allChatHistories.filter((chatHistory) => {
      const { firstName = "", lastName = "" } = chatHistory.user || {};
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      return fullName.includes(search_key);
    });
  }, [debounceSearch, allChatHistories]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceSearch(searchQuery);
    }, 400);
    return () => {
      clearTimeout(handle);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(vurrentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserSelect = (user) => {
    const chatDetails = {
      hostID: employer?.id,
      recipientID: user?.user.id,
      recipientName: `${user?.user.firstName} ${user?.user.lastName}`,
      recipientProfileImage: user?.user.profilePicture,
    };
    // Check if chat already exists
    const existingChat = allChatHistories.find(
      (chat) => chat.receiverId === user?.user.id
    );
    if (existingChat) {
      onSelectChat(existingChat);
      onSetChatDetails(chatDetails);
    } else {
      onSelectChat(null);
      onSetChatDetails(chatDetails);
    }
    console.log(chatDetails);
    console.log(existingChat);
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">Messages</h1>
        </div>

        {/* Search Box */}
        <div className="relative" ref={dropdownRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
            className="pl-9 bg-muted/50 border-border"
          />

          {isLoading && <p>Loading...</p>}

          {showDropdown && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                <div className="p-1">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.user.id}
                      onClick={() => handleUserSelect(user)}
                      className="border-transparent w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage
                          src={user.user.profilePicture || "/placeholder.svg"}
                          alt={user.user.firstName}
                        />
                        <AvatarFallback>
                          {`${user.user.firstName} ${user.user.lastName}`
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">
                          {user.user.firstName} {user.user.lastName}
                        </h3>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No users found
                </div>
              )}

              <div
                ref={loadMoreRef}
                className="h-8 flex justify-center items-center"
              >
                {isFetchingNextPage && <p>Loading more...</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChatHistories.map((chatHistory, index) => (
            <HistoryUIElement
              key={index}
              chatHistory={chatHistory}
              onSelectChat={onSelectChat}
              onSetChatDetails={onSetChatDetails}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

const HistoryUIElement = ({ chatHistory, onSelectChat, onSetChatDetails }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchUsersToChat("TECHTALENT");

  //flatten all pages into an array
  const allAgents = useMemo(() => {
    return data?.pages.flatMap((page) => page.content) || [];
  }, [data]);

  //find the agnet using the id
  const foundAgent = allAgents.find(
    (a) => a.user.id === chatHistory.receiverId
  );

  //keep fecting until the user is found
  useEffect(() => {
    if (!foundAgent && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [foundAgent, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSelectedChatUser = () => {
    const chatDetails = {
      hostID: chatHistory?.senderId,
      recipientID: chatHistory?.receiverId,
      recipientName: `${foundAgent?.user.firstName} ${foundAgent?.user.lastName}`,
      recipientProfileImage: foundAgent?.user.profilePicture,
    };

    onSelectChat(chatHistory);
    onSetChatDetails(chatDetails);
  };

  return (
    <>
      {isFetchingNextPage ? (
        <p>Loading...</p>
      ) : (
        <button
          key={chatHistory.threadId}
          onClick={handleSelectedChatUser}
          className={cn(
            "border-transparent w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left",
            ""
            // selectedChat?.id === chat.id && "bg-accent"
          )}
        >
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage
              src={foundAgent?.user.profilePicture || "/placeholder.svg"}
              alt={foundAgent?.user.firstName}
            />
            <AvatarFallback>
              {`${foundAgent?.user.firstName} ${foundAgent?.user.lastName}`
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="">
            <div className="flex items-center justify-between mb-1 gap-20">
              <h3 className="font-semibold text-sm text-foreground">
                {`${foundAgent?.user.firstName} ${foundAgent?.user.lastName}`}
              </h3>
              {/* <span className="text-xs text-muted-foreground flex-shrink-0">
            {getDateAsTextLabel(userHistory.timestamp)}
          </span> */}
            </div>
            <h3 className="text-sm text-foreground truncate">
              {chatHistory.body}
            </h3>
            {/* <div className="flex items-center justify-between">
          {userHistory.seen ? (
            <span>seen</span>
          ) : (
            <span className="flex-shrink-0 ml-2 bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
              not seen
            </span>
          )}
        </div> */}
          </div>
        </button>
      )}
    </>
  );
};

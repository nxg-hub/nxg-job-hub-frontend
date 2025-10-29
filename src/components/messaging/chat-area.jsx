import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MoreVertical, Phone, Video } from "lucide-react";
import { useFetchMessageThreads, useSendMessage } from "@/hooks/useMessaging";
import { getDateAsTextLabel } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export default function ChatArea({ selectedChat, chatDetails }) {
  const { hostID, recipientID, recipientName, recipientProfileImage } =
    chatDetails ?? {};

  const { data, refetch } = useFetchMessageThreads(selectedChat?.threadId);

  useEffect(() => {
    refetch();
  }, [selectedChat?.threadId]);

  if (!selectedChat && !chatDetails) {
    return <EmptyChatBackground />;
  }

  if (!selectedChat && chatDetails) {
    return (
      <div className="flex-1 flex flex-col bg-background">
        <ChatHeader
          recipientName={recipientName}
          recipientProfileImage={recipientProfileImage}
        />
        {/* Empty Chat Area */}
        <div className="flex-1 p-6">
          <EmptyChatBackground />
        </div>
        <ChatFooter
          selectedChat={selectedChat}
          receiverId={recipientID}
          threadId={selectedChat?.threadId}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatHeader
        recipientName={recipientName}
        recipientProfileImage={recipientProfileImage}
      />

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {data?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === hostID ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-2 rounded-2xl ${
                  msg.senderId === hostID
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.body}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId === hostID
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {getDateAsTextLabel(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <ChatFooter
        selectedChat={selectedChat}
        receiverId={recipientID}
        threadId={selectedChat?.threadId}
      />
    </div>
  );
}

const EmptyChatBackground = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 text-muted-foreground">
          <svg
            className="mx-auto h-24 w-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Select a conversation
        </h2>
        <p className="text-muted-foreground">
          Choose a chat from the sidebar to start messaging
        </p>
      </div>
    </div>
  );
};

const ChatHeader = ({ recipientProfileImage, recipientName }) => {
  {
    /* Chat Header */
  }
  return (
    <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={recipientProfileImage || "/placeholder.svg"}
            alt={recipientName}
          />
          <AvatarFallback>
            {recipientName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-foreground">{recipientName}</h2>
          <p className="text-xs text-muted-foreground">Active now</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

const ChatFooter = ({ selectedChat, receiverId, threadId }) => {
  {
    /* Message Input */
  }
  const queryClient = useQueryClient();
  const { mutate: sendMessage, isLoading } = useSendMessage();

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      let payload = {};

      if (selectedChat) {
        payload = {
          receiverId: receiverId,
          subject: "",
          body: message,
          threadId: threadId,
        };
      }

      if (!selectedChat) {
        payload = {
          receiverId: receiverId,
          subject: "",
          body: message,
        };
      }

      sendMessage(
        { payload },
        {
          onSuccess: (data) => {
            setMessage("");
            queryClient.invalidateQueries({ queryKey: ["getMessageThreads"] });
          },
          onError: (err) => {
            console.error("Message failed", err);
            toast({
              className: cn(
                "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
              ),
              title: <span className="text-red-900">Failed:</span>,
              description: (
                <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                  Message is unable to send
                </p>
              ),
            });
            //   if (!err.response) {
            //   toast({
            //     className: cn(
            //       "flex flex-col gap-5 top-10 right-4 fixed max-w-[400px] md:max-w-[420px]"
            //     ),
            //     title: <p className="text-red-900">Network error:</p>,
            //     description: (
            //       <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
            //         Failed to submit form, please check your internet connection.
            //       </p>
            //     ),
            //     action: (
            //       <ToastAction
            //         // onClick={handlePostJob}
            //         className="bg-primary text-white   hover:bg-sky-700 hover:text-white self-start border-transparent"
            //         altText="Try again"
            //       >
            //         Try again
            //       </ToastAction>
            //     ),
            //   });
            // }
          },
        }
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className="border-t border-border bg-card p-4">
      <div className="flex items-end gap-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-muted/50 border-border"
        />
        <Button
          onClick={handleSendMessage}
          size="icon"
          className="border-transparent flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  User,
  ArrowLeft,
  Send,
  Paperclip,
  Smile,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Custom hook for media queries
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// Mock data for messages
const conversations = [
  {
    id: 1,
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I need help with my plumbing issue",
    timestamp: new Date(2023, 3, 25, 10, 5),
    unread: 2,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When can you come to fix my cabinet?",
    timestamp: new Date(2023, 3, 24, 14, 30),
    unread: 0,
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the quick service!",
    timestamp: new Date(2023, 3, 23, 9, 12),
    unread: 0,
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Do you have availability this weekend?",
    timestamp: new Date(2023, 3, 22, 16, 45),
    unread: 1,
  },
  {
    id: 5,
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've sent you the details of the job",
    timestamp: new Date(2023, 3, 21, 11, 20),
    unread: 0,
  },
];

// Mock messages for a conversation
const messageHistory = [
  {
    id: 1,
    sender: "client",
    content:
      "Hello, I need help with my plumbing issue. My kitchen sink is leaking.",
    timestamp: new Date(2023, 3, 25, 9, 30),
  },
  {
    id: 2,
    sender: "artisan",
    content:
      "Hi there! I'd be happy to help. Can you describe the issue in more detail?",
    timestamp: new Date(2023, 3, 25, 9, 35),
  },
  {
    id: 3,
    sender: "client",
    content:
      "Water is leaking from the pipe under the sink whenever I turn on the faucet.",
    timestamp: new Date(2023, 3, 25, 9, 40),
  },
  {
    id: 4,
    sender: "artisan",
    content:
      "I understand. It sounds like you might have a loose connection or a damaged pipe. I can come take a look at it. When would be a good time?",
    timestamp: new Date(2023, 3, 25, 9, 45),
  },
  {
    id: 5,
    sender: "client",
    content: "Would tomorrow morning around 10 AM work?",
    timestamp: new Date(2023, 3, 25, 9, 50),
  },
  {
    id: 6,
    sender: "artisan",
    content:
      "Yes, that works for me. I'll be there at 10 AM tomorrow. Please send me your address.",
    timestamp: new Date(2023, 3, 25, 9, 55),
  },
  {
    id: 7,
    sender: "client",
    content: "Great! My address is 123 Main Street, Apartment 4B.",
    timestamp: new Date(2023, 3, 25, 10, 0),
  },
  {
    id: 8,
    sender: "artisan",
    content:
      "Got it. I'll see you tomorrow at 10 AM. If you have any other questions before then, feel free to message me.",
    timestamp: new Date(2023, 3, 25, 10, 5),
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [messageInput, setMessageInput] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showConversation, setShowConversation] = useState(!isMobile);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowConversation(true);
    }
  };

  const handleBackToList = () => {
    setShowConversation(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // In a real app, you would send this to your API
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="border-b px-4 py-2">
        <h1 className="text-xl font-semibold">Messages</h1>
        <p className="text-sm text-muted-foreground">
          Manage your conversations with clients
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation List */}
        {(!showConversation || !isMobile) && (
          <div
            className={`flex flex-col border-r ${
              isMobile ? "w-full" : "w-1/3"
            }`}>
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-8"
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex cursor-pointer items-center gap-3 border-b p-4 hover:bg-muted/50 ${
                    selectedConversation?.id === conversation.id
                      ? "bg-muted"
                      : ""
                  }`}
                  onClick={() => handleSelectConversation(conversation)}>
                  <Avatar>
                    <AvatarImage
                      src={conversation.avatar}
                      alt={conversation.name}
                    />
                    <AvatarFallback>
                      {conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {format(conversation.timestamp, "h:mm a")}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge
                      variant="default"
                      className="ml-auto bg-sky-600 rounded-full">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
        )}

        {/* Conversation Detail */}
        {(showConversation || !isMobile) && selectedConversation && (
          <div className={`flex flex-col ${isMobile ? "w-full" : "w-2/3"}`}>
            {/* Conversation Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackToList}
                    className="mr-1">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <Avatar>
                  <AvatarImage
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                  />
                  <AvatarFallback>
                    {selectedConversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Last active:{" "}
                    {format(selectedConversation.timestamp, "h:mm a")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  className="border-none bg-green-500 hover:bg-green-700"
                  size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button
                  className="border-none bg-gray-500 hover:bg-gray-700"
                  size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button
                  className="border-none bg-sky-500 hover:bg-sky-700"
                  size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="border-none bg-sky-500 hover:bg-sky-700"
                      size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                    <DropdownMenuItem>Archive conversation</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete conversation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Message History */}
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-4">
                {messageHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "artisan"
                        ? "justify-end"
                        : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "artisan"
                          ? "bg-sky-600 text-primary-foreground"
                          : "bg-muted"
                      }`}>
                      <p>{message.content}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {format(message.timestamp, "h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2">
                <Button
                  type="button"
                  className="border-none bg-sky-600 hover:bg-sky-500 shrink-0"
                  size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="border-none bg-sky-600 hover:bg-sky-500 shrink-0">
                  <Smile className="h-5 w-5 text-white" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="border-none bg-sky-600 hover:bg-sky-500 shrink-0">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

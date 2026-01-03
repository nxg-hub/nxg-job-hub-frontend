import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from "lucide-react";
import { useFetchMessages, useSendMessage } from "@/hooks/useHelpCenter";
import { cn, getDateAsTextLabel } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

export default function HelpCenter({
  senderId,
  receiverId,
  userType,
  profilePicture,
  senderName,
}) {
  const [input, setInput] = useState("");

  // Infinite Scroll Trigger
  const { ref: loadMoreRef, inView } = useInView();

  const {
    messages,
    threadId,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
  } = useFetchMessages({ size: 10 });

  const { mutate: sendMessage } = useSendMessage();

  // Load more when user scrolls to the "top" (which is the loadMoreRef)
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const payload = {
      receiverId,
      subject: "",
      userType,
      profilePicture,
      senderName,
      body: input,
      ...(threadId && { threadId }), // Include threadId if it exists
    };

    sendMessage(
      { payload },
      {
        onSuccess: () => {
          setInput("");
          // Typically you'd invalidate the query here to see your new message
        },
      }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Help Center
            </h1>
            <p className="text-xs text-muted-foreground">Support is online</p>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      {/* flex-col-reverse makes index 0 appear at the bottom */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse">
        <div className="mx-auto w-full max-w-2xl flex flex-col-reverse gap-4">
          {/* 1. Bottom: Greeting (If it's a new conversation) */}
          {isSuccess && messages.length === 0 && (
            <div className="bg-muted p-4 rounded-lg self-start border border-border">
              <p className="text-sm">Welcome! 👋 How can we help you today?</p>
            </div>
          )}

          {/* 2. Middle: The Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.senderId === senderId ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.senderId === senderId
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-foreground border border-border rounded-tl-none"
                }`}
              >
                <p className="text-sm">{msg.body}</p>
              </div>
              <span className="mt-1 text-[10px] opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}

          {/* 3. Top: Infinite Scroll Loading Indicator */}
          <div ref={loadMoreRef} className="py-4 flex justify-center">
            {isFetchingNextPage ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : hasNextPage ? (
              <span className="text-xs text-muted-foreground">
                Scroll up to load more
              </span>
            ) : null}
          </div>

          {isLoading && <p className="text-center text-sm">Loading chat...</p>}
        </div>
      </div>

      {/* Input Area */}
      <footer className="border-t border-border bg-card p-4 shrink-0">
        <div className="mx-auto max-w-2xl flex gap-3">
          <input
            className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

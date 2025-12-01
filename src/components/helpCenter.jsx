import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from "lucide-react";
import { useFetchMessages, useSendMessage } from "@/hooks/useHelpCenter";
import { cn, getDateAsTextLabel } from "@/lib/utils";

export default function HelpCenter({
  senderId,
  receiverId,
  userType,
  profilePicture,
  senderName,
}) {
  const { messages, isLoading, isSuccess } = useFetchMessages();
  const [hasGreeted, setHasGreeted] = useState(false);
  const greetingRef = useRef(null);

  const shouldShowGreeting = isSuccess && messages.length > 0 && !hasGreeted;

  const [input, setInput] = useState("");
  const { mutate } = useSendMessage({});

  useEffect(() => {
    if (shouldShowGreeting) {
      setHasGreeted(true);

      if (greetingRef.current) {
        greetingRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }
  }, [shouldShowGreeting]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      receiverId: receiverId,
      subject: "",
      userType: userType,
      profilePicture: profilePicture,
      senderName: senderName,
      body: input,
    };

    mutate({ payload: userMessage });
    setInput("");
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
      <div className="border-b border-border bg-card px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-foreground">
              Help Center
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              Chat with our support team
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {isSuccess &&
            messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex flex-col ${
                  message?.senderId === senderId ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    message?.senderId === senderId
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  <p className="text-xs md:text-sm">{message?.body}</p>
                </div>
                <p
                  className={`mt-1 text-xs ${
                    message?.senderId === senderId
                      ? "text-muted-foreground"
                      : "text-primary"
                  }`}
                >
                  {getDateAsTextLabel(message?.timestamp)}
                </p>
              </div>
            ))}
          {shouldShowGreeting && (
            <div ref={greetingRef} className="flex flex-col justify-start">
              <div className="max-w-xs rounded-lg px-4 py-2 bg-muted text-muted-foreground border border-border">
                <p className="text-xs md:text-sm">
                  Welcome to our Help Center! 👋 How can we assist you today?
                </p>
              </div>
              <p className="mt-1 text-xs text-primary">
                {" "}
                {getDateAsTextLabel(new Date())}
              </p>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center item-center">
              <div className="rounded-lg bg-muted px-4 py-2 text-muted-foreground border border-border">
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          {/* <div ref={messagesEndRef} /> */}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Our team is available 24/7 to help. We'll respond to your message
            shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

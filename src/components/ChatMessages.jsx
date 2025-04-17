import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const ChatMessages = ({ messages = [] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex gap-3", message.isCurrentUser ? "justify-end" : "justify-start")}>
          {!message.isCurrentUser && (
            <Avatar className="h-8 w-8 mt-1">
              <img src={message.avatar || "/placeholder.svg"} alt={`${message.sender} avatar`} />
            </Avatar>
          )}

          <div className={cn("max-w-[70%]", message.isCurrentUser ? "order-1" : "order-2")}>
            {!message.isCurrentUser && (
              <div className="mb-1 text-xs text-muted-foreground">
                {message.sender}, {message.time}
              </div>
            )}

            <div className={cn("rounded-2xl px-4 py-2", message.isCurrentUser ? "bg-teal-500 text-white" : "bg-muted")}>
              {message.mention && <span className="text-teal-500 font-medium">{message.mention} </span>}
              {message.content}
            </div>

            {message.isCurrentUser && (
              <div className="mt-1 text-xs text-right text-muted-foreground">{message.time}</div>
            )}

            {message.reactions && (
              <div className="flex gap-1 mt-1 justify-end">
                {message.reactions.map((reaction, index) => (
                  <span key={index} className="inline-block rounded-full bg-muted px-2 py-1 text-sm">
                    {reaction}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Typing indicator - only show for certain chats */}
      {messages.length > 0 && messages[0].sender === "Kate Johnson" && (
        <div className="flex items-center justify-center gap-2 my-2">
          <span className="text-xs text-muted-foreground">Robert is typing</span>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground delay-0"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground delay-150"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground delay-300"></span>
          </span>
        </div>
      )}
    </div>
  )
}

export default ChatMessages

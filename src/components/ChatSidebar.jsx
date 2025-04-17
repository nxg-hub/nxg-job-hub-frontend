"use client"

import { ChevronDown, MoreVertical, Plus, Search } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const ChatSidebar = ({ activeChat, setActiveChat }) => {
  const chats = [
    {
      id: "real-estate",
      name: "Real estate deals",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "typing...",
      time: "11:15",
      unread: false,
    },
    {
      id: "kate",
      name: "Kate Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I will send the document a...",
      time: "11:15",
      unread: false,
    },
    {
      id: "tamara",
      name: "Tamara Shevchenko",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "are you going to a busine...",
      time: "10:05",
      unread: true,
    },
    {
      id: "joshua",
      name: "Joshua Clarkson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I suggest to start, I have n...",
      time: "15:09",
      unread: false,
    },
    {
      id: "jeroen",
      name: "Jeroen Zoet",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "We need to start a new re...",
      time: "14:09",
      unread: false,
    },
  ]

  return (
    <div className="flex w-72 flex-col border-r">
      {/* User Profile */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <img src="/placeholder.svg?height=48&width=48" alt="User avatar" />
          </Avatar>
          <div>
            <h3 className="font-medium">Jontray Arnold</h3>
            <div className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-muted-foreground">available</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 rounded-full border-muted-foreground/20" />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-between px-4 py-2">
          <h4 className="text-sm font-medium text-muted-foreground">Last chats</h4>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ul className="space-y-1 px-2">
          {chats.map((chat) => (
            <li key={chat.id}>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors",
                  activeChat === chat.id ? "bg-muted" : "hover:bg-muted/50",
                )}
                onClick={() => setActiveChat(chat.id)}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <img src={chat.avatar || "/placeholder.svg"} alt={`${chat.name} avatar`} />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{chat.lastMessage}</p>
                </div>
                {chat.unread && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-xs text-teal-800">
                    TS
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Icons */}
      <div className="border-t p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-teal-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="7" height="7" x="3" y="3" rx="1"></rect>
              <rect width="7" height="7" x="14" y="3" rx="1"></rect>
              <rect width="7" height="7" x="14" y="14" rx="1"></rect>
              <rect width="7" height="7" x="3" y="14" rx="1"></rect>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar

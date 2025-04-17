"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreVertical, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatSidebar from "../../../components/ChatSidebar"
import ChatMessages from "../../../components/ChatMessages"
import FilesSidebar from "../../../components/FilesSidebar"

// Chat data that would normally come from an API
const chatData = {
  "real-estate": {
    name: "Real estate deals",
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [
      {
        id: 1,
        sender: "Kate Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Hi everyone, let's discuss the new property listings 🏡",
        time: "11:24 AM",
        isCurrentUser: false,
      },
      {
        id: 2,
        sender: "Evan Scott",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "I found some great options in the downtown area",
        time: "11:26 AM",
        isCurrentUser: false,
      },
      {
        id: 3,
        sender: "You",
        content: "Let's schedule a viewing for the top properties",
        time: "11:30 AM",
        isCurrentUser: true,
      },
    ],
    participants: 10,
  },
  kate: {
    name: "Kate Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [
      {
        id: 1,
        sender: "Kate Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Hi, I'll send the document about the new listing shortly",
        time: "11:15 AM",
        isCurrentUser: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Thanks Kate, I'm looking forward to reviewing it",
        time: "11:16 AM",
        isCurrentUser: true,
      },
      {
        id: 3,
        sender: "Kate Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Great! Let me know if you have any questions",
        time: "11:18 AM",
        isCurrentUser: false,
      },
    ],
    participants: 2,
  },
  tamara: {
    name: "Tamara Shevchenko",
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [
      {
        id: 1,
        sender: "Tamara Shevchenko",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Are you going to the business meeting tomorrow?",
        time: "10:05 AM",
        isCurrentUser: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Yes, I've already prepared my presentation",
        time: "10:07 AM",
        isCurrentUser: true,
      },
      {
        id: 3,
        sender: "Tamara Shevchenko",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Perfect! I'll see you there",
        time: "10:10 AM",
        isCurrentUser: false,
      },
    ],
    participants: 2,
  },
  joshua: {
    name: "Joshua Clarkson",
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [
      {
        id: 1,
        sender: "Joshua Clarkson",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "I suggest we start with the residential properties",
        time: "15:09 PM",
        isCurrentUser: false,
      },
      {
        id: 2,
        sender: "You",
        content: "That makes sense. Let's focus on those first",
        time: "15:11 PM",
        isCurrentUser: true,
      },
    ],
    participants: 2,
  },
  jeroen: {
    name: "Jeroen Zoet",
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [
      {
        id: 1,
        sender: "Jeroen Zoet",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "We need to start a new real estate campaign",
        time: "14:09 PM",
        isCurrentUser: false,
      },
      {
        id: 2,
        sender: "You",
        content: "I agree. Let's discuss the details tomorrow",
        time: "14:15 PM",
        isCurrentUser: true,
      },
    ],
    participants: 2,
  },
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState("real-estate")
  const [message, setMessage] = useState("")

  const currentChat = chatData[activeChat] || chatData["real-estate"]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    // Here you would typically send the message to your backend
    console.log("Sending message to", currentChat.name, ":", message)
    setMessage("")
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Left Sidebar - Chat List */}
      <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col border-x">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-medium">{currentChat.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Tabs */}
        <Tabs defaultValue="messages" className="flex-1">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-background">
            <TabsTrigger
              value="messages"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="participants"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Participants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="flex flex-1 flex-col data-[state=active]:h-full">
            <ChatMessages messages={currentChat.messages} />

            {/* Message Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 rounded-full border-muted-foreground/20"
                />
                <Button type="button" size="icon" variant="ghost" className="rounded-full">
                  <MoreVertical className="h-5 w-5" />
                </Button>
                <Button type="submit" size="icon" className="rounded-full bg-teal-500 hover:bg-teal-600">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="participants">
            <div className="p-4">
              <h3 className="text-lg font-medium">Group Participants</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {currentChat.participants} {currentChat.participants === 1 ? "member" : "members"}
              </p>
              {/* Participants list would go here */}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Sidebar - Files */}
      <FilesSidebar chatName={currentChat.name} />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Plus,
  User,
  Briefcase,
  Building2,
  MessageSquare,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TalentMessageTab() {
  const [activeChat, setActiveChat] = useState(1)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false)
  const [newMessageSubject, setNewMessageSubject] = useState("")
  const [newMessageContent, setNewMessageContent] = useState("")
  const [selectedEmployer, setSelectedEmployer] = useState(null)

  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Recruiter at TechCorp",
      company: "TechCorp Inc.",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      lastMessage: "Hi John, I'd like to discuss the Senior React Developer position with you.",
      time: "10:30 AM",
      unread: 2,
      online: true,
      type: "recruiter",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Hiring Manager at InnovateTech",
      company: "InnovateTech",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      lastMessage: "Thanks for your application. When would you be available for an interview?",
      time: "Yesterday",
      unread: 0,
      online: false,
      type: "employer",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Tech Recruiter at MobileApps",
      company: "MobileApps Co.",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
      lastMessage: "Your portfolio looks impressive! I have a position that might interest you.",
      time: "2 days ago",
      unread: 0,
      online: true,
      type: "recruiter",
    },
  ]

  const messages = {
    1: [
      {
        id: 1,
        sender: "Sarah Johnson",
        content: "Hi John, I'd like to discuss the Senior React Developer position with you.",
        time: "10:30 AM",
        isMe: false,
      },
      {
        id: 2,
        sender: "Sarah Johnson",
        content: "Your profile matches our requirements perfectly, and I think you'd be a great fit for our team.",
        time: "10:31 AM",
        isMe: false,
      },
      {
        id: 3,
        sender: "Me",
        content: "Hi Sarah, thanks for reaching out! I'd be happy to discuss the position.",
        time: "10:35 AM",
        isMe: true,
      },
      {
        id: 4,
        sender: "Sarah Johnson",
        content: "Great! Are you available for a quick call tomorrow at 2 PM?",
        time: "10:40 AM",
        isMe: false,
      },
    ],
    2: [
      {
        id: 1,
        sender: "Michael Chen",
        content: "Hello John, I've reviewed your application for the Frontend Engineer position.",
        time: "Yesterday",
        isMe: false,
      },
      {
        id: 2,
        sender: "Me",
        content: "Hi Michael, thank you for considering my application.",
        time: "Yesterday",
        isMe: true,
      },
      {
        id: 3,
        sender: "Michael Chen",
        content: "Thanks for your application. When would you be available for an interview?",
        time: "Yesterday",
        isMe: false,
      },
    ],
    3: [
      {
        id: 1,
        sender: "Emily Rodriguez",
        content: "Hello John, I came across your profile and was impressed by your skills.",
        time: "2 days ago",
        isMe: false,
      },
      {
        id: 2,
        sender: "Emily Rodriguez",
        content: "Your portfolio looks impressive! I have a position that might interest you.",
        time: "2 days ago",
        isMe: false,
      },
      {
        id: 3,
        sender: "Me",
        content: "Hi Emily, thank you for the kind words! I'd love to hear more about the position.",
        time: "2 days ago",
        isMe: true,
      },
    ],
  }

  // List of potential employers to message
  const potentialEmployers = [
    {
      id: 101,
      name: "TechCorp Inc.",
      description: "Leading technology company",
      avatar: "/placeholder.svg?height=40&width=40&text=TC",
      contact: "HR Department",
    },
    {
      id: 102,
      name: "InnovateTech",
      description: "Software development firm",
      avatar: "/placeholder.svg?height=40&width=40&text=IT",
      contact: "Recruitment Team",
    },
    {
      id: 103,
      name: "DesignStudio",
      description: "Creative design agency",
      avatar: "/placeholder.svg?height=40&width=40&text=DS",
      contact: "Talent Acquisition",
    },
    {
      id: 104,
      name: "MobileApps Co.",
      description: "Mobile application development",
      avatar: "/placeholder.svg?height=40&width=40&text=MA",
      contact: "Hiring Manager",
    },
    {
      id: 105,
      name: "DataSystems Inc.",
      description: "Data analytics and systems",
      avatar: "/placeholder.svg?height=40&width=40&text=DS",
      contact: "Technical Recruiter",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send this to an API
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleNewMessage = () => {
    if (selectedEmployer && newMessageSubject && newMessageContent) {
      // In a real app, you would send this to an API
      console.log("Sending new message to:", selectedEmployer)
      console.log("Subject:", newMessageSubject)
      console.log("Content:", newMessageContent)

      // Reset form and close dialog
      setSelectedEmployer(null)
      setNewMessageSubject("")
      setNewMessageContent("")
      setShowNewMessageDialog(false)
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeContact = contacts.find((contact) => contact.id === activeChat)

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col mx-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
          <DialogTrigger asChild>
            <Button className="border-none bg-sky-500 hover:bg-sky-600">
              <Plus className="h-4 w-4 mr-2 " />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Send a New Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employer">Select Employer</Label>
                <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto">
                  {potentialEmployers.map((employer) => (
                    <div
                      key={employer.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border ${selectedEmployer?.id === employer.id ? "border-primary bg-primary/5" : "hover:bg-muted"}`}
                      onClick={() => setSelectedEmployer(employer)}
                    >
                      <Avatar>
                        <AvatarImage src={employer.avatar || "/placeholder.svg"} alt={employer.name} />
                        <AvatarFallback>{employer.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{employer.name}</h4>
                        <p className="text-sm text-muted-foreground">{employer.description}</p>
                      </div>
                      {selectedEmployer?.id === employer.id && <div className="h-4 w-4 rounded-full bg-primary"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Inquiry about Frontend Developer position"
                  value={newMessageSubject}
                  onChange={(e) => setNewMessageSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={newMessageContent}
                  onChange={(e) => setNewMessageContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleNewMessage}
                  disabled={!selectedEmployer || !newMessageSubject || !newMessageContent}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-lg border">
        {/* Contacts sidebar */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-4 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="recruiters" className="flex-1">
                  Recruiters
                </TabsTrigger>
                <TabsTrigger value="employers" className="flex-1">
                  Employers
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 cursor-pointer hover:bg-accent ${activeChat === contact.id ? "bg-accent" : ""}`}
                      onClick={() => setActiveChat(contact.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                            <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{contact.name}</h3>
                            <span className="text-xs text-muted-foreground">{contact.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{contact.role}</p>
                          <p className="text-sm truncate">{contact.lastMessage}</p>
                        </div>
                        {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No contacts found</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="recruiters" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                {filteredContacts.filter((c) => c.type === "recruiter").length > 0 ? (
                  filteredContacts
                    .filter((c) => c.type === "recruiter")
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-4 cursor-pointer hover:bg-accent ${activeChat === contact.id ? "bg-accent" : ""}`}
                        onClick={() => setActiveChat(contact.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            {contact.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{contact.name}</h3>
                              <span className="text-xs text-muted-foreground">{contact.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{contact.role}</p>
                            <p className="text-sm truncate">{contact.lastMessage}</p>
                          </div>
                          {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No recruiters found</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="employers" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                {filteredContacts.filter((c) => c.type === "employer").length > 0 ? (
                  filteredContacts
                    .filter((c) => c.type === "employer")
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-4 cursor-pointer hover:bg-accent ${activeChat === contact.id ? "bg-accent" : ""}`}
                        onClick={() => setActiveChat(contact.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            {contact.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{contact.name}</h3>
                              <span className="text-xs text-muted-foreground">{contact.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{contact.role}</p>
                            <p className="text-sm truncate">{contact.lastMessage}</p>
                          </div>
                          {contact.unread > 0 && <Badge className="ml-auto">{contact.unread}</Badge>}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No employers found</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {activeContact ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeContact.avatar || "/placeholder.svg"} alt={activeContact.name} />
                    <AvatarFallback>{activeContact.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeContact.name}</h3>
                    <p className="text-sm text-muted-foreground">{activeContact.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Block Contact</DropdownMenuItem>
                      <DropdownMenuItem>Clear Conversation</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages[activeChat].map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[70%] ${msg.isMe ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
                      >
                        <p>{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 mx-auto rounded-full p-4 w-16 h-16 flex items-center justify-center">
                      <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-xl">Start Messaging</h3>
                    <p className="text-muted-foreground">
                      Select a conversation from the sidebar or start a new message to connect with employers and
                      recruiters
                    </p>
                    <div className="pt-4 space-y-3">
                      <Button className="w-full" onClick={() => setShowNewMessageDialog(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Message
                      </Button>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" className="flex gap-1">
                          <User className="h-4 w-4" />
                          <span>Recruiters</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>Employers</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex gap-1">
                          <Briefcase className="h-4 w-4" />
                          <span>Jobs</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

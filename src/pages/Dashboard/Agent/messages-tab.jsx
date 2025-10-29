import { Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { messagesData } from "@/utils/data/agent-mock-data";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatSidebar from "@/components/messaging/chat-sidebar";
import ChatArea from "@/components/messaging/chat-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEmployerData } from "@/store/employer/employerStore";

export default function MessagesTab() {
  const employer = useEmployerData((state) => state.employerData);
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <ScrollArea className="flex-1">
      <div className="p-8 space-y-6">
        <div className="flex h-screen gap-8">
          <ChatSidebar
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
          <ChatArea selectedChat={selectedChat} userID={employer?.id} />
        </div>
        <div className="flex justify-end">
          <Button className="border-none bg-sky-500 hover:bg-sky-600">
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <Card>
            <CardHeader className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="w-full appearance-none bg-background pl-8 shadow-none"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0.5">
                {messagesData.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer ${
                      index === 0 ? "bg-muted/50" : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={message.from.avatar || "/placeholder.svg"}
                        alt={message.from.name}
                      />
                      <AvatarFallback>
                        {message.from.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {message.from.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {message.time}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {message.preview}
                      </p>
                    </div>
                    {message.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-3 px-4 py-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={messagesData[0].from.avatar || "/placeholder.svg"}
                  alt={messagesData[0].from.name}
                />
                <AvatarFallback>
                  {messagesData[0].from.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">
                  {messagesData[0].from.name}
                </CardTitle>
                <CardDescription>{messagesData[0].from.type}</CardDescription>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-4 h-[400px] overflow-auto">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={messagesData[0].from.avatar || "/placeholder.svg"}
                      alt={messagesData[0].from.name}
                    />
                    <AvatarFallback>
                      {messagesData[0].from.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {messagesData[0].from.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        10:30 AM
                      </span>
                    </div>
                    <div className="rounded-lg bg-muted p-3 text-sm">
                      We need to discuss the candidate you sent us last week.
                      They have excellent technical skills, but we're concerned
                      about the cultural fit. Could we schedule a call to talk
                      about this?
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 space-y-2 flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        10:45 AM
                      </span>
                      <p className="text-sm font-medium">You</p>
                    </div>
                    <div className="rounded-lg bg-sky-500 p-3 text-sm text-primary-foreground">
                      I understand your concerns. I'm available for a call today
                      between 2-4pm or tomorrow morning. Let me know what works
                      for you.
                    </div>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="You" />
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-3">
              <form className="flex w-full items-center space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-10 flex-1 resize-none"
                />
                <Button type="submit">Send</Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}

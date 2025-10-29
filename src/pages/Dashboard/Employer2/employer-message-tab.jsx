import ChatArea from "@/components/messaging/chat-area";
import ChatSidebar from "@/components/messaging/chat-sidebar";
import { useState } from "react";

export default function EmployerMessagesTab() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatDetails, setChatDetails] = useState(null);
  return (
    <div className="flex h-screen gap-8">
      <ChatSidebar
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onSetChatDetails={setChatDetails}
      />
      <ChatArea selectedChat={selectedChat} chatDetails={chatDetails} />
    </div>
  );
}

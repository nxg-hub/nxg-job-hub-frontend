import { useState } from "react";
import { Clock, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { cn } from "../lib/utils";
import { Checkbox } from "./ui/checkbox";

const sampleNotifications = [
  {
    id: "1",
    title: "New Job Match",
    description: "A new UX Designer position at Figma matches your profile",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    type: "job",
  },
  {
    id: "2",
    title: "Application Update",
    description:
      "Your application for Product Designer at Adobe has been viewed",
    time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
    type: "application",
  },
  {
    id: "3",
    title: "Message from Recruiter",
    description: "Sarah from Google sent you a message about your application",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "message",
  },
  {
    id: "4",
    title: "Profile Reminder",
    description:
      "Complete your profile to increase your chances of getting hired",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    type: "system",
  },
  {
    id: "5",
    title: "Weekly Job Digest",
    description: "Check out the top 10 jobs that match your skills this week",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: true,
    type: "system",
  },
];

export function NotificationPanel({ className }) {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTimeString = (date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return format(date, "MMM d");
    }
  };

  return (
    <div className={cn("w-[380px] bg-white rounded-md shadow-md", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground">
              You have {unreadCount} unread notifications
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="border-none"
            onClick={markAllAsRead}>
            <Checkbox className="p-0" />
            <span>Mark all as read</span>
          </Button>
        )}
      </div>

      <ScrollArea className="h-[400px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
            <Clock className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
            <h3 className="font-medium">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up! We'll notify you when there's something new.
            </p>
          </div>
        ) : (
          <div>
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div
                  className={cn(
                    "relative p-4 hover:bg-muted/50 transition-colors",
                    !notification.read && "bg-blue-50"
                  )}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-8">
                      <h4 className="font-medium text-sm">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <span>{getTimeString(notification.time)}</span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 ml-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-transparent"
                            onClick={() => markAsRead(notification.id)}>
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border-gray-200 h-6 w-6 absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                      onClick={() => removeNotification(notification.id)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full">
          View all notifications
        </Button>
      </div>
    </div>
  );
}

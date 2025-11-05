import { useCallback, useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Briefcase, CheckCircle2, Bell } from "lucide-react";

export default function NotificationDropdown({ notifications = [] }) {
  const [notificationState, setNotificationState] = useState(notifications);

  const [showOptions, setShowOptions] = useState(false); // State for options menu

  const localNotifs = useMemo(() => {
    return window.localStorage.getItem("NXGNOTIFS") || "[]";
  }, []);
  const getReceivedNotifs = useCallback(() => {
    if (localNotifs) {
      setNotificationState(JSON.parse(localNotifs));
    }
  }, [localNotifs]);

  useEffect(() => {
    getReceivedNotifs();
  }, [getReceivedNotifs]);

  const clearNotifications = () => {
    setNotificationState([]);
    window.localStorage.removeItem("NXGNOTIFS");
    setShowOptions(false); // Hide the options menu after clearing
  };

  const markAllAsRead = () => {
    setNotificationState(
      notificationState.map((notification) => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id) => {
    setNotificationState(
      notificationState.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "new_candidate":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "new_employer_request":
        return <Briefcase className="h-4 w-4 text-green-500" />;
      case "match_confirmed":
        return <CheckCircle2 className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <DropdownMenuContent className="w-80" align="end">
      <div className="flex items-center justify-between p-4">
        <span className="text-sm font-medium">Notifications</span>
        {/* <Button variant="ghost" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button> */}
      </div>
      <DropdownMenuSeparator />

      <div className="max-h-[400px] overflow-auto">
        {notificationState.length > 0 ? (
          notificationState.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex cursor-pointer gap-4 p-4 ${
                notification.read ? "" : "bg-muted/50"
              }`}
              onClick={() => markAsRead(notification.id)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                {getNotificationIcon(notification.notificationType)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {`${
                    notification.notificationType === "JOB_POST"
                      ? "Job Post:"
                      : ""
                  }  ${notification.message}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(notification?.dateTime), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              )}
            </DropdownMenuItem>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Bell className="h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No notifications
            </p>
          </div>
        )}
      </div>

      <DropdownMenuSeparator />
      <DropdownMenuItem className="justify-center">
        <Button variant="ghost" size="sm" className="w-full">
          View all notifications
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../pages/Dashboard";
import { API_HOST_URL } from "../api/API_HOST";
import { useSelector } from "react-redux";

const useFetchNotifications = () => {
  // const { id } = useContext(UserContext);
  const id = useSelector((state) => state.AllUserReducer.userData.id);
  // console.log(id);
  const url = `${API_HOST_URL}/api/v1/auth/notifications/stream/${id}`;

  const [notifications, setNotifications] = useState(
    JSON.parse(window.localStorage.getItem("NXGNOTIFS")) || []
  );
  const fetchNotifications = async () => {
    const sse = new EventSource(url);
    sse.addEventListener("notifications", async (e) => {
      const data = await e.data;
      const receivedNotifications = JSON.parse(data);
      if (receivedNotifications.length > 0) {
        setNotifications((notifications) => {
          let notifStore = [...notifications, ...receivedNotifications];

          window.localStorage.setItem("NXGNOTIFS", JSON.stringify(notifStore));
          return notifStore;
        });
      }
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  // console.log(notifications);
  return notifications;
};
// let merged = [...notifications, ...receivedNotifications];

// // ✅ remove duplicates by ID
// let uniq = merged.reduce((acc, curr) => {
//   acc[curr.id] = curr;
//   return acc;
// }, {});

// let notifStore = Object.values(uniq);
export default useFetchNotifications;

import { useContext, useEffect, useState } from "react";
import AlertTabItem from "./NotificationItem";
import s from "./index.module.scss";
import { CiMenuKebab } from "react-icons/ci";
import { ReactComponent as Search } from "../../../src/static/icons/round-search.svg";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { UserContext } from "../../pages/Dashboard";

const NotificationTab = () => {
  const [search, setSearch] = useState("");
  const { id } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const url = `${API_HOST_URL}/api/v1/auth/notifications/stream/${id}`;

  const fetchNotifications = async () => {
    const sse = new EventSource(url);
    sse.addEventListener("notifications",(e) => {
      console.log( e);
    });
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  const showOptions = (e) => {};
  const handleSearch = (e) => {};
  return (
    <div title="" className={s.AlertTab}>
      <span>
        <div className={s.searchBar}>
          <input
            className={s.searchInput}
            type="search"
            placeholder={"Search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search onClick={handleSearch} />
        </div>
        <CiMenuKebab title={"More"} onClick={showOptions} />
      </span>
      {notifications.map((item, id) => (
        <AlertTabItem item={item} key={id} />
      ))}
    </div>
  );
};

export default NotificationTab;

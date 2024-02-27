import { useContext, useEffect, useState } from "react";
import AlertTabItem from "./NotificationItem";
import s from "./index.module.scss";
import { CiMenuKebab } from "react-icons/ci";
import { ReactComponent as Search } from "../../../src/static/icons/round-search.svg";

const NotificationTab = () => {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const localNotifs = window.localStorage.getItem("NXGNOTIFS");
  const getReceivedNotifs = () => {
    if (localNotifs) {
      setNotifications(JSON.parse(localNotifs));
    }
  };

  useEffect(() => {
    getReceivedNotifs();
    // fetchNotifications();
    
  }, [localNotifs]);
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

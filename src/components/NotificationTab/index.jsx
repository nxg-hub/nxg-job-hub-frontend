import { useEffect, useState, useCallback, useMemo } from "react";
import AlertTabItem from "./NotificationItem";
import s from "./index.module.scss";
import { CiMenuKebab } from "react-icons/ci";
import Search from "../../../src/static/icons/round-search.svg?react";

const NotificationTab = () => {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showOptions, setShowOptions] = useState(false); // State for options menu

  const localNotifs = useMemo(() => {
    return window.localStorage.getItem("NXGNOTIFS") || "[]";
  }, []);

  const getReceivedNotifs = useCallback(() => {
    if (localNotifs) {
      setNotifications(JSON.parse(localNotifs));
    }
  }, [localNotifs]);

  useEffect(() => {
    getReceivedNotifs();
    // fetchNotifications();
  }, [getReceivedNotifs]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev); // Toggle options menu visibility
  };

  const clearNotifications = () => {
    setNotifications([]);
    window.localStorage.removeItem("NXGNOTIFS");
    setShowOptions(false); // Hide the options menu after clearing
  };

  return (
      <div title="" className={s.AlertTab}>
      <span>
        <div className={s.searchBar}>
          <input
              className={s.searchInput}
              type="search"
              placeholder={"Search"}
              value={search}
              onChange={handleSearch}
          />
          <Search onClick={handleSearch} />
        </div>
        <CiMenuKebab title={"More"} onClick={toggleOptions} />
        {showOptions && (
            <div className={s.optionsMenu}>
              <button onClick={clearNotifications}>Clear Notifications</button>
            </div>
        )}
      </span>
        {notifications.map((item, id) => (
            <AlertTabItem item={item} key={id} />
        ))}
      </div>
  );
};

export default NotificationTab;


// import { useEffect, useState, useCallback, useMemo } from "react";
// import AlertTabItem from "./NotificationItem";
// import s from "./index.module.scss";
// import { CiMenuKebab } from "react-icons/ci";
// import Search from "../../../src/static/icons/round-search.svg?react";
//
// const NotificationTab = () => {
//   const [search, setSearch] = useState("");
//   const [notifications, setNotifications] = useState([]);
//
//   const localNotifs = useMemo(() => {
//     return window.localStorage.getItem("NXGNOTIFS") || "[]";
//   }, []);
//
//   const getReceivedNotifs = useCallback(() => {
//     if (localNotifs) {
//       setNotifications(JSON.parse(localNotifs));
//     }
//   }, [localNotifs]);
//
//   useEffect(() => {
//     getReceivedNotifs();
//     // fetchNotifications();
//   }, [getReceivedNotifs]);
//
//   const showOptions = (e) => {};
//   const handleSearch = (e) => {};
//   return (
//     <div title="" className={s.AlertTab}>
//       <span>
//         <div className={s.searchBar}>
//           <input
//             className={s.searchInput}
//             type="search"
//             placeholder={"Search"}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Search onClick={handleSearch} />
//         </div>
//         <CiMenuKebab title={"More"} onClick={showOptions} />
//       </span>
//       {notifications.map((item, id) => (
//         <AlertTabItem item={item} key={id} />
//       ))}
//     </div>
//   );
// };
//
// export default NotificationTab;

import { useState } from "react";
import AlertTabItem from "./AlertTabItem";
import s from "./index.module.scss";
import { BsArrowLeft } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { ReactComponent as Search } from "../../../src/static/icons/round-search.svg";

const AlertTab = ({ items, controls, ...props }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {};
  return (
    <div onClick={controls} title="" className={s.AlertTab} {...props}>
      <span>
        <BsArrowLeft onClick={controls} />
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
        <CiMenuKebab />
      </span>
      {items.map((item, id) => (
        <AlertTabItem item={item} key={id} />
      ))}
    </div>
  );
};

export default AlertTab;

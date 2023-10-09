import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../header/header.scss";
import Inputs from "../accounts/Inputs";
import { ReactComponent as Messages } from "../../static/icons/mail-unread.svg";
import { ReactComponent as Notification } from "../../static/icons/notification-new.svg";
import { ReactComponent as Profile } from "../../static/icons/profile.svg";
import { ReactComponent as Search } from "../../static/icons/round-search.svg";
import { ReactComponent as Filter } from "../../static/icons/filter.svg";
import focusParent from "../../utils/functions/focusParent";
import blurParent from "../../utils/functions/blurParent";

// const LOGIN = "Log In"
// const SIGNUP = "Sign Up"

const Navbar = () => {
  const [search, setSearch] = useState("");
  const NavLinks = [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "About", href: "/about" },
    // {title:"Contact Us", href:"/contact"},

    // {title:"Log In", href:"/logtalent"}, //Will change this route to join our community of professionals page which will later be linked to different login pages
    // {title:"Sign Up", href:"/techtalent"} //Will change this route to join our community of professionals page which will later be linked to different sign up pages
  ];

  const handleSearch = () => {};
  const filterSearch = () => {};
  return (
    <div className="navbar">
      <div className="searchBar">
        <Inputs
          className="searchInput"
          type="search"
          placeholder={"Search"}
          value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={focusParent}
                  onBlure={blurParent}
        />
        <Search onClick={handleSearch} />
        <Filter onClick={filterSearch} />
      </div>
      {NavLinks.map((link) => {
        return (
          <NavLink
            key={link.title}
            to={link.href}
            className={({ isActive }) =>
              [isActive ? "active" : "plain"].join(" ")
            }
          >
            {link.title}
          </NavLink>
        );
      })}

      <Link to="./notifications">
        <Notification />
      </Link>
      <Link to="./notifications">
        <Messages />
      </Link>
      <Link to="./notifications">
        <Profile />
      </Link>
    </div>
  );
};

export default Navbar;

import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../static/images/logo_colored.png";
import "../components/header/header.scss";
import Inputs from "../../src/components/accounts/Inputs";
import { ReactComponent as Search } from "../../src/static/icons/round-search.svg";
import { ReactComponent as Filter } from "../../src/static/icons/filter.svg";

import { ReactComponent as Messages } from "../../src/static/icons/mail-unread.svg";
import { ReactComponent as Notifications } from "../../src/static/icons/notification-new.svg";
import { ReactComponent as Profile } from "../../src/static/icons/profile.svg";
import AlertTab from "../components/AlertTab";
import notification_data from "../utils/data/notifications";
import ProfileNavbar from "../components/header/ProfileNavbar";
const titles = [
  {
    title1: "Get Started with KYC",
    span: "",
    title: "Documentation",
  },
  {
    title1: "Enjoy",
    span: "Verified",
    title: "services at your convenience",
  },
  {
    title1: "Hire a",
    span: "Professional",
    title: "Tech Talent with Ease. Enjoy",
  },
];

const ProfileLanding = () => {
  const [search, setSearch] = useState("");
  const [heroTitle, setHeroTitle] = useState(0);
  const [showAlertTab, setShowAlertTab] = useState(false);
  const [incoming, setIncoming] = useState(notification_data);

  const selectRandomTitle = useCallback(() => {
    const titleIndex = Math.floor(Math.random() * titles.length);
    setHeroTitle(titles[titleIndex]);
  }, []);
  const hideAlertTab = (e) => {
    if (e.target === e.currentTarget) setShowAlertTab(!showAlertTab);
  };
  useEffect(() => {
    const intervalTitle = setInterval(selectRandomTitle, 2500);
    return () => {
      clearInterval(intervalTitle); // Clear the interval on unmount
    };
  }, [selectRandomTitle]);
  const handleSearch = () => {};
  const filterSearch = () => {};
  const handleNotificationClick = (e) => {
    e.preventDefault();
    setShowAlertTab(!showAlertTab);
    // useFetch() we fetch notifications here and set it to incoming which we pass into the Alert Tab component
  };
  const handleMessageClick = (e) => {
    e.preventDefault();
    setShowAlertTab(!showAlertTab);
    // useFetch() we fetch messages here
  };

  return (
    <div className="profile-landing">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "80rem",
          margin: "auto",
        }}
      >
        <div className="h-logo" style={{ width: "5.5rem", height: "3.2rem" }}>
          <img src={Logo} alt="Nxg Company Logo" className="logo" />
        </div>
        <div className="searchBar">
          <Inputs
            className="searchInput"
            type="search"
            placeholder={"Search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search onClick={handleSearch} />
          <Filter onClick={filterSearch}/>
        </div>
        <ProfileNavbar />
        <div className="navIcons">
          <Link onClick={handleNotificationClick} to="./notifications">
            <Notifications />
          </Link>
          <Link onClick={handleMessageClick} to="./messages">
            <Messages />
          </Link>
          <Link to="./profile">
            <Profile />
          </Link>
        </div>

        {showAlertTab ? (
        <div
        title="close"
        onClick={hideAlertTab}
        className={"AlertTabWrapper"}
      > <AlertTab
            controls={hideAlertTab}
            items={incoming}
          /></div>
        ) : (
          <></>
        )}
      </header>
      <div
        className="profileLanding-contents"
      >
        <h1 className="land-title">
          {heroTitle.title1} {""}
          <span>{heroTitle.span}</span> {""}
          {heroTitle.title}
        </h1>
        <p>
          Get access and connect with Professionals, Tech talents, and agents in just a few clicks.
        </p>
        <div className="land-btns">
          <Link
            to={"/employerprofile"}
          >
            Complete your profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileLanding;

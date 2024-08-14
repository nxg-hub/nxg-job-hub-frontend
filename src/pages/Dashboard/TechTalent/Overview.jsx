import { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./profileMain.scss";
import { SlBell } from "react-icons/sl";
import HeroImg from "../../../static/images/tech-talent-pro-img.png";
import ProfileSearch from "./ProfileSearch";
import { TbMathGreater } from "react-icons/tb";
// import { jobs as JobRecommendations } from "../../../utils/data/job-recommendations";
import RecommendationCard from "./RecommendationCard";
// import figma from "../../../static/icons/logos_figma.svg";
import { UserContext } from "..";
import { useDispatch, useSelector } from "react-redux";
import { useApiRequest } from "../../../utils/functions/fetchEndPoint";
import spinner from "../../../static/icons/spinner.svg";
import { fetchLoggedInUser } from "../../../redux/LoggedInUserSlice";
import { API_HOST_URL } from "../../../utils/api/API_HOST";
// import DashboardProfileForm from "../../../../src/pages/Dashboard/TechTalent/DashboardProfileForm/index"

function TechTalentOverview() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const fetchNotifications = async () => {
    // Your logic to fetch notifications from the API
    const response = await fetch(
      `${API_HOST_URL}/v1/auth/notifications/stream/{userID}`
    );
    const notifications = await response.json();
    const unreadCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;
    setUnreadNotificationCount(unreadCount);
  };

  //getting nearby jobs and loggedInUser from the redux store
  const showNearByJobs = useSelector(
    (state) => state.NearbyJobSlice.displayJob
  );
  const nearByJobs = useSelector((state) => state.NearbyJobSlice.nearByJobs);
  const nearJobLoader = useSelector((state) => state.NearbyJobSlice.loading);
  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  //checking if user is verified
  const profileCompleted = loggedInUser.verified;

  //fetching recommended jobs
  const { data: recommendedJobs, loading: recommendedJobLoader } =
    useApiRequest(`/api/job-postings/${user.id}/recommend`);

  const openForm = (e) => {
    e.preventDefault();
    navigate("/techprofileform");
  };

  useEffect(() => {
    dispatch(fetchLoggedInUser());
    fetchNotifications();
  }, []);

  return (
    <main className="dash-profile-main-side">
      <div className="dash-profile-header">
        <div className="dash-profile-name">
          <p>{user.firstName || "User"}'s Dashboard</p>
        </div>
        <div className="dash-profile-pics-section">
          <div className="dash-profile-icons">
            <NavLink to="/dashboard/notifications">
              <SlBell className="dash-icons" />
              {unreadNotificationCount > 0 && (
                <span className="notification-count">
                  {unreadNotificationCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="dash-profile-search-section">
        <ProfileSearch />
      </div>
      {!profileCompleted ? (
        <div className="dash-profile-hero-section">
          <div className="dash-profile-hero-contents">
            <div className="dash-profile-content">
              <h1>Get started by Completing your Profile</h1>
              <p>
                Stand a better chance of being hired by completing your profile
              </p>
              <button onClick={openForm}>Complete Profile</button>
            </div>
          </div>
          <div className="dash-profile-hero-img">
            <img src={HeroImg} alt="A working secetary illustration" />
          </div>
        </div>
      ) : null}
      <div className="dash-profile-recommended">
        <div className="recommend-jobs-section">
          <div className="recommend-title">
            <strong>Recommended Jobs for you</strong>
          </div>

          <div className="recommend-navigation">
            <div className="recommend-icon-bg">
              <TbMathGreater className="recommend-icon" />
            </div>
          </div>
        </div>
        <div className="JobRecommendations">
          {!recommendedJobs ? (
            recommendedJobs?.map((jobRecommendation, i) => {
              // jobRecommendation.company_logo = figma;
              return <RecommendationCard key={i} {...jobRecommendation} />;
            })
          ) : (
            <div className="w-[80%] m-auto text-justify font-bold">
              <h2>No recommended Jobs at the moment</h2>
            </div>
          )}
        </div>
        <div className="recommend-jobs-section">
          <div className="recommend-title">
            <strong>Jobs near you</strong>
          </div>

          <div className="recommend-navigation">
            <div className="recommend-icon-bg">
              <TbMathGreater className="recommend-icon" />
            </div>
          </div>
        </div>
        <div className="JobRecommendations">
          {nearJobLoader ? (
            <img className="w-[20%] m-auto" src={spinner} alt="spinner" />
          ) : showNearByJobs ? (
            nearByJobs.map((jobRecommendation, i) => {
              // jobRecommendation.company_logo = figma;
              return (
                <RecommendationCard
                  key={i * 5}
                  recommendedJobs={jobRecommendation}
                />
              );
            })
          ) : (
            <div className="w-[80%] m-auto text-justify font-bold">
              <h2>Search for Jobs near you.</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default TechTalentOverview;

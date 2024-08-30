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
import { resetToDefault } from "../../../redux/FilterSlice";
import { fetchNearJob } from "../../../redux/NearbyJobSlice";
// import DashboardProfileForm from "../../../../src/pages/Dashboard/TechTalent/DashboardProfileForm/index"

function TechTalentOverview() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filtermsg, setFilterMsg] = useState(false);
  const [filteredJobType, setFilteredJobType] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

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
    (state) => state.SearchJobSlice.displayJob
  );
  const nearByJobs = useSelector((state) => state.NearbyJobSlice.nearByJobs);
  const searchedJob = useSelector((state) => state.SearchJobSlice.searchedJob);
  const searchedJobLoader = useSelector(
    (state) => state.SearchJobSlice.loading
  );
  const nearJobLoader = useSelector((state) => state.NearbyJobSlice.loading);
  const searchedJobTitle = useSelector(
    (state) => state.SearchJobSlice.jobTitle
  );

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
    if (!token.authKey) {
      navigate("/login");
      return;
    }
    dispatch(fetchLoggedInUser());
    dispatch(fetchNearJob(`/api/job-postings/recommend-nearby-jobs`));
  }, []);

  //getting the filtered job type from the redux store
  const selectedJobTypes = useSelector(
    (state) => state.FilterSlice.selectedJobTypes
  );
  const jobType = selectedJobTypes.value;
  //reseting the filter parameters to default onmount
  useEffect(() => {
    dispatch(resetToDefault());
  }, []);
  //filtering search

  useEffect(() => {
    const filteredJob = searchedJob?.filter((job) => {
      // job.job_type !== jobType ? setFilterMsg(true) : null;
      return job.job_type === jobType;
    });
    setFilteredJobType(filteredJob);
  }, [jobType, nearByJobs]);

  //storing the job url to be passed as props to the search component
  const allJobsUrl = `/api/job-postings/all`;
  //current page to be passed as prop to the search component
  const currentPage = "dashboard";
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
            </NavLink>
          </div>
        </div>
      </div>
      <div className="dash-profile-search-section">
        <ProfileSearch url={allJobsUrl} currentPage={currentPage} />
      </div>
      {!profileCompleted && (
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
      )}
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
          {!showNearByJobs && nearJobLoader ? (
            <img className="w-[20%] m-auto" src={spinner} alt="spinner" />
          ) : (
            !showNearByJobs &&
            nearByJobs
              .filter((job) => {
                return job.jobStatus === "ACCEPTED";
              })
              .map((job, i) => {
                return <RecommendationCard key={i * 5} recommendedJobs={job} />;
              })
          )}
          {searchedJobLoader && showNearByJobs ? (
            <img className="w-[20%] m-auto" src={spinner} alt="spinner" />
          ) : showNearByJobs && !jobType && searchedJobTitle ? (
            searchedJob
              ?.filter((job) => {
                return (
                  job.job_title === searchedJobTitle &&
                  job.jobStatus === "ACCEPTED"
                );
              })
              .map((jobRecommendation, i) => {
                // jobRecommendation.company_logo = figma;
                return (
                  <RecommendationCard
                    key={i * 5}
                    recommendedJobs={jobRecommendation}
                  />
                );
              })
          ) : showNearByJobs && jobType ? (
            filteredJobType.map((jobRecommendation, i) => {
              return (
                <RecommendationCard
                  key={i * 5}
                  recommendedJobs={jobRecommendation}
                />
              );
            })
          ) : filtermsg ? (
            <div className="w-[80%] m-auto text-justify font-bold">
              <h2>Could not find your search.</h2>
            </div>
          ) : (
            !nearByJobs && (
              <div className="w-[80%] m-auto text-justify font-bold">
                <h2>Search for Jobs near you.</h2>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}

export default TechTalentOverview;

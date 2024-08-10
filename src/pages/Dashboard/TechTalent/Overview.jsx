import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./profileMain.scss";
import { SlBell } from "react-icons/sl";
import HeroImg from "../../../static/images/tech-talent-pro-img.png";
import ProfileSearch from "./ProfileSearch";
import { TbMathGreater } from "react-icons/tb";
import { jobs as JobRecommendations } from "../../../utils/data/job-recommendations";
import RecommendationCard from "./RecommendationCard";
import figma from "../../../static/icons/logos_figma.svg";
import { UserContext } from "..";
import { useSelector } from "react-redux";
import { useApiRequest } from "../../../utils/functions/fetchEndPoint";
import spinner from "../../../static/icons/spinner.svg";
// import DashboardProfileForm from "../../../../src/pages/Dashboard/TechTalent/DashboardProfileForm/index"

function TechTalentOverview() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [success] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  //getting nearby jobs and loggedInUser from the redux store
  const showNearByJobs = useSelector(
    (state) => state.NearbyJobSlice.displayJob
  );
  const nearByJobs = useSelector((state) => state.NearbyJobSlice.nearByJobs);
  const nearJobLoader = useSelector((state) => state.NearbyJobSlice.loading);
  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  console.log(nearByJobs);
  // const profileCompleted = loggedInUser.verified;

  //fetching recommended jobs
  const { data: recommendedJobs, loading: recommendedJobLoader } =
    useApiRequest(`/api/job-postings/${user.id}/recommend`);
  useEffect(() => {
    // Ensure profile completion status is updated based on loggedInUser
    if (loggedInUser?.verified) {
      setProfileCompleted(true);
    }
  }, [loggedInUser]);


  const openForm = (e) => {
    e.preventDefault();
    navigate("/techprofileform");
  };

  // const handleProfileCompletion = () => {
  //   setProfileCompleted(true);
  // };

  return (
    <main className="dash-profile-main-side">
      <div className="dash-profile-header">
        <div className="dash-profile-name">
          <p>{user.firstName || "User"}'s Dashboard</p>
        </div>
        <div className="dash-profile-pics-section">
          <div className="dash-profile-icons">
            <SlBell className="dash-icons" />
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

import { useContext, useState } from "react";
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
// import DashboardProfileForm from "../../../../src/pages/Dashboard/TechTalent/DashboardProfileForm/index"

function TechTalentOverview() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [profileCompleted] = useState(false);
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
      ) : ( null )}
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
          {JobRecommendations.map((jobRecommendation, i) => {
            jobRecommendation.company_logo = figma;
            return <RecommendationCard key={i} {...jobRecommendation} />;
          })}
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
          {JobRecommendations.map((jobRecommendation, i) => {
            jobRecommendation.company_logo = figma;
            return <RecommendationCard key={i * 5} {...jobRecommendation} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default TechTalentOverview;

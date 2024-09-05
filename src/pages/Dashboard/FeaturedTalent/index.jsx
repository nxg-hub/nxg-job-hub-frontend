import React, { useEffect, useState } from "react";
import "./FeaturedTalent.scss";
import icon from "../../../static/icons/mi_filter.svg";
import { API_HOST_URL } from "../../../utils/api/API_HOST";

const talentTechStacks = [
  "All",
  "Frontend Developer",
  "UI/UX Designer",
  "Backend Developer",
  "Project Manager",
  "Data Analyst",
  "Business Analyst",
  "Scrum Master",
  "Others",
];

function FeaturedTalent() {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTalentId, setSelectedTalentId] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState("All");

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await fetch(`${API_HOST_URL}/api/talents/featured`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTalents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleViewClick = (talentId) => {
    setSelectedTalentId((prevId) => (prevId === talentId ? null : talentId));
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const handleTechStackSelect = (techStack) => {
    setSelectedTechStack(techStack);
    setFilterVisible(false);
  };

  const filteredTalents =
    selectedTechStack === "All"
      ? talents
      : talents.filter(
          (talent) => talent.talentTechStack === selectedTechStack
        );

  return (
    <div className="featured-talents-list container">
      <h2>Featured Talents</h2>
      <div className="talent-list">
        <div className="talentText">
          <div className="text">
            <h4>Tech Talents</h4>
            <h4>{selectedTechStack}</h4>
          </div>
          <div className="icon" onClick={toggleFilterVisibility}>
            <img src={icon} alt="" />
          </div>
        </div>
        {filterVisible && (
          <div className="filter-dropdown">
            {talentTechStacks.map((techStack) => (
              <div key={techStack} className="filter-item">
                <input
                  type="checkbox"
                  id={techStack}
                  name={techStack}
                  checked={selectedTechStack === techStack}
                  onChange={() => handleTechStackSelect(techStack)}
                />
                <label htmlFor={techStack}>{techStack}</label>
              </div>
            ))}
          </div>
        )}

        {filteredTalents.map((talent) => (
          <div key={talent.id} className="talent-item">
            <div className="talent-row">
              <div className="talent-info">
                <img
                  src={talent.talentProfilePic}
                  alt="talentPicture"
                  className="profile-pic"
                />
                <div className="detail">
                  <h3>{talent.talentName}</h3>
                  <h3>{talent.talentTechStack}</h3>
                </div>
              </div>
              <div
                className="view-button"
                onClick={() => handleViewClick(talent.id)}
              >
                View
              </div>
            </div>
            {selectedTalentId === talent.id && (
              <div className="talent-detail">
                <h3>{talent.talentName}</h3>
                <h4>{talent.talentTechStack}</h4>
                <img src={talent.talentProfilePic} alt="Talent" />
                <a
                  href={talent.talentResume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedTalent;

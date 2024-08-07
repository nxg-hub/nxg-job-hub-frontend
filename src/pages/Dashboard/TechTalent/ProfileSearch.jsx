import React, { useState } from "react";
import Select, { components } from "react-select";
import { relevance } from "../../../utils/data/tech-talent";
import DashboardSearch from "./DashboardSearch";
import SearchJobCard from "./SearchJobCard";
import { useSelector } from "react-redux";

function ProfileSearch() {
  const [selectedRelevance, setSelectedRelevance] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  // const nearJobLoader = useSelector((state) => state.NearbyJobSlice.loading);
  const handleJobFetched = (fetchedJobs) => {
    // Apply search filtering only if there's a search term
    const filteredJobs =
      search || locationSearch
        ? fetchedJobs.filter(
            (job) =>
              job.job_title.toLowerCase().includes(search.toLowerCase()) ||
              job.job_location
                .toLowerCase()
                .includes(locationSearch.toLowerCase())
          )
        : fetchedJobs;
    setJobs(filteredJobs);
  };

  const handleSearchChange = (searchTerm) => {
    setSearch(searchTerm);
  };

  const handleLocationChange = (locationTerm) => {
    setLocationSearch(locationTerm);
  };

  const CheckboxOption = (props) => (
    <div>
      <components.Option {...props} className="check-section">
        <input
          type="checkbox"
          className="dash-checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label className="label-option">{props.label}</label>
      </components.Option>
    </div>
  );

  const relevanceOptions = relevance.map((relevanceType) => ({
    value: relevanceType,
    label: relevanceType,
  }));
  const handleMultiSelectRelevance = (selectedOptions) => {
    setSelectedRelevance(selectedOptions);
  };

  return (
    <div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "500",
          marginBottom: ".5rem",
          color: "rgba(0, 0, 0, 0.47)",
        }}>
        Search for Jobs
      </p>
      <div className="profile-search-container">
        <div className="profile-search-wrapper">
          <DashboardSearch
            onJobsFetched={handleJobFetched}
            onSearchChange={handleSearchChange}
            onLocationChange={handleLocationChange}
          />
          <div className="relevance-section" id="relevance">
            <label className="sort">sort by</label>
            <Select
              options={relevanceOptions}
              isMulti
              components={{ Option: CheckboxOption }}
              onChange={handleMultiSelectRelevance}
              value={selectedRelevance}
              className="relevance-select"
              placeholder="Relevance"
            />
          </div>
        </div>
      </div>
      {jobs.length !== 0 && (
        <div className={`fetch-jobs h-[300px] bg-blue-200 overflow-scroll `}>
          {jobs
            .filter((job) => {
              const titleMatch =
                search === "" ||
                job.job_title.toLowerCase().includes(search.toLowerCase());
              const locationMatch =
                locationSearch === "" ||
                job.job_location
                  .toLowerCase()
                  .includes(locationSearch.toLowerCase());
              return titleMatch && locationMatch;
            })
            .map((job, index) => {
              return (
                <SearchJobCard
                  key={index}
                  job={job}
                  location={job.job_location}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default ProfileSearch;

import React, { useState } from "react";
import Select, { components } from "react-select";
import axios from "axios";
import { MdOutlineSearch, MdOutlineLocationOn } from "react-icons/md";
import { jobTypes, levels } from "../../../utils/data/tech-talent";
import { API_HOST_URL } from "../../../utils/api/API_HOST";
import { useDispatch, useSelector } from "react-redux";
import { showOptions } from "../../../redux/NearbyJobSlice";
import {
  setSelectedJobTypes,
  setSelectedLevels,
} from "../../../redux/FilterSlice";
import { useNavigate } from "react-router-dom";

function DashboardSearch({
  onJobsFetched,
  onSearchChange,
  onLocationChange,
  url,
}) {
  // const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  // const [selectedLevels, setSelectedLevels] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedJobTypes = useSelector(
    (state) => state.FilterSlice.selectedJobTypes
  );
  const selectedLevels = useSelector(
    (state) => state.FilterSlice.selectedLevels
  );
  const baseUrl = `${API_HOST_URL}${url}`;
  // const baseUrl = 'http://localhost:8000/posts';

  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const fetchedJobs = () => {
    if (!token.authKey) {
      navigate("/login");
      return;
    }
    setLoading(true);
    axios
      .get(baseUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token.authKey,
        },
      })
      .then((response) => {
        const jobsArray = !response.data.content
          ? response.data
              .filter((job) => {
                return job.jobStatus === "ACCEPTED";
              })
              .map((job) => ({
                job_title: job.job_title,
                job_location: job.job_location,
              }))
          : response.data.content
              .filter((job) => {
                return job.jobStatus === "ACCEPTED";
              })
              .map((job) => ({
                job_title: job.jobPosting.job_title,
                job_location: job.jobPosting.job_location,
              }));
        // console.log(jobsArray);
        // Update's the fetched jobs
        onJobsFetched(jobsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occured fetching data:", error);
      });
  };
  // fetchedJobs();
  const handleSearchJobs = () => {
    dispatch(showOptions());
    if (search === "" || locationSearch === "") {
      fetchedJobs("");
    } else {
      fetchedJobs(search || locationSearch);
    }
  };

  const handleJobSearch = (e) => {
    const searchJob = e.target.value;
    setSearch(searchJob);
    if (searchJob.trim() === "") {
      onJobsFetched([]);
    } else {
      onSearchChange(searchJob);
    }
  };

  const handleLocationSearch = (e) => {
    const job_location = e.target.value;
    setLocationSearch(job_location);
    if (job_location.trim() === "") {
      onJobsFetched([]);
    } else {
      onLocationChange(job_location);
    }
  };

  const CheckboxOption = (props) => (
    <components.Option {...props} className="check-section">
      <input
        type="checkbox"
        className="dash-checkbox"
        checked={props.isSelected}
        onChange={() => null}
      />
      <label className="label-option">{props.label}</label>
    </components.Option>
  );

  const levelOptions = levels.map((level) => ({
    value: level,
    label: level,
  }));
  const handleMultiSelectLevels = (selectedOptions) => {
    // setSelectedLevels(selectedOptions);
    dispatch(setSelectedLevels(selectedOptions));
  };

  const jobTypeOptions = jobTypes.map((jobType) => ({
    value: jobType,
    label: jobType,
  }));
  const handleMultiSelectJobTypes = (selectedOptions) => {
    // setSelectedJobTypes(selectedOptions);
    dispatch(setSelectedJobTypes(selectedOptions));
  };

  return (
    <>
      <div className="profile-search-section" id="profile-search">
        <div className="dash-search-section">
          <MdOutlineSearch className="dash-search-icon" />
          <input
            type="search"
            placeholder="Search jobs"
            className="dash-search-input"
            onChange={handleJobSearch}
            value={search}
          />
        </div>
        <div className="dash-location">
          <MdOutlineLocationOn className="dash-location-icon" />
          <input
            type="search"
            placeholder="Location"
            className="dash-location-input"
            onChange={handleLocationSearch}
            value={locationSearch}
          />
        </div>
        <div className="dash-employ-type">
          <Select
            id="employ-select"
            options={jobTypeOptions}
            // isMulti
            components={{ Option: CheckboxOption }}
            onChange={handleMultiSelectJobTypes}
            value={selectedJobTypes}
            placeholder="Employment type"
          />
        </div>
        <div className="dash-level">
          <Select
            className="level-select"
            options={levelOptions}
            // isMulti
            components={{ Option: CheckboxOption }}
            onChange={handleMultiSelectLevels}
            value={selectedLevels}
            placeholder="Experience level"
          />
        </div>
        <div className="dash-search-btn">
          <button onClick={handleSearchJobs}>
            {loading ? "Loading...." : "Search Jobs"}
          </button>
        </div>
      </div>
    </>
  );
}
export default DashboardSearch;

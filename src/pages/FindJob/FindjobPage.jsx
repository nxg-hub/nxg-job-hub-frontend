import React, { useState, useEffect } from "react";
import "./FindJob.scss";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import avater from "../../static/images/user.png";
import Logo from "../../static/images/nxg-logo.png";
import Footer from "../../components/footer/Footer";

const FindjobPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobsResult, setJobsResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL =
    "https://nxg-job-hub-8758c68a4346.herokuapp.com/api/job-postings/all?page=0&size=1&sort=string";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setJobsResult(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = jobsResult.filter((job) =>
      job.job_title.toLowerCase().includes(searchValue)
    );
    setFilteredJobs(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredJobs(jobsResult);
  };

  const filteredJobs =
    searchTerm && jobsResult.length > 0
      ? jobsResult.filter((job) =>
          job.job_title.toLowerCase().includes(searchTerm)
        )
      : jobsResult;

  return (
    <div className="jobfinder">
      <div className="header">
        <div className="h-logo" style={{ width: "160px", height: "65px" }}>
          <Link to="/">
            {" "}
            <img src={Logo} alt="Nxg Company Logo" className="logo" />
          </Link>
        </div>
        <div className="searchFilter">
          <input
            className="input"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IoSearchOutline className="search-icon" />
          {searchTerm && (
            <button className="clear-button" onClick={handleClearSearch}>
              Clear
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <p className="loading">Loading jobs...</p>
      ) : (
        <>
          {filteredJobs.length > 0 && (
            <div className="job-results">
              {filteredJobs.map((data) => (
                <div className="jobPost" key={data.id}>
                  <div className="employer-img">
                    <div className="user-img">
                      <img src={data.employer_profile_pic || avater} alt="" />
                    </div>
                    <div className="employer-details">
                      <h4 className="name">
                        <b>{data.employer_name || "Kristy Haag"}</b>
                      </h4>
                      <h2>Employer</h2>
                    </div>{" "}
                  </div>
                  <div className="details">
                    <div className="jobDetails">
                      <h3>
                        <b>Job Category:</b> {data.job_title}
                      </h3>
                      <h3>
                        <b>Budget:</b> {data.salary}
                      </h3>
                      <h3 className="descb">
                        <b>Description:</b> {data.job_description}
                      </h3>
                      <Link to="/login" className="linkMore">
                        See More
                      </Link>
                    </div>

                    <div className="btns">
                      <Link to="/login">
                        <button className="btnA">Apply</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {filteredJobs.length === 0 && searchTerm && (
            <p className="no-results">No jobs found for "{searchTerm}"</p>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default FindjobPage;

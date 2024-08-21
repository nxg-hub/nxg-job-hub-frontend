import React, { useState, useEffect } from "react";
import JobCard from "./_components/card";
import CardDetails from "./_components/card-details";
import Successfull from "./_components/successfull";
import { API_HOST_URL } from "../../../utils/api/API_HOST.js";
import ProfileSearch from "../TechTalent/ProfileSearch.jsx";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../../static/icons/spinner.svg";
import { resetJobDisplay } from "../../../redux/NearbyJobSlice.js";
import { fetchLoggedInUser } from "../../../redux/LoggedInUserSlice.js";
import {
  closeModaljobListing,
  setNoticeFalsejobListing,
} from "../../../redux/JobListingApplicationSlice.js";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [successfull, setSuccessfull] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //getting nearby jobs and loggedInUser from the redux store
  const showSearchedJobs = useSelector(
    (state) => state.NearbyJobSlice.showJobListing
  );
  const nearByJobs = useSelector((state) => state.NearbyJobSlice.nearByJobs);
  const nearJobLoader = useSelector((state) => state.NearbyJobSlice.loading);
  //application states from redux store
  const success = useSelector(
    (state) => state.JobListingApplicationSlice.successJobListing
  );
  const applyloader = useSelector(
    (state) => state.JobListingApplicationSlice.jobListingLoader
  );
  const applyError = useSelector(
    (state) => state.JobListingApplicationSlice.error
  );
  const notice = useSelector(
    (state) => state.JobListingApplicationSlice.notice
  );
  //searched term to fitered
  const searchedJobTitle = useSelector(
    (state) => state.NearbyJobSlice.jobTitle
  );
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_HOST_URL}/api/job-postings/all`);
      response.ok ? setLoading(false) : null;
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(fetchLoggedInUser());
    dispatch(resetJobDisplay());
    fetchData();
  }, []);

  const handleCardClick = (job) => {
    setSelectedCardId(job.jobId);
    setShowDetails(true);
  };
  const closeNoticeModal = () => {
    dispatch(setNoticeFalsejobListing());
  };
  const close = () => {
    dispatch(closeModaljobListing());
  };

  const handleClose = () => {
    setShowDetails(false);
    // setSuccessfull(true);
  };
  console.log(nearByJobs);
  //storing the job url to be passed as props to the search component
  const allJobsUrl = `/api/job-postings/all`;
  //current page to be passed as prop to the search component
  const currentPage = "jobListing";
  return (
    <div className="dash-profile-main-side relative">
      <div className="dash-profile-search-section">
        <ProfileSearch url={allJobsUrl} currentPage={currentPage} />
      </div>
      <div className="">
        {(showDetails || successfull) && (
          <div
            onClick={() => {
              setShowDetails(false) || setSuccessfull(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        )}
        {showDetails && (
          <div className="fixed lg:absolute z-50 w-full lg:w-1/2 h-full overflow-auto lg:top-[8%] bottom-[0%] lg:left-[25%]">
            <CardDetails
              job={jobs.find((job) => job.jobId === selectedCardId)}
              onClose={handleClose}
            />
          </div>
        )}
        {successfull && (
          <div className="fixed lg:absolute z-50 w-full lg:w-1/2 bottom-0 lg:top-[20%] lg:left-[25%]">
            <Successfull onClose={() => setSuccessfull(false)} />
          </div>
        )}

        {loading || (applyloader && !showSearchedJobs) ? (
          <img
            className="w-[30%] absolute left-[35%]"
            src={spinner}
            alt="spinner"
          />
        ) : (
          !showSearchedJobs && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 px-2 lg:px-10 gap-6">
              {jobs.map((job, i) => (
                <JobCard
                  key={i}
                  job={job}
                  handleShowDetails={() => handleCardClick(job)}
                />
              ))}
            </div>
          )
        )}
        {nearJobLoader ? (
          <img
            className="w-[30%] absolute left-[35%]"
            src={spinner}
            alt="spinner"
          />
        ) : (
          showSearchedJobs && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 px-2 lg:px-10 gap-6">
              {nearByJobs
                ?.filter((job) => {
                  return job.job_title === searchedJobTitle;
                })
                .map((job, i) => (
                  <JobCard
                    key={i}
                    job={job}
                    handleShowDetails={() => handleCardClick(job)}
                    // handleApply={handleApply}
                  />
                ))}
            </div>
          )
        )}
        {success && (
          <>
            <Successfull onClose={close} />
            <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
          </>
        )}
        {notice && (
          <>
            <div className="absolute top-[100px] md:text-xl right-[20%] w-[70%] px-3 rounded-md md:w-[50%] m-auto bg-blue-200 z-30 h-[130px] md:h-[100px] py-5 text-center">
              <h2 className="font-bold">
                User is not Verified, Please Complete your Profile and Try Again
              </h2>
              <span
                onClick={closeNoticeModal}
                className="cursor-pointer font-bold relative bottom-[90px] left-[100px] md:left-[50%] md:bottom-[75px] lg:left-[45%] lg:bottom-[50px] text-red-600"
              >
                x
              </span>
            </div>
            <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
          </>
        )}
      </div>
    </div>
  );
};

export default JobListings;

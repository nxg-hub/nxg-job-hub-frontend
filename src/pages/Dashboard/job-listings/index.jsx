import React, { useState, useEffect } from "react";
import JobCard from "./_components/card";
import CardDetails from "./_components/card-details";
import Successfull from "./_components/successfull";
import "./searchBar.scss";
import { API_HOST_URL } from "../../../utils/api/API_HOST.js";
import ProfileSearch from "../TechTalent/ProfileSearch.jsx";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../../../static/icons/spinner.svg";
import { resetJobDisplay } from "../../../redux/SearchJobSlice.js";
import { fetchLoggedInUser } from "../../../redux/LoggedInUserSlice.js";
import {
  closeErrorModaljobListing,
  closeModaljobListing,
  setMultiApplyErrFalse,
  setNoticeFalsejobListing,
} from "../../../redux/JobListingApplicationSlice.js";
import AppErrorMessage from "../TechTalent/RecommendationCard/AppErrorMessage.jsx";
import { useNavigate } from "react-router-dom";

const JobListings = () => {
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const [jobs, setJobs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [successfull, setSuccessfull] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //getting nearby jobs and loggedInUser from the redux store
  const showSearchedJobs = useSelector(
    (state) => state.SearchJobSlice.showJobListing
  );
  const searchedJob = useSelector((state) => state.SearchJobSlice.searchedJob);
  const searchJobLoader = useSelector((state) => state.SearchJobSlice.loading);

  //getting the filtered job type from the redux store
  const selectedJobTypes = useSelector(
    (state) => state.FilterSlice.selectedJobTypes
  );
  const jobType = selectedJobTypes.value;
  //application states from redux store
  const success = useSelector(
    (state) => state.JobListingApplicationSlice.successJobListing
  );
  const applyloader = useSelector(
    (state) => state.JobListingApplicationSlice.jobListingLoader
  );
  const applyError = useSelector(
    (state) => state.JobListingApplicationSlice.jobListingerror
  );
  const multipleApplication = useSelector(
    (state) => state.JobListingApplicationSlice.multiApplyErr
  );
  const multiError = useSelector(
    (state) => state.JobListingApplicationSlice.multipleJobListingApp
  );
  const notice = useSelector(
    (state) => state.JobListingApplicationSlice.notice
  );
  //searched term to fitered
  const searchedJobTitle = useSelector(
    (state) => state.SearchJobSlice.jobTitle
  );
  const fetchData = async () => {
    if (!token.authKey) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_HOST_URL}/api/job-postings/all`);
      response.ok ? setLoading(false) : null;
      const data = await response.json();
      const accepted = data.filter((job) => job.jobStatus === "ACCEPTED");
      setJobs(accepted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobType = jobs.filter((job) => {
    return job.job_type === jobType;
  });
  const filteredSearch = searchedJob?.filter((job) => {
    return job.job_title === searchedJobTitle && job.job_type === jobType;
  });
  useEffect(() => {
    if (!token.authKey) {
      navigate("/login");
      return;
    }
    dispatch(fetchLoggedInUser());
    dispatch(resetJobDisplay());
    fetchData();
  }, []);

  const handleCardClick = (job) => {
    setSelectedCardId(job.jobID);
    setShowDetails(true);
  };
  const closeNoticeModal = () => {
    dispatch(setNoticeFalsejobListing());
  };
  const close = () => {
    dispatch(closeModaljobListing());
  };
  const closeErr = () => {
    dispatch(closeErrorModaljobListing());
  };

  const handleClose = () => {
    setShowDetails(false);
    // setSuccessfull(true);
  };

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
        {showDetails && (
          <>
            <div className="fixed lg:relative m-auto left-[15%] z-50 w-full lg:w-1/2 h-full overflow-auto lg:top-[8%] bottom-[0%] lg:left-[1%]">
              <CardDetails
                job={jobs.find((job) => job.jobID === selectedCardId)}
                onClose={handleClose}
              />
            </div>
            <div
              onClick={handleClose}
              className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
            />
          </>
        )}
        {/* {successfull && (
          <div className="fixed lg:relative z-50 w-full lg:w-1/2 bottom-0 lg:top-[20%] lg:left-[25%]">
            <Successfull onClose={() => setSuccessfull(false)} />
          </div>
        )} */}

        {loading || (applyloader && !showSearchedJobs) ? (
          <img
            className="w-[30%] absolute left-[35%]"
            src={spinner}
            alt="spinner"
          />
        ) : (
          !showSearchedJobs && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 px-2 lg:px-10 gap-6">
              {!jobType
                ? jobs.map((job, i) => (
                    <JobCard
                      key={i}
                      job={job}
                      handleShowDetails={() => handleCardClick(job)}
                    />
                  ))
                : jobType && filteredJobType.length > 0
                ? filteredJobType.map((job, i) => (
                    <JobCard
                      key={i}
                      job={job}
                      handleShowDetails={() => handleCardClick(job)}
                    />
                  ))
                : !filteredJobType.length > 0 && (
                    <p className="font-bold capitalize text-center">
                      No jobs found.
                    </p>
                  )}
            </div>
          )
        )}
        {searchJobLoader ? (
          <img
            className="w-[30%] absolute left-[35%]"
            src={spinner}
            alt="spinner"
          />
        ) : (
          showSearchedJobs && (
            //display searched jobs
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 px-2 lg:px-10 gap-6">
              {!jobType
                ? searchedJob
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
                    ))
                : filteredSearch.length > 0 && jobType
                ? filteredSearch.map((job, i) => (
                    <JobCard
                      key={i}
                      job={job}
                      handleShowDetails={() => handleCardClick(job)}
                      // handleApply={handleApply}
                    />
                  ))
                : !filteredSearch.length > 0 && (
                    <p className="font-bold capitalize text-center">
                      No jobs found.
                    </p>
                  )}
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
                User is not Verified, Please Complete your Profile and Try
                Again.<br></br>
                If you have completed profile, please wait while we verify you.
              </h2>
              <span
                onClick={closeNoticeModal}
                className="cursor-pointer font-bold relative bottom-[90px] left-[100px] md:left-[50%] md:bottom-[75px] lg:left-[45%] lg:bottom-[50px] text-red-600">
                x
              </span>
            </div>
            <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
          </>
        )}
        {applyError && !multipleApplication && (
          <>
            <AppErrorMessage onClose={closeErr} />
            <div
              onClick={() => {
                closeErr;
              }}
              className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
            />
          </>
        )}
        {!applyloader && multipleApplication && (
          <>
            <div
              className={` bg-white z-30 absolute top-[300px] left-[10%] md:left-[20%] w-[80%] md:w-[60%] m-auto  rounded-[24px] text-base font-medium px-10 py-5`}>
              <div className="flex items-center gap-y-3 text-center justify-center flex-col">
                <div className="flex items-center gap-x-1">
                  <span className="text-xl">
                    You have already applied to this job. Multiple applications
                    are not allowed.
                  </span>
                </div>

                <button
                  onClick={() => {
                    dispatch(setMultiApplyErrFalse());
                  }}
                  className="w-1/2 py-2  bg-[#2596BE] text-white">
                  Close
                </button>
              </div>
            </div>
            <div
              onClick={() => {
                dispatch(setMultiApplyErrFalse());
              }}
              className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default JobListings;

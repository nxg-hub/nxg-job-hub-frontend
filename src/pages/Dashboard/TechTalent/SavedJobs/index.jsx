import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";
import spinner from "../../../../static/icons/spinner.svg";
import SavedJobCard from "./SavedJobCard";
import { useEffect, useState } from "react";
import SavedJobDetails from "./SavedJobCard/SavedJobDetails";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import { useDispatch, useSelector } from "react-redux";
import Successfull from "../../job-listings/_components/successfull";
import {
  applyForJob,
  closeModal,
  getCurrentAppPage,
  setNoticeFalse,
} from "../../../../redux/TalentApplicationSlice";
import { fetchLoggedInUser } from "../../../../redux/LoggedInUserSlice";
import AppErrorMessage from "../RecommendationCard/AppErrorMessage";
import ProfileSearch from "../ProfileSearch";
import { resetToDefault } from "../../../../redux/FilterSlice";
import { getCurrentPage } from "../../../../redux/NearbyJobSlice";

const SavedJobs = () => {
  //fetching saved job
  const {
    data: savedJob,
    loading,
    error,
  } = useApiRequest("/api/v1/tech-talent/my-jobs");
  const saved = savedJob.content;
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [filterMsg, setFilterMsg] = useState(false);

  const success = useSelector(
    (state) => state.TalentApplicationSlice.successSaved
  );
  const loader = useSelector((state) => state.TalentApplicationSlice.loading);
  const applyError = useSelector((state) => state.TalentApplicationSlice.error);
  const notice = useSelector((state) => state.TalentApplicationSlice.notice);
  const showSearchedJobs = useSelector(
    (state) => state.NearbyJobSlice.showJobListing
  );
  const nearByJobs = useSelector((state) => state.NearbyJobSlice.nearByJobs);
  const nearJobLoader = useSelector((state) => state.NearbyJobSlice.loading);
  const showSavedJob = useSelector(
    (state) => state.NearbyJobSlice.showSavedJob
  );

  const handleCardClick = (id) => {
    setSelectedCardId(id);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  const closeNoticeModal = () => {
    dispatch(setNoticeFalse());
  };
  const close = () => {
    dispatch(closeModal());
  };
  //getting the filtered job type from the redux store
  const selectedJobTypes = useSelector(
    (state) => state.FilterSlice.selectedJobTypes
  );
  const jobType = selectedJobTypes.value;
  //reseting the filter parameters to default onmount and getting current page
  const currentPage = "saved";
  useEffect(() => {
    dispatch(getCurrentPage(currentPage));
    dispatch(resetToDefault());
  }, []);

  //storing the job url to be passed as props to the search component
  const savedJobUrl = `/api/v1/tech-talent/my-jobs`;
  //searched term to fitered
  const searchedJobTitle = useSelector(
    (state) => state.NearbyJobSlice.jobTitle
  );

  return (
    <div className="dash-profile-main-side">
      <div className="dash-profile-search-section">
        <ProfileSearch url={savedJobUrl} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 px-2 lg:px-10 gap-6 w-full">
        {loading ? (
          <img
            className="w-[30%] absolute left-[45%]"
            src={spinner}
            alt="spinner"
          />
        ) : !loading && error ? (
          <div className="w-[80%] m-auto mt-[400px] text-xl md:text-2xl">
            <h2>
              Something went wrong, check internet connection and try again
            </h2>
          </div>
        ) : loader ? (
          <img
            className="w-[30%] absolute left-[45%]"
            src={spinner}
            alt="spinner"
          />
        ) : !loader && error ? (
          <div className="w-[80%] m-auto mt-[400px] text-xl md:text-2xl">
            <h2>
              Something went wrong, check internet connection and try again
            </h2>
          </div>
        ) : !jobType ? (
          saved?.map((job) => (
            <SavedJobCard
              job={job.jobPosting}
              key={job.id}
              onClick={() => handleCardClick(job.id)}
            />
          ))
        ) : (
          saved
            ?.filter((job) => {
              return job.jobPosting.job_type === jobType;
            })
            .map((job) => (
              <SavedJobCard
                job={job.jobPosting}
                key={job.id}
                onClick={() => handleCardClick(job.id)}
              />
            ))
        )}
        {/* {nearJobLoader ? (
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
                .map((job) => (
                  <SavedJobCard
                    job={job}
                    key={job.id}
                    onClick={() => handleCardClick(job.id)}
                  />

                  // handleApply={handleApply}
                ))}
            </div>
          )
        )} */}

        {showDetails && (
          <div className="fixed lg:absolute z-50 w-full lg:w-1/2 h-full overflow-auto lg:top-[8%] bottom-[0%] lg:left-[25%]">
            <SavedJobDetails
              details={saved.find((job) => job.id === selectedCardId)}
              onClose={handleClose}
            />
          </div>
        )}
        {showDetails && (
          <div
            onClick={() => {
              setShowDetails(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        )}
        {loader && (
          <img
            className="w-[30%] absolute left-[45%]"
            src={spinner}
            alt="spinner"
          />
        )}
        {notice && (
          <>
            <div className="absolute top-[100px] md:text-xl right-[20%] w-[50%] px-3 rounded-md md:w-[50%] m-auto bg-blue-200 z-30 h-[130px] md:h-[100px] py-5 text-center">
              <h2 className="font-bold">
                User is not Verified, Please Complete your Profile and Try Again
              </h2>
              <span
                onClick={closeNoticeModal}
                className="cursor-pointer font-bold relative bottom-[90px] left-[80px] md:left-[50%] md:bottom-[75px] lg:left-[45%] lg:bottom-[50px] text-red-600">
                x
              </span>
            </div>
            <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
          </>
        )}
        {success && (
          <>
            <Successfull onClose={close} />
            <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
          </>
        )}
        {applyError && (
          <>
            <AppErrorMessage />
            <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
          </>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;

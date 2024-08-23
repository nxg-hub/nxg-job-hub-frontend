import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getJobTitle,
  searchJob,
} from "../../../redux/SearchJobSlice";
import { closeOptions } from "../../../redux/NearbyJobSlice";

function SearchJobCard({ job, currentPage }) {
  const dispatch = useDispatch();
  const fetchNearbyJob = () => {
    dispatch(getJobTitle(job.job_title));
    dispatch(getCurrentPage(currentPage));
    dispatch(closeOptions());
    dispatch(
      searchJob(
        `/api/job-postings/search-nearby-jobs?userCity=${job.job_location}`
      )
    );
  };

  return (
    <div
      onClick={fetchNearbyJob}
      className={`job-card-body cursor-pointer w-[95%] m-auto`}>
      <div className="job-card-title">
        <p>{job.job_title}</p> - <p>{job.job_location}</p>
      </div>
    </div>
  );
}

export default SearchJobCard;

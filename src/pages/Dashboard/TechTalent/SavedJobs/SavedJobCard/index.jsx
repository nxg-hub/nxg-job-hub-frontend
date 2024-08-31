import { Link } from "react-router-dom";
import ApplyBtn from "../../RecommendationCard/ApplyBtn";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  applyForJob,
  closeModal,
  setNoticeTrue,
} from "../../../../../redux/TalentApplicationSlice";
import Successfull from "../../../job-listings/_components/successfull";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";

const SavedJobCard = ({ job, onClick }) => {
  const [jobPostingId] = useState({
    jobPostingId: job?.jobID,
  });
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  const isVerified = loggedInUser.verified;

  const apply = () => {
    isVerified
      ? dispatch(applyForJob(jobPostingId))
      : dispatch(setNoticeTrue());
  };
  const { data: applicantCount } = useApiRequest(
    `/api/employers/${job.jobID}/applicants/count`
  );
  return (
    <div className="px-6 bg-white py-4 hover:scale-95 transition-all ease-in">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <div className="items-center gap-x-2 flex">
            <img
              className="w-[50px] h-[50px]"
              src={job?.employer_profile_pic}
              alt="logo"
            />
            <div className="flex flex-col">
              <span className="font-bold md:text-xl">{job?.company}</span>
              <div className="flex items-center gap-x-2">
                <img src="/dashboard/location.png" alt="location" />
                <span className="md:text-sm font-medium text-[#444444] capitalize">
                  {job?.job_location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex hover:cursor-pointer items-center gap-x-2 border border-[#2596BE] text-[#2596BE] rounded-[5px] px-4 text-sm">
            <img src="/dashboard/save.png" alt="save" />
            <span>Save</span>
          </div>
        </div>

        <span className="font-medium md:text-lg capitalize">
          {job?.job_title}
        </span>

        <span className="text-base font-normal text-[#263238]">
          {job?.job_description.slice(0, 80)}.....
        </span>

        <div className="flex gap-x-2">
          <span className="border border-[#215E7D] rounded-[8px] p-1 text-[#215E7D]">
            {job.job_type}
          </span>
          {/* <span className="border border-[#215E7D] rounded-[8px] p-1 text-[#215E7D]">
            {!job.job_type && "On-site"}
          </span> */}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <img src="/dashboard/pay.png" alt="pay" />
            <span className="font-medium md:text-sm">
              {formatter.format(job?.salary)}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-3 items-center font-normal text-xs">
              <img src="/dashboard/view.png" alt="views" />
              <span>{job?.views} views</span>
              <span>
                Applicants:<span className="font-bold">{}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 group" onClick={onClick}>
              <Link className="underline underline-[#215E7D] underline-offset-4 text-[#215E7D]">
                See more
              </Link>
              <img
                src="/dashboard/right-arrow.png"
                alt="see more"
                className="group-hover:translate-x-2 transition-all ease-in-out"
              />
            </div>
          </div>
        </div>

        <button
          className="bg-[#2596BE] my-4 py-2 rounded-[8px] hover:scale-95 transition-all ease-in text-white"
          onClick={apply}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default SavedJobCard;

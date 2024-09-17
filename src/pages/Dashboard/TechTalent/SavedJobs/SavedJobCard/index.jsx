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
import moment from "moment/moment";

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
  //getting date job was posted
  const jobPostDate = moment(job.createdAt).format("YYYY-MM-DD");
  //getting current date
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  //setting current date
  const currentDate = `${year}-${month < 10 ? "0" : null}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
  let date1 = new Date(currentDate);
  let date2 = new Date(jobPostDate);

  // Calculating the time difference
  // of two dates
  let Difference_In_Time = date1.getTime() - date2.getTime();

  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
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
          <h2 className="text-xs font-medium uppercase pt-3">
            Posted
            <span className="pl-1">
              {Difference_In_Days < 7
                ? `${Difference_In_Days} days ago`
                : Difference_In_Days > 6
                ? `${Math.round(Difference_In_Days / 7)} Weeks Ago`
                : jobPostDate}
            </span>
          </h2>
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

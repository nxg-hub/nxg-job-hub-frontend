import React, { useState } from "react";
import SaveBtn from "../../../TechTalent/RecommendationCard/saveBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  applyInJobListing,
  setMultiApplyErrTrue,
  setNoticeTruejobListing,
} from "../../../../../redux/JobListingApplicationSlice";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import moment from "moment";

const CardDetails = ({ job, onClose }) => {
  const [jobPostingId] = useState({
    jobPostingId: job.jobID,
  });
  const dispatch = useDispatch();

  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  const isVerified = loggedInUser.verified;

  const apply = () => {
    onClose();
    isVerified
      ? dispatch(applyInJobListing(jobPostingId)) &&
        dispatch(setMultiApplyErrTrue())
      : dispatch(setNoticeTruejobListing());
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
    <div className=" bg-white px-4 w-[80%] lg:w-full  lg:px-10 py-5">
      <div className="flex w-full m-auto gap-y-4 flex-col">
        <div className="flex w-full justify-between">
          <div className="items-center gap-x-2 flex">
            <img
              className="w-[50px] h-[50px]"
              src={job.employer_profile_pic}
              alt="logo"
            />
            <div className="flex flex-col capitalize">
              <span className="font-bold md:text-xl">
                {job.employer_name || "Employer"}
              </span>
              <div className="flex items-center gap-x-2">
                <img src="/dashboard/location.png" alt="location" />
                <span className="md:text-sm font-medium text-[#444444]">
                  {job.job_location}
                </span>
              </div>
            </div>
          </div>
          {/* <div className="flex hover:cursor-pointer items-center gap-x-2 border border-[#2596BE] text-[#2596BE] rounded-[5px] px-4 text-sm">
            <SaveBtn />
          </div> */}
        </div>

        <div className="flex gap-y-1 flex-col">
          <span className="font-medium md:text-xl capitalize">
            {job.job_title}
          </span>
          <div className="flex text-[#263238] gap-x-3 items-center font-normal md:text-sm text-xs">
            <img src="/dashboard/users.png" alt="views" />
            <span>{job.employees} employees</span>
          </div>
          <div className="flex gap-x-3 text-[#263238] items-center font-normal md:text-sm text-xs">
            <img src="/dashboard/view.png" alt="views" />
            <span>{job.views} views</span>
            <span>
              Applicants:<span className="font-bold">{applicantCount}</span>
            </span>
          </div>
          <div className="flex gap-x-3 text-[#263238] items-center font-normal md:text-sm text-xs">
            <img src="/dashboard/brief.png" alt="views" />
            {job.job_type && <span>{job.job_type}</span>}
            {/* {job.status && <span>onsite</span>} */}
          </div>
          <h2 className="text-xs font-medium uppercase">
            Posted
            <span className="pl-1">
              {Difference_In_Days < 7
                ? `${Difference_In_Days} days ago`
                : Difference_In_Days > 6
                ? `${Math.round(Difference_In_Days / 7)} Weeks Ago`
                : jobPostDate}
            </span>
          </h2>

          <div className="flex items-center gap-x-2">
            <img src="/dashboard/pay.png" alt="pay" />
            <span className="text-[13px] text-[#263238] font-medium">
              {job.salary}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            About the company
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {job.company_bio}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Job Description
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {job.job_description}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Required Skills and Qualifications:
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {job.requirements}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Application closing date
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {job.deadline}
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-2 py-2 items-center">
        <button className="w-1/2 py-2  bg-[#2596BE] text-white" onClick={apply}>
          Apply now
        </button>
        <button
          className="w-1/2 py-2  bg-[#2596BE] text-white"
          onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CardDetails;

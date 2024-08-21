import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyForJob,
  setNoticeTrue,
} from "../../../../../redux/TalentApplicationSlice";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";

const SavedJobDetails = ({ details, onClose }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  const jobData = details.jobPosting;
  const [jobPostingId] = useState({
    jobPostingId: jobData.jobID,
  });
  const dispatch = useDispatch();

  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  const isVerified = loggedInUser.verified;

  const apply = () => {
    onClose();
    isVerified
      ? dispatch(applyForJob(jobPostingId))
      : dispatch(setNoticeTrue());
  };
  const { data: applicantCount } = useApiRequest(
    `/api/employers/${jobData.jobID}/applicants/count`
  );
  return (
    <div className=" bg-white px-4 lg:px-10 py-5 w-[90%] relative m-auto">
      <div className="flex w-full gap-y-4 flex-col">
        <div className="flex w-full justify-between">
          <div className="items-center gap-x-2 flex">
            <img src={details?.logo} alt="logo" />
            <div className="flex flex-col">
              <span className="font-bold md:text-xl">{details?.company}</span>
              <div className="flex items-center gap-x-2">
                <img src="/dashboard/location.png" alt="location" />
                <span className="md:text-sm capitalize font-medium text-[#444444]">
                  {details.jobPosting?.job_location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex hover:cursor-pointer items-center gap-x-2 border border-[#2596BE] text-[#2596BE] rounded-[5px] px-4 text-sm">
            <img src="/dashboard/save.png" alt="save" />
            <span>Saved</span>
          </div>
        </div>

        <div className="flex gap-y-1 flex-col">
          <span className="font-medium md:text-xl">{details?.title}</span>
          <div className="flex text-[#263238] gap-x-3 items-center font-normal md:text-sm text-xs">
            <img src="/dashboard/users.png" alt="views" />
            <span>{details?.employees} employees</span>
          </div>
          <div className="flex gap-x-3 text-[#263238] items-center font-normal md:text-sm text-xs">
            <img src="/dashboard/view.png" alt="views" />
            <span>{details?.views} views</span>
            <span>
              Applicants:<span className="font-bold">{applicantCount}</span>
            </span>
          </div>
          <div className="flex gap-x-3 text-[#263238] items-center font-normal md:text-sm text-xs">
            <img src="/dashboard/brief.png" alt="views" />
            {details.jobPosting?.job_type && <span>full time</span>}{" "}
            <span>*</span>
            {details?.onsite && <span>onsite</span>}
          </div>

          <div className="flex items-center gap-x-2">
            <img src="/dashboard/pay.png" alt="pay" />
            <span className="text-[13px] text-[#263238] font-medium">
              {formatter.format(details.jobPosting?.salary)}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            About the company
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {details.jobPosting?.company_bio}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Job Description
          </span>

          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {details.jobPosting?.job_description}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Required Skills and Qualifications:
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {details.jobPosting?.requirements}
          </span>
          {/* {details?.skills.map((skill) => (
            <ul className="px-7">
              <li
                className="text-[13px] py-1 md:text-sm text-[#263238] font-medium"
                style={{ listStyle: "disc" }}>
                {skill}
              </li>
            </ul>
          ))} */}
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Application closing date
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {details.jobPosting?.deadline}
          </span>
        </div>
      </div>
      <div className="flex justify-center py-2 items-center">
        <button className="w-1/2 py-2  bg-[#2596BE] text-white" onClick={apply}>
          Apply now
        </button>
      </div>
    </div>
  );
};

export default SavedJobDetails;

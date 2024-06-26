import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ details, onClick, handleApply }) => {
  return (
    <div className="px-6 bg-white py-4 hover:scale-95 transition-all ease-in">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <div className="items-center gap-x-2 flex">
            <img src={details?.logo} alt="logo" />
            <div className="flex flex-col">
              <span className="font-bold md:text-xl">{details?.company}</span>
              <div className="flex items-center gap-x-2">
                <img src="/dashboard/location.png" alt="location" />
                <span className="md:text-sm font-medium text-[#444444]">{details?.location}</span>
              </div>
            </div>
          </div>
          <div className="flex hover:cursor-pointer items-center gap-x-2 border border-[#2596BE] text-[#2596BE] rounded-[5px] px-4 text-sm">
            <img src="/dashboard/save.png" alt="save" />
            <span>Save</span>
          </div>
        </div>

        <span className="font-medium md:text-lg">{details?.title}</span>

        <span className="text-base font-normal text-[#263238]">{details?.description}</span>

        <div className="flex gap-x-2">
          <span className="border border-[#215E7D] rounded-[8px] p-1 text-[#215E7D]">Full time</span>
          <span className="border border-[#215E7D] rounded-[8px] p-1 text-[#215E7D]">On-site</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <img src="/dashboard/pay.png" alt="pay" />
            <span className="font-medium md:text-sm">{details?.pay}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-3 items-center font-normal text-xs">
              <img src="/dashboard/view.png" alt="views" />
              <span>{details?.views} views</span>
              <span>{details?.applicants} Applicants</span>
            </div>
            <div className="flex items-center gap-2 group" onClick={onClick}>
            <Link className="underline underline-[#215E7D] underline-offset-4 text-[#215E7D]">See more</Link>
            <img src="/dashboard/right-arrow.png" alt="see more" className="group-hover:translate-x-2 transition-all ease-in-out" />
            </div>
          </div>
        </div>

        <button className="bg-[#2596BE] my-4 py-2 rounded-[8px] hover:scale-95 transition-all ease-in text-white" onClick={handleApply}>Apply Now</button>
      </div>
    </div>
  );
};

export default JobCard;

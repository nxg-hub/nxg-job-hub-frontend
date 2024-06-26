import React from "react";

const CardDetails = ({ details, onClose }) => {
  return (
    <div className=" bg-white px-4 lg:px-10 py-5">
      <div className="flex w-full gap-y-4 flex-col">
        <div className="flex w-full justify-between">
          <div className="items-center gap-x-2 flex">
            <img src={details?.logo} alt="logo" />
            <div className="flex flex-col">
              <span className="font-bold md:text-xl">{details?.company}</span>
              <div className="flex items-center gap-x-2">
                <img src="/dashboard/location.png" alt="location" />
                <span className="md:text-sm font-medium text-[#444444]">
                  {details?.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex hover:cursor-pointer items-center gap-x-2 border border-[#2596BE] text-[#2596BE] rounded-[5px] px-4 text-sm">
            <img src="/dashboard/save.png" alt="save" />
            <span>Save</span>
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
            <span>{details?.applicants} Applicants</span>
          </div>
          <div className="flex gap-x-3 text-[#263238] items-center font-normal md:text-sm text-xs">
            <img src="/dashboard/brief.png" alt="views" />
            {details?.fulltime && <span>full time</span>} <span>*</span>
            {details?.onsite && <span>onsite</span>}
          </div>

          <div className="flex items-center gap-x-2">
            <img src="/dashboard/pay.png" alt="pay" />
            <span className="text-[13px] text-[#263238] font-medium">
              {details?.pay}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            About the company
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {details?.about}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Job Description
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {details?.full_description}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Required Skills and Qualifications:
          </span>
          {details?.skills.map((skill) => (
            <ul className="px-7">
              <li
                className="text-[13px] py-1 md:text-sm text-[#263238] font-medium"
                style={{ listStyle: "disc" }}
              >
                {skill}
              </li>
            </ul>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-[#000000] font-medium">
            Application closing date
          </span>
          <span className="text-[13px] md:text-sm text-[#263238] font-medium">
            {details?.deadline}
          </span>
        </div>
      </div>
      <div className="flex justify-center py-2 items-center">
        <button
          className="w-1/2 py-2  bg-[#2596BE] text-white"
          onClick={onClose}
        >
          Apply now
        </button>
      </div>
    </div>
  );
};

export default CardDetails;

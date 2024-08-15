import React from "react";
import { Link } from "react-router-dom";

const AllApplicantForAJob = (app) => {
  const applicantDetails = app.app.applicant;
  const applicantTalent = app.app.techTalent;

  return (
    <ul className="shadow-sm shadow-[#00000040] w-[90%] m-auto pl-5 py-3 flex items-center">
      <div className="w-[80%] flex gap-2 ">
        <img
          className="h-[64px] w-[64px] rounded-full"
          src={applicantTalent.profilePicture}
          alt="profilePic"
        />
        <li className="text-[16px] py-4">
          <h3>
            <span className="font-bold items-center">
              {applicantDetails.firstName}
            </span>
          </h3>
        </li>
      </div>
      <div className="bg-[#2596BE] text-white txt-sm px-2 md:px-3 py-2 mr-5 md:mr-0  h-[40px] rounded-lg">
        <Link to={`../review-appliedtalent/${applicantDetails.id}`}>
          <button>Review</button>
        </Link>
      </div>
    </ul>
  );
};

export default AllApplicantForAJob;

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setInterviewFormTrue } from "../../../../../redux/InterviewSlice";

const Accepted = (applicant) => {
  const applicantDetails = applicant.applicant.applicant;
  const applicantTalent = applicant.applicant.techTalent;
  const applicantJobDetail = applicant.applicant.jobPosting;

  const dispatch = useDispatch();
  const openForm = (id) => {
    dispatch(setInterviewFormTrue(id));
  };

  return (
    <ul className="shadow-sm shadow-[#00000040] w-[90%] m-auto pl-5 py-3 flex items-center relative">
      <div className="w-[80%] md:flex gap-2 ">
        <img
          className="h-[64px] w-[64px] rounded-full"
          src={applicantTalent?.profilePicture}
          alt="profilePic"
        />
        <div>
          <li className="text-[16px] py-2">
            <h3>
              <span className="font-bold items-center capitalize">
                Name:{applicantDetails?.firstName}
              </span>
            </h3>
          </li>
          <li className="text-[16px] py-2">
            <h3>
              <span className="font-bold items-center capitalize">
                Role:{applicantJobDetail?.job_title}
              </span>
            </h3>
          </li>
          <li className="text-[16px] py-2">
            <h3>
              <span className="font-bold items-center capitalize">
                Job Location:{applicantJobDetail?.job_location}
              </span>
            </h3>
          </li>
          <li className="text-[16px] py-2 w-[20%]">
            <h3>
              <span className="font-bold items-center w-[20%]">
                Email:{applicantDetails?.email}
              </span>
            </h3>
          </li>
        </div>
      </div>
      <div className="bg-[#2596BE] absolute top-2 right-2 md:top-[60px] md:right-5 text-white text-sm px-2 md:px-3 py-2 mr-5 md:mr-0 rounded-lg">
        <button
          onClick={() => {
            openForm(applicantDetails.id);
          }}>
          Set Up Interview
        </button>
      </div>
    </ul>
  );
};

export default Accepted;

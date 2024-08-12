import React, { useEffect, useState } from "react";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { applyForJob } from "../../../../redux/TalentApplicationSlice";
import AppMessage from "./AppMessage";
import AppErrorMessage from "./AppErrorMessage";
import spinner from "../../../../static/icons/spinner.svg";

const ApplyBtn = ({ jobID }) => {
  const [jobPostingId] = useState({
    jobPostingId: jobID,
  });
  const [notice, setNotice] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  const loading = useSelector((state) => state.TalentApplicationSlice.loading);
  const error = useSelector((state) => state.TalentApplicationSlice.error);
  const success = useSelector((state) => state.TalentApplicationSlice.success);

  const isVerified = loggedInUser.verified;

  //   try {
  //     const res = await axios.post(
  //       `${API_HOST_URL}/api/job-postings/${jobID}/apply`,
  //       jobPostingId,

  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token.authKey,
  //         },
  //

  const apply = () => {
    isVerified ? dispatch(applyForJob(jobPostingId)) : setNotice(true);

    // dispatch(applyForJob(jobPostingId));
  };

  return (
    <>
      <button
        onClick={apply}
        className="text-sm bg-[#006a90] text-white px-3 py-1 rounded-md ">
        {loading ? (
          <img className="w-[100%]  m-auto" src={spinner} alt="spinner" />
        ) : (
          "Apply Now"
        )}
      </button>
      {notice && (
        <>
          <div className="absolute top-[100px] md:text-xl right-[20%] w-[50%] px-3 rounded-md md:w-[50%] m-auto bg-blue-200 z-30 h-[130px] md:h-[100px] py-5 text-center">
            <h2 className="font-bold">
              User is not Verified, Please Complete your Profile and Try Again
            </h2>
            <span
              onClick={() => {
                setNotice(false);
              }}
              className="cursor-pointer font-bold relative bottom-[90px] left-[80px] md:left-[50%] md:bottom-[75px] lg:left-[45%] lg:bottom-[50px] text-red-600">
              x
            </span>
          </div>
          <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
        </>
      )}
      {success && (
        <>
          <AppMessage />
          <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
        </>
      )}
      {error && (
        <>
          <AppErrorMessage />
          <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
        </>
      )}
    </>
  );
};

export default ApplyBtn;

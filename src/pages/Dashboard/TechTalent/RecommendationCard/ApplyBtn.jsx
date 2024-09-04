import React, { useEffect, useState } from "react";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { applyForJob } from "../../../../redux/TalentApplicationSlice";
import spinner from "../../../../static/icons/spinner.svg";

const ApplyBtn = ({ jobID }) => {
  const [jobPostingId] = useState({
    jobPostingId: jobID,
  });
  const [notice, setNotice] = useState(false);

  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  // const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  // const loading = useSelector((state) => state.TalentApplicationSlice.loading);
  // const error = useSelector((state) => state.TalentApplicationSlice.error);
  // const success = useSelector((state) => state.TalentApplicationSlice.success);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [multipleApplication, setMultipleApplication] = useState(false);

  const isVerified = loggedInUser.verified;
  const apply = async () => {
    if (isVerified) {
      setLoading(true);
      try {
        const res = await axios
          .post(
            `${API_HOST_URL}/api/job-postings/${jobID}/apply`,
            jobPostingId,

            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token.authKey,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data === "Application Successful!") {
              setSuccess(true);
            }
            return res.json();
          })
          .then((data) => {
            setSuccess(true);
            setLoading(false);
          });
        console.log(res);
      } catch (error) {
        !error ? setSuccess(true) : null;
        error?.response?.data ===
        "You have already applied to this job. Multiple applications are not allowed."
          ? setMultipleApplication(true)
          : setError(true);
        console.log(error);
        // setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setNotice(true);
    }
  };
  // console.log(error);
  // console.log(success);

  //

  // const apply = () => {
  //   isVerified ? dispatch(applyForJob(jobPostingId)) : setNotice(true);

  //   // dispatch(applyForJob(jobPostingId));
  // };

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
          <div className="absolute top-[10px] md:text-xl right-[20%] w-[60%] px-3 rounded-md md:w-[70%] m-auto bg-blue-200 z-30 py-5 text-center">
            <h2 className="font-bold">
              User is not Verified, Please Complete your Profile and Try Again.
              <br />
              If you have completed your profile, kindly checkback
              <br />
              while we verify you.
            </h2>
            <span
              onClick={() => {
                setNotice(false);
              }}
              className="font-bold text-red-500 absolute top-0 right-3 md:right-5 cursor-pointer text-xl">
              x
            </span>
          </div>
          <div
            onClick={() => {
              setNotice(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
      {success && (
        <>
          <div
            className={` bg-white z-30 absolute top-[10px] left-[10%] md:left-[20%] w-[80%] md:w-[60%] m-auto  rounded-[24px] text-base font-medium px-10 py-5`}>
            <div className="flex items-center gap-y-3 text-center justify-center flex-col">
              <div className="flex items-center gap-x-1">
                <span className="text-xl">Job application was successful</span>
              </div>
              <span>
                You can track your application status in the
                <span className="text-lg font-semibold">“My Applications”</span>
              </span>
              <span>
                Check your email for more details about your application
              </span>
              <button
                onClick={() => {
                  setSuccess(false);
                }}
                className="w-1/2 py-2  bg-[#2596BE] text-white">
                Close
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSuccess(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
      {error && (
        <>
          <div
            className={` bg-white z-30 absolute top-[0px] left-[5%] md:left-[10%] md:top-[10px] w-[90%] md:w-[85%] m-auto  rounded-[24px] text-base font-medium px-10 py-5`}>
            <div className="flex items-center gap-y-3 text-center justify-center flex-col">
              <div className="flex items-center gap-x-1">
                <span className="text-xl">Ooops!!, Something went wrong!!</span>
              </div>
              <span>
                Make sure you have updated your skills on your profile page,
                <br></br>
                Check internet connection and try again.
                {/* <span className="text-lg font-semibold">“My Applications”</span> */}
              </span>
              <button
                onClick={() => {
                  setError(false);
                }}
                className="w-1/2 py-2  bg-[#2596BE] text-white">
                Close
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setError(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
      {multipleApplication && (
        <>
          <div
            className={` bg-white z-30 absolute top-[10px] left-[10%] md:left-[20%] w-[80%] md:w-[60%] m-auto  rounded-[24px] text-base font-medium px-10 py-5`}>
            <div className="flex items-center gap-y-3 text-center justify-center flex-col">
              <div className="flex items-center gap-x-1">
                <span className="text-xl">
                  You have already applied to this job. Multiple applications
                  are not allowed.
                </span>
              </div>

              <button
                onClick={() => {
                  setMultipleApplication(false);
                }}
                className="w-1/2 py-2  bg-[#2596BE] text-white">
                Close
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setMultipleApplication(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
    </>
  );
};

export default ApplyBtn;

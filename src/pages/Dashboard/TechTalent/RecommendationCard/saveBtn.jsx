import React, { useState } from "react";
import SaveJob from "../../../../static/icons/carbon_bookmark.svg?react";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
// import g from "../../../../static"/

const saveBtn = ({ jobID }) => {
  const [jobPostingId] = useState({
    jobPostingId: jobID,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const saveJob = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_HOST_URL}/api/job-postings/${jobID}/save`,
        jobPostingId,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      );

      console.log(res);
      if (res.status === 200) {
        // setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      error.response.data === "Job Already Saved!"
        ? setSaved(true)
        : setError(true);

      // setError(true);
    } finally {
      !error && !saved ? setSuccess(true) : null;
      setLoading(false);
    }
  };
  return (
    <>
      <p className="float-right" onClick={saveJob}>
        <SaveJob title="Save job" />
        <span className="text-xs text-blue-600">
          {loading ? "...." : "save"}
        </span>
      </p>
      {saved && (
        <>
          <div className=" absolute top-[20px] md:text-xl right-[5%] w-[50%] px-3 rounded-md  m-auto bg-blue-200 z-30 h-[100px] py-5 text-center">
            <h2 className="font-bold ">This job is already saved!</h2>
            <span
              onClick={() => {
                setSaved(false);
              }}
              className="cursor-pointer font-bold relative bottom-[50px] pb-3 left-[95%]  lg:left-[95%] lg:bottom-[58px] text-red-600">
              x
            </span>
          </div>
          <div
            onClick={() => {
              setSaved(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
      {error && (
        <>
          <div className=" absolute top-[20px] md:text-xl right-[5%] w-[50%] px-3 rounded-md  m-auto bg-blue-200 z-30 h-[100px] py-5 text-center">
            <h2 className="font-bold ">
              Something went wrong!!, Check internet connection.
            </h2>
            <span
              onClick={() => {
                setError(false);
              }}
              className="cursor-pointer font-bold relative bottom-[70px] pb-3 left-[95%]  lg:left-[95%] lg:bottom-[58px] text-red-600">
              x
            </span>
          </div>
          <div
            onClick={() => {
              setError(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
      {success && (
        <>
          <div className=" absolute top-[20px] md:text-xl right-[5%] w-[50%] px-3 rounded-md m-auto bg-blue-200 z-30 h-[100px] py-5 text-center">
            <h2 className="font-bold ">Job Saved Successfully.</h2>
            <span
              onClick={() => {
                setSuccess(false);
              }}
              className="cursor-pointer font-bold relative bottom-[55px] pb-3 left-[95%]  lg:left-[95%] lg:bottom-[58px] text-red-600">
              x
            </span>
          </div>
          <div
            onClick={() => {
              setSuccess(false);
            }}
            className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
          />
        </>
      )}
    </>
  );
};

export default saveBtn;

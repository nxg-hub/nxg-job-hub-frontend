import React, { useState } from "react";
import SaveJob from "../../../../../static/icons/carbon_bookmark.svg?react";
import axios from "axios";
import { API_HOST_URL } from "../../../../../utils/api/API_HOST";
const SaveJobListBtn = ({ jobID }) => {
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
    <div>
      <p className="float-right" onClick={saveJob}>
        <SaveJob title="Save job" />
        <span className="text-xs text-blue-600">
          {loading ? "...." : "save"}
        </span>
      </p>
      {saved && (
        <>
          <div className=" absolute top-[0px] md:text-xl right-[20%] w-[80%] px-3 rounded-md md:w-[80%] m-auto bg-blue-200 z-30 h-[100px] py-5 text-center">
            <h2 className="font-bold ">This job is already saved!</h2>
            <span
              onClick={() => {
                setSaved(false);
              }}
              className="cursor-pointer text-xl md:text-3xl font-bold relative left-[50%] bottom-[50px] pb-3 md:left-[60%] z-40  lg:left-[57%] lg:bottom-[58px] text-red-600">
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
          <div className=" absolute top-[0px] md:text-xl right-[20%] w-[80%] px-3 rounded-md md:w-[80%] m-auto bg-blue-200 z-30 h-[100px] py-5 text-center">
            <h2 className="font-bold ">
              Something went wrong!!, Check internet connection.
            </h2>
            <span
              onClick={() => {
                setError(false);
              }}
              className="cursor-pointer text-xl md:text-3xl font-bold relative left-[50%] bottom-[50px] pb-3 md:left-[60%] z-40  lg:left-[57%] lg:bottom-[58px] text-red-600">
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
          <div className=" absolute top-[0px] md:text-xl right-[20%] w-[80%] px-3 rounded-md md:w-[80%] m-auto bg-blue-200 z-30 h-[100px] py-5 text-center">
            <h2 className="font-bold ">Job Saved Successfully.</h2>
            <span
              onClick={() => {
                setSuccess(false);
              }}
              className="cursor-pointer text-xl md:text-3xl font-bold relative left-[50%] bottom-[50px] pb-3 md:left-[60%] z-40  lg:left-[57%] lg:bottom-[58px] text-red-600">
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
    </div>
  );
};

export default SaveJobListBtn;

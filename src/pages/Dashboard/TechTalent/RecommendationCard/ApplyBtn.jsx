import React, { useEffect, useState } from "react";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  applyForJob,
  getJobID,
} from "../../../../redux/TalentApplicationSlice";

const ApplyBtn = ({ jobID }) => {
  const dispatch = useDispatch();
  const [jobPostingId] = useState({
    jobPostingId: jobID,
  });
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const loggedInUser = useSelector(
    (state) => state.LoggedInUserSlice.loggedInUser
  );
  console.log(loggedInUser);

  const isVerified = loggedInUser.verified;

  const apply = async () => {
    if (isVerified) {
      try {
        setLoading(true);
        const res = await axios.post(
          `${API_HOST_URL}/api/job-postings/${jobID}/apply`,
          jobPostingId,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token.authKey,
            },
          }
        );
        console.log(jobID);
        if (res.status === 200) {
          setSuccess(true);
          setLoading(false);
        }
        console.log(res.data);
        console.log(success);
        alert(res.data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    } else {
      alert("user is not verified. please complete your profile");
    }
  };
  //   useEffect(() => {
  //     dispatch(getJobID({ jobPostingId: jobID }));
  //   });

  //   const apply = (jobPostingId) => {
  //     // console.log(jobPostingId);
  //     dispatch(applyForJob(`/api/job-postings/${jobID}/apply`), jobPostingId);
  //   };

  return (
    <>
      <button
        onClick={apply}
        className="text-sm bg-[#006a90] text-white px-3 py-1 rounded-md ">
        {loading ? "..........." : "Apply Now"}
        {/* {!isVerified ? "user is not verified" : null} */}
      </button>
    </>
  );
};

export default ApplyBtn;

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
      console.log(jobID);
      if (res.status === 200) {
        // setSuccess(true);
        setLoading(false);
        alert("job saved successfully");
      }
      console.log(res.data);
      console.log(success);
    } catch (error) {
      console.log(error);
      // setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <p className="float-right" onClick={saveJob}>
      <SaveJob title="Save job" />
      <span className="text-xs text-blue-600">{loading ? "...." : "save"}</span>
    </p>
  );
};

export default saveBtn;

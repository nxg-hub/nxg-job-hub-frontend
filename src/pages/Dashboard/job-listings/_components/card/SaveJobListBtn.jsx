import React, { useState } from "react";
import SaveJob from "../../../../../static/icons/carbon_bookmark.svg?react";
import axios from "axios";
import { API_HOST_URL } from "../../../../../utils/api/API_HOST";
import Notice from "../../../../../components/Notice";
const SaveJobListBtn = ({ jobID }) => {
  const [jobPostingId] = useState({
    jobPostingId: jobID,
  });
  const [loading, setLoading] = useState(false);
  const [popup, showpopUp] = useState(undefined);
  const [postJobError, setPostJobError] = useState("");
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
        setLoading(false);
        showpopUp({
          type: "success",
          message: "Job Save successful",
        });
        setTimeout(() => {
          showpopUp(undefined);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      console.log(error);
      error.response.data === "Job Already Saved!"
        ? setPostJobError("Job Already Saved!")
        : setPostJobError("Error in saving job");

      showpopUp({
        type: "danger",
        message: postJobError,
      });
      setTimeout(() => showpopUp(undefined), 5000);
    } finally {
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

      {popup && <Notice type={popup.type} message={popup.message} />}
    </div>
  );
};

export default SaveJobListBtn;

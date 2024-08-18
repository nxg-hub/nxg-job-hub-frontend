import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApiRequest } from "../../../../../../utils/functions/fetchEndPoint";
import AllApplicantForAJob from "./AllApplicantForAJob";
import spinner from "../../../../../../static/icons/spinner.svg";
import { useDispatch } from "react-redux";
import { getJobID } from "../../../../../../redux/FilterSlice";

const ReviewApplicants = () => {
  const { id } = useParams();
  const { data: job, loading } = useApiRequest(`/api/job-postings/get-${id}`);
  const { data: jobApplicant } = useApiRequest(
    `/api/v1/admin/job-postings/${id}/get-all-applicants-for-a-job`
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobID(id));
  }, []);
  //   console.log(jobApplicant);

  return (
    <div className="h-[100vh] overflow-y-scroll pb-10 ">
      {loading ? (
        <img
          className="w-[30%] absolute left-[45%] top-[25%]"
          src={spinner}
          alt="spinner"
        />
      ) : (
        <>
          <div className="w-[85%] m-auto my-11">
            <h1 className="text-center text-sm md:text-xl font-extrabold capitalize">
              {`All Applicants For ${job.job_title} Position at ${job.employer_name}`}
            </h1>
          </div>
          {jobApplicant.map((app, i) => (
            <AllApplicantForAJob key={i} app={app} />
          ))}
          {jobApplicant.length === 0 && (
            <div className="w-[50%] m-auto font-bold">
              <h2>Nobody has applied for this job yet.</h2>
            </div>
          )}
          {/* <SuggestedApplicantModal /> */}
        </>
      )}
    </div>
  );
};

export default ReviewApplicants;

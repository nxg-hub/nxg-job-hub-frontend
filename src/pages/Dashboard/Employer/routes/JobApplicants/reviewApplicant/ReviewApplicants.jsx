import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApiRequest } from "../../../../../../utils/functions/fetchEndPoint";
import AllApplicantForAJob from "./AllApplicantForAJob";
import spinner from "../../../../../../static/icons/spinner.svg";
import { useDispatch } from "react-redux";
import { getJobID } from "../../../../../../redux/FilterSlice";
import { BsArrowLeft } from "react-icons/bs";
import { API_HOST_URL } from "../../../../../../utils/api/API_HOST";

const ReviewApplicants = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const { data: job } = useApiRequest(`api/job-postings/get-${id}`);

  const {
    data: jobApplicant,
    loading,
    error,
  } = useApiRequest(
    `/api/employers/job-postings/${id}/get-all-applicants-for-a-job?page=0&size=1000&sort=string`
  );
  const pendingApplicant = jobApplicant.filter(
    (app) => app.applicationStatus === "PENDING"
  );
  // console.log(jobApplicant);
  const job = jobApplicant[0]?.jobPosting;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobID(id));
  }, []);
  return (
    <div className="h-[100vh] overflow-y-scroll pb-10 ">
      <Link
        to={".."}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "12px",
          fontWeight: "400",
          color: "#000",
          margin: "0 0 1rem 1rem",
          paddingTop: ".5rem",
        }}>
        <BsArrowLeft style={{ fontSize: "26px" }} />
        <span>Back</span>
      </Link>
      {loading ? (
        <img
          className="w-[30%] md:w-[10%] h-[400px] absolute top-[200px] right-[35%] md:h-[500px] m-auto mt-[-150px]"
          src={spinner}
          alt="spinner"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px] text-xl">
          <h2>Something went wrong. Check internet connecton</h2>
        </div>
      ) : (
        <>
          {pendingApplicant.length !== 0 && (
            <div className="w-[85%] m-auto my-11">
              <h1 className="text-center text-sm md:text-xl font-extrabold capitalize">
                {`All Applicants For ${job?.job_title}  Position at ${job?.employer_name} `}
              </h1>
            </div>
          )}
          {pendingApplicant.map((app, i) => (
            <AllApplicantForAJob key={i} app={app} />
          ))}
          {pendingApplicant.length === 0 && (
            <div className="w-[50%] m-auto font-bold">
              <h2>No pending review for this job yet.</h2>
            </div>
          )}
          {/* <SuggestedApplicantModal /> */}
        </>
      )}
    </div>
  );
};

export default ReviewApplicants;

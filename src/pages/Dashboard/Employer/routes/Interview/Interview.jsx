import React, { useEffect, useState } from "react";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import Accepted from "./Accepted";
import InterviewForm from "./InterviewForm";
import { API_HOST_URL } from "../../../../../utils/api/API_HOST";
import spinner from "../../../../../static/icons/spinner.svg";
import { useDispatch, useSelector } from "react-redux";
import { setInterviewFormFalse } from "../../../../../redux/InterviewSlice";

const Interview = () => {
  const dispatch = useDispatch();
  //getting the employerID from employer details
  const { data: employerData } = useApiRequest(`/api/employers/get-employer`);
  const employerID = employerData?.employerID;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noApplicant, setNoApplicant] = useState(false);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const [allApplicant, setAllApplicant] = useState([]);

  //getting all neccessary states from interviewSlice in the redux store
  const form = useSelector((state) => state.InterviewSlice.interviewForm);
  const closeForm = () => {
    dispatch(setInterviewFormFalse());
  };

  //fetching number of applicants for each job
  const fetchData = async () => {
    setLoading(true);
    try {
      await fetch(
        `${API_HOST_URL}/api/employers/employers/${employerID}/get-all-applicants?page=0&size=1000&sort=string`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      )
        .then((response) => {
          if (response.status === 404) {
            setNoApplicant(true);
          }
          return response.json();
        })
        .then((data) => {
          setAllApplicant(data);
          setLoading(false);
        });
    } catch (err) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (employerID) {
      fetchData();
    }
  }, [employerID]);
  //filtering all accepted applicant
  const accepted = allApplicant?.filter((app) => {
    return app.applicationStatus === "APPROVED";
  });
  return (
    <div>
      {loading ? (
        <img
          className="w-[30%] absolute left-[45%] top-[25%]"
          src={spinner}
          alt="spinner"
        />
      ) : !loading && error && !noApplicant ? (
        <div>
          <h2>
            Something went wrong. <br /> Check Internet Connection.
          </h2>
        </div>
      ) : !loading && noApplicant ? (
        <h2 className="font-bold mt-11 text-center">
          You do not have any accepted applicants yet.
        </h2>
      ) : (
        <>
          <div className="w-[80%] m-auto mt-[50px] font-bold capitalize  md:text-3xl font-mono text-center">
            <h2>Set Up Interview With All Accepted Applicants</h2>
          </div>
          {accepted.map((app) => (
            <div className="mt-[50px]">
              <Accepted applicant={app} />
            </div>
          ))}
          {form && (
            <>
              <InterviewForm accepted={accepted} />
              <div
                onClick={closeForm}
                className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Interview;

import React from "react";
import { useApiRequest } from "../../../../../utils/functions/fetchEndPoint";
import Accepted from "./Accepted";
import InterviewForm from "./InterviewForm";

const Interview = () => {
  const {
    data: allApplicant,
    loading,
    error,
  } = useApiRequest(
    `/api/employers/job-postings/66c2da42127f1379a921e6fc/get-all-applicants-for-a-job`
  );
  const accepted = allApplicant?.filter((app) => {
    return app.applicationStatus === "APPROVED";
  });
  return (
    <div>
      <div className="w-[80%] m-auto mt-[50px] font-bold  md:text-3xl font-mono text-center">
        <h2>Set Up Interview With All Accepted Applicants</h2>
      </div>
      {accepted.map((app) => (
        <div className="mt-[50px]">
          <Accepted applicant={app} />
        </div>
      ))}
      <InterviewForm accepted={accepted} />
    </div>
  );
};

export default Interview;

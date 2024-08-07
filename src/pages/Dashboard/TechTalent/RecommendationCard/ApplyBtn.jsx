import React from "react";
import { postEndPoint } from "../../../../utils/functions/postEndpoint";

const ApplyBtn = ({ jobID }) => {
  postEndPoint(`/api/job-postings/${jobID}/apply`);
  return (
    <button className="text-sm bg-[#006a90] text-white px-3 py-1 rounded-md">
      Apply Now
    </button>
  );
};

export default ApplyBtn;

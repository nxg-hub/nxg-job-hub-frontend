import React from "react";
import { useApiRequest } from "../../utils/functions/fetchEndPoint";

const Count = ({ jobID }) => {
  const { data: applicantCount } = useApiRequest(
    ` /api/employers/${jobID}/applicants/count`
  );
  console.log(applicantCount);
  return <div>{applicantCount}</div>;
};

export default Count;

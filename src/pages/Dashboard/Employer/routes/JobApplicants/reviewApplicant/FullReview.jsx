import React from "react";
import { useApiRequest } from "../../../../../../utils/functions/fetchEndPoint";
import { useSelector } from "react-redux";

const FullReview = () => {
  const jobID = useSelector((state) => state.FilterSlice.jobID);

  const { data: jobApplicant } = useApiRequest(
    `/api/v1/admin/job-postings/${jobID}/get-all-applicants-for-a-job`
  );

  const appDetails = jobApplicant[0]?.techTalent;
  const appDetails2 = jobApplicant[0]?.applicant;
  console.log(String(appDetails?.resume));
  const onButtonClick = () => {
    const pdfUrl = String(appDetails?.resume);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" w-[90%] m-auto">
      <div className="mt-8 h-[150px] w-[250px] m-auto">
        <img
          className="rounded-full m-auto w-[100px]  md:w-[150px]"
          src={appDetails?.profilePicture}
          alt="pic"
        />
        <h3 className="text-center">{appDetails2?.firstName}</h3>
      </div>
      <div className="w-[90%] bg-white m-auto h-[500px] mt-5">
        <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
          <span className="font-bold font-mono">Porfolio Link:</span>
          <a
            className="text-blue-600"
            href={appDetails?.portfolioLink}
            target="_blank">
            {appDetails?.portfolioLink}
          </a>
        </h2>
        <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
          <span className="font-bold font-mono">Email:</span>
          <span>{appDetails?.email}</span>
        </h2>
        <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
          <span className="font-bold font-mono">Highest Qualification:</span>
          <span>{appDetails?.highestQualification}</span>
        </h2>
        <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
          <span className="font-bold font-mono">LinkedIn Link:</span>
          <a
            className="text-blue-600"
            href={appDetails?.linkedInUrl}
            target="_blank">
            View LinkedIn
          </a>
        </h2>
        <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
          <span className="font-bold font-mono">Cover Letter:</span>
          <a
            className="text-blue-600"
            href={appDetails?.coverletter}
            target="_blank">
            View
          </a>
        </h2>
        <h2 className="md:text-xl py-3 px-4 font-mono md:flex justify-between md:w-[70%] m-auto">
          <span className="font-bold font-mono">Resume:</span>
          <button onClick={onButtonClick}>Download PDF</button>
        </h2>
      </div>
      <span className="pl-[30px] space-x-4 m-auto text-center">
        <button
          // onClick={handleAccept}
          className="bg-[#126704] text-white py-2 px-6 rounded-lg">
          Accept
        </button>
        <button
          // onClick={handleReject}
          className="bg-[#FF2323] text-white py-2 px-6 rounded-lg">
          Reject
        </button>
      </span>
    </div>
  );
};

export default FullReview;

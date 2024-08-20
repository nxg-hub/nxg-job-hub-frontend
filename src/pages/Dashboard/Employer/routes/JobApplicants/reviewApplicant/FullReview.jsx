import React, { useEffect, useState } from "react";
import { useApiRequest } from "../../../../../../utils/functions/fetchEndPoint";
import { useSelector } from "react-redux";
import { API_HOST_URL } from "../../../../../../utils/api/API_HOST";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { Document, Page, pdfjs } from "react-pdf";
import spinner from "../../../../../../static/icons/spinner.svg";

const FullReview = () => {
  const jobID = useSelector((state) => state.FilterSlice.jobID);

  const { data: jobApplicant, loading } = useApiRequest(
    `/api/v1/admin/job-postings/${jobID}/get-all-applicants-for-a-job`
  );

  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  // const [jobApplicant, setJobApplicant] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     await fetch(
  //       `${API_HOST_URL}/api/v1/admin/job-postings/${jobID}/get-all-applicants-for-a-job`,
  //       {
  //         method: "GET",
  //         responseType: "arrayBuffer",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Accept: "application/pdf",
  //           Authorization: token.authKey,
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         //Create a Blob from the PDF Stream
  //         //   console.log(response);
  //         //   const file = new Blob([response.data], {
  //         //     type: "application/pdf",
  //         //   });

  //         //   console.log(file);
  //         //   //Build a URL from the file
  //         //   const fileURL = URL.createObjectURL(file);
  //         //   setFile(fileURL);
  //         //Open the URL on new Window
  //         //   window.open(fileURL);
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setJobApplicant(data);
  //         setLoading(false);
  //         const file = new Blob([data[0].techTalent.resume], {
  //           type: "application/pdf",
  //         });

  //         //Build a URL from the file
  //         const fileURL = window.URL.createObjectURL(file);

  //         setFile(fileURL);
  //         setLoading(false);
  //       })

  //       .catch((error) => {
  //         console.log(error);
  //         setError(true);
  //       });
  //   };
  //   fetchData();
  // }, []);
  const appDetails = jobApplicant[0]?.techTalent;
  const appDetails2 = jobApplicant[0]?.applicant;
  // console.log(appDetails2);
  // console.log(jobApplicant[0]?.applicationId);
  console.log(loading);
  const onButtonClick = () => {
    // window.open(file);
    const link = document.createElement("a");
    link.href = file;
    link.download = "document.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const navigate = useNavigate();
  const applyID = jobApplicant[0]?.applicationId;
  console.log(applyID);
  const handleAcceptApplication = async () => {
    console.log("hey");
    try {
      return await fetch(
        `${API_HOST_URL}/api/employers/${applyID}/review-applicant/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          return data;
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-[90%] m-auto">
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
          className="w-[30%] absolute left-[45%] top-[25%]"
          src={spinner}
          alt="spinner"
        />
      ) : !loading && error ? (
        <div className="w-[80%] m-auto mt-[300px] text-xl">
          <h2>Something went wrong. Check internet connecton</h2>
        </div>
      ) : (
        <>
          <div className="mt-8 h-[150px] w-[250px] m-auto">
            <img
              className="rounded-full m-auto w-[100px]  md:w-[150px]"
              src={appDetails?.profilePicture}
              alt="pic"
            />
            <h3 className="text-center font-bold font-mono md:text-2xl mt-2">
              {appDetails2?.firstName}
            </h3>
          </div>
          <div className=" w-[95%] md:w-[90%] bg-white m-auto h-[400px] rounded-xl pt-4 mt-8">
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
              <span className="font-bold font-mono">
                Highest Qualification:
              </span>
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
              {/* <button target="_blank" onClick={onButtonClick}>
          Download PDF
          </button> */}
              <Document src={appDetails?.resume} />
            </h2>
          </div>
          <div className="mt-5 py-6 space-x-4 m-auto md:w-[60%] text-center">
            <button
              onClick={handleAcceptApplication}
              className="bg-[#126704] text-white py-2 px-6 rounded-lg">
              Accept
            </button>
            <button
              // onClick={handleReject}
              className="bg-[#FF2323] text-white py-2 px-6 rounded-lg">
              Reject
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FullReview;

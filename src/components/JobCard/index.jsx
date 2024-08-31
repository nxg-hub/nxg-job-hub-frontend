import { useEffect, useState } from "react";
import { useApiRequest } from "../../utils/functions/fetchEndPoint";
import Count from "./Count";
import DeleteJobBtn from "./DeleteJobBtn";
import s from "./index.module.scss";
import { NavLink } from "react-router-dom";
import { API_HOST_URL } from "../../utils/api/API_HOST";

const JobCard = ({
  job_title,
  job_description,
  jobStatus,
  createdAt,
  deadline,
  jobID,
  postPage,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const [count, setCount] = useState(null);
  useEffect(() => {
    //fetching number of applicants for each job
    const fetchData = async () => {
      await fetch(`${API_HOST_URL}/api/employers/${jobID}/applicants/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.authKey,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCount(data);
        })

        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return (
    <div className={s.JobCard}>
      <header className={s.CardHeader}>
        <p>
          Job Title: <strong>{job_title}</strong>
        </p>
        <p>
          Job Status: <strong>{jobStatus}</strong>
        </p>
      </header>
      <main>
        <p>Job Description:</p>
        <p>
          <strong>{job_description}</strong>
        </p>
      </main>
      <footer>
        <p>
          Number of Applicants: <strong>{count}</strong>
        </p>
        <div>
          <p>
            Created At: <strong>{formattedDate}</strong>
          </p>
          <p>
            Expires: <strong>{deadline}</strong>
          </p>
        </div>
      </footer>
      <div className="flex flex-wrap gap-5 md:justify-between">
        <NavLink
          to={
            postPage
              ? `review-applicants/${jobID}`
              : `posts/review-applicants/${jobID}`
          }>
          <button className="!mn-w-[200px]">Review Applications</button>
        </NavLink>
        <DeleteJobBtn jobID={jobID} />
      </div>
    </div>
  );
};

export default JobCard;

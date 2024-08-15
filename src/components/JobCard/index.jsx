import s from "./index.module.scss";
import { NavLink } from "react-router-dom";

const JobCard = ({
  job_title,
  job_description,
  applicants,
  createdAt,
  deadline,
  jobID,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className={s.JobCard}>
      <header className={s.CardHeader}>
        <p>
          Job Title: <strong>{job_title}</strong>
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
          Number of Applicants: <strong>{applicants || 0}</strong>
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
      <NavLink to={`review-applicants/${jobID}`}>
        <button>Review Applications</button>
      </NavLink>
    </div>
  );
};

export default JobCard;

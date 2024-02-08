import s from "./index.module.scss";

const JobCard = ({ job_title, job_description, applicants, created_at, deadline }) => {
  return (
    <div className={s.JobCard}>
      <header className={s.CardHeader}>
        <p>
          Job Title: <strong>{job_title}</strong>
        </p>
      </header>
      <main>
        <p>Job Description:</p>
        <p><strong>{job_description}</strong></p>
      </main>
      <footer>
        <p>
          Number of Applicants: <strong>{applicants || 0}</strong>
        </p>
        <div>
          <p>Created At: <strong>{created_at}</strong></p>
          <p>Expires: <strong>{deadline}</strong></p>
        </div>
      </footer>
      <button>Review Applications</button>
    </div>
  );
};

export default JobCard;

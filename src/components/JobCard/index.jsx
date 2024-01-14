import s from "./index.module.scss";

const JobCard = ({ title, description, applicants, created_at, deadline }) => {
  return (
    <div className={s.JobCard}>
      <header className={s.CardHeader}>
        <p>
          Job Title: <strong>{title}</strong>
        </p>
      </header>
      <main>
        <h3>Job Description:</h3>
        <p>{description}</p>
      </main>
      <footer>
        <p>
          Number of Applicants: <strong>{applicants}</strong>
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

import s from "./index.module.scss";
import SaveJob from "../../../../static/icons/carbon_bookmark.svg?react";
import Location from "../../../../static/icons/Location.svg?react";
import Views from "../../../../static/icons/ph_eye-light.svg?react";
import ApplyBtn from "./ApplyBtn";
const RecommendationCard = ({ recommendedJobs }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <div className={s.RecommendationCardWrapper}>
      <div className={s.CompanyDetails}>
        <img src={recommendedJobs.company_logo} alt="company_logo" />
        <div>
          <span>
            <p> {recommendedJobs.company_name} </p>
            <SaveJob title="Save job" />
          </span>
          <small>
            <Location /> {recommendedJobs.job_location}
          </small>
        </div>
      </div>
      <div className={s.JobDescription}>
        <p>{recommendedJobs.job_title}</p>
        <small>{recommendedJobs.job_description}</small>
        <span>{recommendedJobs.job_type}</span>
        <p>{formatter.format(recommendedJobs.salary)};</p>
      </div>
      <div className={s.jobAnalytics}>
        <small>
          <Views /> {recommendedJobs.view} views
        </small>
        <small> applicants</small>
        <ApplyBtn jobID={recommendedJobs.jobID} />
      </div>
    </div>
  );
};

export default RecommendationCard;

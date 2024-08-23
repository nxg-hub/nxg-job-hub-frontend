import s from "./index.module.scss";
import Location from "../../../../static/icons/Location.svg?react";
import Views from "../../../../static/icons/ph_eye-light.svg?react";
import ApplyBtn from "./ApplyBtn";
import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";
import SaveBtn from "./saveBtn";

const RecommendationCard = ({ recommendedJobs }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  const { data: applicantCount } = useApiRequest(
    `/api/employers/${recommendedJobs.jobID}/applicants/count`
  );
  return (
    <div className={`${s.RecommendationCardWrapper} `}>
      <div className={`${s.CompanyDetails} `}>
        <img src={recommendedJobs.company_logo} alt="logo" />
        <div className="">
          <span>
            <p> {recommendedJobs.company_name} </p>
            <SaveBtn jobID={recommendedJobs.jobID} />
          </span>
          <small className="capitalize float-left absolute">
            <Location /> {recommendedJobs.job_location}
          </small>
        </div>
      </div>
      <div className={s.JobDescription}>
        <p className="capitalize">{recommendedJobs.job_title}</p>
        <small>{recommendedJobs.job_description}</small>
        <span>{recommendedJobs.job_type}</span>
        <p>{formatter.format(recommendedJobs.salary)};</p>
      </div>
      <div className={s.jobAnalytics}>
        <small>
          <Views /> {recommendedJobs.view} views
        </small>
        <small>
          {" "}
          applicants:<strong>{applicantCount}</strong>
        </small>
        <ApplyBtn jobID={recommendedJobs.jobID} />
      </div>
    </div>
  );
};

export default RecommendationCard;

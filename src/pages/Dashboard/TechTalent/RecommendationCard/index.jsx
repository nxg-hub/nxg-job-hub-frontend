import s from "./index.module.scss";
import SaveJob from "../../../../static/icons/carbon_bookmark.svg?react";
import Location from "../../../../static/icons/Location.svg?react";
import Views from "../../../../static/icons/ph_eye-light.svg?react";
const RecommendationCard = ({
  company_name,
  company_logo,
  company_location,
  role,
  description,
  salary_range,
  views,
  applicants,
  type,
  ...props
}) => {
  return (
    <div className={s.RecommendationCardWrapper} {...props}>
      <div className={s.CompanyDetails}>
        <img src={company_logo} alt="company_logo" />
        <div>
          <span>
            <p> {company_name} </p>
            <SaveJob title="Save job" />
          </span>
          <small>
            <Location /> {company_location}
          </small>
        </div>
      </div>
      <div className={s.JobDescription}>
        <p>{role}</p>
        <small>{description}</small>
        <span>
          {type.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </span>
        <p>{salary_range}</p>
      </div>
      <div className={s.jobAnalytics}>
        <small>
          <Views /> {views} views
        </small>
        <small>{applicants} applicants</small>
        <a href="/">Apply Now</a>
      </div>
    </div>
  );
};

export default RecommendationCard;

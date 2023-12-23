import { useContext, useState } from "react";
import s from "./index.module.scss";
import TextField from "../../../../../components/TextField";
import { updateField } from "../../../../../utils/functions/updateField";
import TextArea from "../../../../../components/TextArea";
import logo from "../../../../../static/images/nxg-logo.png";
import { jobLocations } from "../../../../../utils/data/jobLocations";
import { jobTypes } from "../../../../../utils/data/jobTypes";
import { UserContext } from "../../..";
import JobPost from "../../../../../utils/classes/JobPost";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notice from "../../../../../components/Notice";
const PostJobs = () => {
  const user = useContext(UserContext);
  const data = {
    employerID: user.accountTypeID,
    job_title: "",
    job_description: "",
    requirements: "",
    responsibilities: "",
    salary: "",
    jobType: "",
    deadline: "",
    benefits: "",
    company_bio: "",
    job_location: "",
    region: "",
    contact_details: "",
    tags: "",
  };
  const [formData, setFormData] = useState(data);
  const [formErrors, setFormErrors] = useState(data);
  const [popup, showpopUp] = useState(undefined);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    let post = new JobPost(formData);
    if (formErrors.company_bio.length < 20)
      setFormErrors({
        ...formErrors,
        company_bio: "Company bio must have at least 20 characters",
      });
    try {
      showpopUp({
        type: "info",
        message: "Creating job post...",
      });
      const { authKey } =
        JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
        JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
      const res = await axios.post(
        "https://job-hub-591ace1cfc95.herokuapp.com/api/job-postings/post",
        post,
        {
          headers: {
            authorization: authKey,
          },
        }
      );
      if (res.data)
        showpopUp({
          type: "success",
          message: "Job post created successfully.",
        });
      setTimeout(() => {
        showpopUp(undefined);
        navigate("/dashboard/posts");
      }, 5000);
    } catch (err) {
      showpopUp({
        type: "danger",
        message:
          "Failed to post job. Please check your internet connection and try again.",
      });
      setTimeout(() => showpopUp(undefined), 5000);
    }
  };
  return (
    <div className={s.PostJobsWrapper}>
      <img src={logo} alt="logo" />
      <form className={s.Form} onSubmit={submitForm} action="">
        <TextField
          required
          label={"Job Title:"}
          id={"job_title"}
          name={"job_title"}
          value={formData.job_title}
          placeholder={"Ex: Senior Frontend Developer"}
          type={"text"}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.job_title}
        />

        <TextArea
          textAreaProps={{
            required: true,
          }}
          label={"Company Bio:"}
          id={"company_bio"}
          name={"company_bio"}
          rows={5}
          placeholder={"Include information about the company hiring"}
          value={formData.company_bio}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.company_bio}
        />
        <TextArea
          textAreaProps={{
            required: true,
          }}
          label={"Job Description:"}
          id={"job_description"}
          name={"job_description"}
          rows={5}
          placeholder={"Include relevant information about the job"}
          value={formData.job_description}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.job_description}
        />

        <TextArea
          textAreaProps={{
            required: true,
          }}
          label={"Requirements:"}
          id={"requirements"}
          name={"requirements"}
          rows={5}
          placeholder={"Ex: React, Tailwind, 5 years experience, etc."}
          value={formData.requirements}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.requirements}
        />
        <TextField
          required
          label={"Salary / Stipend:"}
          id={"salary"}
          name={"salary"}
          type={"text"}
          placeholder={"$120,000/yr"}
          value={formData.salary}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.salary}
        />

        <div className={s.SelectFields}>
          <label htmlFor="jobType">Job Type:</label>
          <select
            required
            id={"jobType"}
            name={"jobType"}
            onChange={(e) => updateField(e, setFormData)}
            err={formErrors.jobType}
          >
            {jobTypes.map(({ id, value, title }) => (
              <option value={value} key={id}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <TextField
          required
          label={"Application Deadline:"}
          id={"deadline"}
          name={"deadline"}
          type={"date"}
          value={formData.deadline}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.deadline}
        />

        <div className={s.SelectFields}>
          <label htmlFor="job_location">Job Location:</label>
          <select
            required
            id={"job_location"}
            name={"job_location"}
            onChange={(e) => updateField(e, setFormData)}
            err={formErrors.job_location}
          >
            {jobLocations.map(({ id, value, title }) => (
              <option value={value} key={id}>
                {title}
              </option>
            ))}
          </select>
        </div>
        {/* SHow field for work region if hybrid or onsite is selected */}
        {(formData.job_location === "hybrid" ||
          formData.job_location === "on-site") && (
          <TextField
            required
            label={"Work region:"}
            id={"region"}
            name={"region"}
            type={"text"}
            placeholder="In what city will recruits be working?"
            value={formData.region}
            onchange={(e) => updateField(e, setFormData)}
            err={formErrors.region}
          />
        )}

        <TextField
          label={"Tags:"}
          id={"tags"}
          name={"tags"}
          type={"text"}
          placeholder={"Ex: Frontend, Web development, React, Javascript"}
          value={formData.tags}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.contact_details}
        />
        <button type="submit">Post Job</button>
      </form>
      {popup && <Notice type={popup.type} message={popup.message} />}
    </div>
  );
};

export default PostJobs;

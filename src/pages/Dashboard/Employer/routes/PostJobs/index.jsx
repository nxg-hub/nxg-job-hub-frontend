import {useState } from "react";
import s from "./index.module.scss";
import TextField from "../../../../../components/TextField";
import { updateField } from "../../../../../utils/functions/updateField";
import TextArea from "../../../../../components/TextArea";
import logo from "../../../../../static/images/nxg-logo.png"
const PostJobs = () => {
  const data = {
    job_title: "",
    job_description: "",
    benefits: "",
    company_bio: "",
    responsibilities: "",
    requirements: "",
    job_location: "",
    contact_details: "",
  };
  const [formData, setFormData] = useState(data);
  const [formErrors, setFormErrors] = useState(data);
  const validateForm = () => {
    let a = 1;
  };
  const submitForm = (e) => {
    e.preventDefault();
    let valid = validateForm();
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
          type={"text"}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.job_title}
        />

        <TextArea
          textAreaProps={{
            required:true
          }}
          label={"Company Bio:"}
          id={"company_bio"}
          name={"company_bio"}
          rows={5}
          value={formData.company_bio}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.company_bio}
        />
        <TextArea
          textAreaProps={{
            required:true
          }}
          label={"Job Description:"}
          id={"job_description"}
          name={"job_description"}
          rows={5}
          value={formData.job_description}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.job_description}
        />
        <TextArea
          textAreaProps={{
            required:true
          }}
          label={"Responsibilities:"}
          id={"responsibilities"}
          name={"responsibilities"}
          rows={5}
          value={formData.responsibilities}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.responsibilities}
        />
        <TextArea
          textAreaProps={{
            required:true
          }}
          label={"Requirements:"}
          id={"requirements"}
          name={"requirements"}
          rows={5}
          value={formData.requirements}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.requirements}
        />
        <TextArea
          textAreaProps={{
            required:true
          }}
          label={"Benefits:"}
          id={"benefits"}
          name={"benefits"}
          rows={5}
          value={formData.benefits}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.benefits}
        />
        <TextField
        required
          label={"Job Location:"}
          id={"job_location"}
          name={"job_location"}
          type={"text"}
          value={formData.job_location}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.job_location}
        />
        <TextField
        required
          label={"Employer Contact Details:"}
          id={"contact_details"}
          name={"contact_details"}
          type={"text"}
          value={formData.contact_details}
          onchange={(e) => updateField(e, setFormData)}
          err={formErrors.contact_details}
        />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJobs;

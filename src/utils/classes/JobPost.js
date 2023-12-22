class JobPost {
  constructor({ contact_details, benefits, responsibilities, requirements, job_description, ...formData }) {
    const description = JSON.stringify({
      job_description,
      requirements,
      responsibilities,
      benefits,
      contact_details
    })
    this.employerID = formData.userId;
    this.title = formData.job_title;
    this.description = description;
    this.salary = formData.salary;
    this.jobType = formData.jobType;
    this.deadline = formData.deadline;
    this.location = `${formData.job_location} ${formData.region && `(${formData.region})`}`;
    this.tags = formData.tags;
    this.comments = "";
    this.reactions = "";
  }
}
export default JobPost
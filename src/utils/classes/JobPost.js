class JobPost {
  constructor({
    job_title,
    employerID,
    company_bio,
    requirements,
    job_description,
    deadline,
    jobType,
    salary,
    job_location,
    job_mode,
    // region,
    tags,
  }) {
    this.employerID = employerID;
    this.job_title = job_title;
    this.job_description = job_description;
    this.company_bio = company_bio;
    this.salary = salary;
    this.job_type = jobType;
    this.deadline = deadline;
    this.requirements = requirements;
    // this.job_location = `${job_location} ${region && `(${region})`}`;
    this.job_location = job_location;
    this.job_mode = job_mode;
    this.tags = tags;
    // this.comments = "";
    // this.reactions = "";
  }
}
export default JobPost;

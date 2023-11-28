import { useState } from "react";
import s from "./index.module.scss";
import TextField from "../../../components/TextField";
import Select from "react-select";
import { recruiterPosition, jobVacancy } from "../../../utils/data/employer";
import { PhoneInput } from "react-international-phone";
const Employer = () => {
  const data = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    company: "",
    position: "",
    workemail: "",
    company_address: "",
    industry: "",
    nationality: "",
    vacancies: [],
    gender: "",
    country: "",
    source: "",
    website: "",
  };
  const recruiterPositions = recruiterPosition.map((position) => ({
    value: position,
    label: position,
  }));
  const jobVacancies = jobVacancy.map((vacancy) => ({
    value: vacancy,
    label: vacancy,
  }));
  const [formData, setFormdata] = useState(data);
  const [errors, setErrors] = useState({});

  const updateForm = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setFormdata({ ...formData, [fieldName]: value });
  };
  const confirmPassword = (e) => {
    if (e.target.value !== formData.password) {
      setErrors["paswordError"] = "Passwords do not match";
    }
  };
  const genderOptions = [
    { value: "man", label: "Man" },
    { value: "woman", label: "Woman" },
  ];
  const updatePosition = (e) => {
    setFormdata({ ...formData, position: e.value });
  };
  const updateGender = (e) => {
    setFormdata({ ...formData, gender: e.value });
  };
  const updateVacancy = (e) => {
    const selected = e.map((choice) => choice.value);
    setFormdata({ ...formData, vacancies: selected });
  };
  const updatePhone = (e) => {
    setFormdata({ ...formData, phone: e });
  };
  const validateForm = (e) => {
    e.preventDefault();
    for (let key in formData) {
      !formData[`${key}`] ? setErrors(true) : setErrors(false);
      console.log(key, ": ", formData[`${key}`]);
    }
  };

  return (
    <div className={"Employer"}>
      <h1>REGISTER AS AN EMPLOYER</h1>
      {/* Form Wrapper */}
      <div className={s.FormWrapper}>
        <form onSubmit={validateForm} action="">
          {/*  */}
          {/* User's personal nformation */}
          <div className={s.personal}>
            <h3>Personal Information</h3>
        
            <div className={s.gender}>
              <label htmlFor="vacancy">Gender</label>
              <Select
                onChange={updateGender}
                id="gender"
                required
                options={genderOptions}
              />
            </div>
            <TextField
              onchange={updateForm}
              label={"Email Address"}
              type={"email"}
              name={"email"}
              placeholder={"e.g JohnDoe@email.com"}
              id="email"
              value={formData.email}
              required
            />
            <div className="phone ">
              <label>Phone</label>
              <PhoneInput
                inputStyle={{
                  backgroundColor: "#fbfbfb",
                  border: "none",
                  margin: "0.75rem 0",
                  padding: "0.8rem 0.5rem",
                  minWidth: "16.2rem",
                  fontSize: ".9rem",
                  opacity: ".5",
                  borderTopRightRadius: "0.37rem",
                  borderBottomRightRadius: "0.37rem",
                }}
                defaultCountry="ng"
                value={formData.phone}
                required
                onChange={updatePhone}
              />
            </div>

            <TextField
              onchange={updateForm}
              label={"Nationality"}
              type={"text"}
              name={"nationality"}
              placeholder={"e.g Nigeria"}
              id="nationality"
              required
              value={formData.nationality}
            />

            <TextField
              eye={"password"}
              onchange={updateForm}
              label={"Create a password"}
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              id="password"
              value={formData.password}
            />
            <TextField
              eye={"confirmPassword"}
              onchange={confirmPassword}
              label={"Confirm password"}
              type={"password"}
              name = {"confirmPassword"}
              placeholder={"Enter password"}
              required
              id="confirmPassword"
            />
            {JSON.stringify(errors)}
          </div>

          {/*  */}
          {/* User's company information */}
          <div className={s.company}>
            <h3>Company Information</h3>
            {/* <TextField
              label={"Work email address"}
              type={"email"}
              onchange={updateForm}
              name={"workemail"}
              placeholder={"e.g JohnDoe@company.com"}
              id="workemail"
              value={formData.workemail}
            /> */}
            <div>
              <TextField
                onchange={updateForm}
                label={"Company name"}
                type={"text"}
                name={"company"}
                placeholder={"e.g My Company Limited"}
                id="company"
                required
                value={formData.company}
              />
              <TextField
                onchange={updateForm}
                label={"Company address"}
                type={"text"}
                name={"company_address"}
                placeholder={"e.g 34 Saint Grove"}
                id="company_address"
                required
                value={formData.company_address}
              />
              <TextField
                onchange={updateForm}
                label={"Industry"}
                type={"text"}
                name={"industry"}
                placeholder={"e.g Finance"}
                id="industry"
                required
                value={formData.industry}
              />
              <TextField
                onchange={updateForm}
                label={"Country of Establishment"}
                type={"text"}
                name={"country"}
                placeholder={"e.g USA"}
                id="country"
                required
                value={formData.country}
              />
              <TextField
                onchange={updateForm}
                label={"Company website"}
                type={"text"}
                name={"website"}
                placeholder={"e.g USA"}
                id="website"
                required
                value={formData.website}
              />
              <div className={s.position}>
                <label htmlFor="position">
                  Select your position in company
                </label>
                <Select
                  onChange={updatePosition}
                  id="position"
                  required
                  options={recruiterPositions}
                />
              </div>
              <div className={s.vacancy}>
                <label htmlFor="vacancy">Select the vacancies available</label>
                <Select
                  onChange={updateVacancy}
                  id="vacancy"
                  required
                  isMulti
                  options={jobVacancies}
                />
              </div>
              <TextField
                onchange={updateForm}
                label={"Where did you hear about us"}
                type={"text"}
                name={"source"}
                placeholder={"e.g Twitter, Linkedin"}
                id="source"
                value={formData.source}
              />
            </div>
          </div>

          <button type="submit">Create your employer account</button>
        </form>
      </div>
    </div>
  );
};

export default Employer;

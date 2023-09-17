import { useState } from "react";
import s from "./index.module.scss";
import TextField from "../../../components/TextField";
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
    address: "",
    gender: "",
  };
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
  return (
    <div className={"Employer"}>
      <h1>REGISTER AS AN EMPLOYER</h1>
      {/* Form Wrapper */}
      <div className={s.FormWrapper}>
        <form action="">
          {/*  */}
          {/* User's personal nformation */}
          <div className={s.personal}>
            <h3>Personal Information</h3>
            <TextField
              onchange={updateForm}
              label={"First Name"}
              type={"text"}
              name={"firstname"}
              placeholder={"First name"}
              id="firstname"
              value={formData.firstname}
            />
            <TextField
              onchange={updateForm}
              label={"Last name"}
              type={"text"}
              name={"lastname"}
              placeholder={"Last name"}
              id="lastname"
              value={formData.lastname}
            />
            <TextField
              onchange={updateForm}
              label={"Email Address"}
              type={"email"}
              name={"email"}
              placeholder={"e.g JohnDoe@email.com"}
              id="email"
              value={formData.email}
            />
            <TextField
              onchange={updateForm}
              label={"Phone number"}
              type={"tel"}
              name={"phone"}
              placeholder={"e.g +234 xxxx xxx xxxx"}
              id="phone"
              value={formData.phone}
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
              placeholder={"Enter password"}
              id="confirmPassword"
            />
            {JSON.stringify(errors)}
          </div>

          {/*  */}
          {/* User's company information */}
          <div className={s.company}>
            <h3>Company Information</h3>
            <TextField
              label={"Work email address"}
              type={"email"}
              name={"workemail"}
              placeholder={"e.g JohnDoe@company.com"}
              id="workemail"
              value={formData.workemail}
            />
            <div>
              <TextField
                onchange={updateForm}
                label={"Company name"}
                type={"text"}
                name={"company"}
                placeholder={"e.g My Company Limited"}
                id="company"
                value={formData.company}
              />
              <div>
                <label htmlFor="position">
                  Select your position in company
                </label>
                <select
                  onchange={updateForm}
                  value={formData.position}
                  name="position"
                  id="position"
                >
                  <option value="default">Select your company</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employer;

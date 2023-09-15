import React, { useState } from "react";
import s from "./index.module.scss";
import TextField from "../../../components/TextField";
const Employer = () => {
  const data = {
    firstname: "",
    lastname: "",
    email: "",
  };
  const [formData, setFormdata] = useState({ data });
  return (
    <div className={s.Employer}>
      {/* Form Wrapper */}
      <div className={s.FormWrapper}>
        <form action="">
          <TextField
            type={"text"}
            placeholder={"First name"}
            id="firstname"
            label={"First Name"}
            value={formData.firstname}
          />
          <TextField
            label={"Last name"}
            type={"text"}
            placeholder={"Last name"}
            id="lastname"
            value={formData.lastname}
          />
          <TextField
            label={"Email Address"}
            type={"email"}
            placeholder={"Enter email address"}
            id="email"
            value={formData.email}
          />
          <TextField
            label={"Create a password"}
            type={"password"}
            placeholder={"Password"}
            id="password"
            value={formData.password}
          />
          <TextField
            label={"Confirm password"}
            type={"password"}
            placeholder={"Enter password"}
            id="confirmPassword"
            value=""
          />
        </form>
      </div>
    </div>
  );
};

export default Employer;

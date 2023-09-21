import { useState } from "react";
import TextField from "../../../components/TextField";
import s from "./index.module.scss";
import Select from "react-select";
import { PhoneInput } from "react-international-phone";
const Personal = () => {
  const data = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    password: "",
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
    <div className={s.formWrapper}>
      <form>
      {/* User's personal information */}
      <div>
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
            name={"confirmPassword"}
          placeholder={"Enter password"}
          id="confirmPassword"
        />
        {JSON.stringify(errors)}
      </div>
    </form>
    </div>
  );
};

export default Personal;

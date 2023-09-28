import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import s from "./EmployerForm.module.scss";
import TextField from "../../../components/TextField";
import { updateField } from "../../../utils/functions/updateForm";
import { Link } from "react-router-dom";
const EmployerRegistration = () => {
  const data = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "",
    dob: "",
    acceptedPrivacy: false,
  };
  const err = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
    dob: "",
    acceptedPrivacy: "",
  };
  const [formData, setFormdata] = useState(data);
  const [errors, setErrors] = useState(err);
  const confirmPassword = (e) => {
    const { name, value } = e.target;
    if (
      (name === "confirmPassword" && value !== formData.password) ||
      (name === "password" && value !== formData.confirmPassword)
    ) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
    } else {
      setErrors({ ...errors, confirmPassword: "" });
    }
  };
  const checkPasswordLength = (e) => {
    if (e.target.value.length < 8) {
      setErrors({
        ...errors,
        password: "Password must have at least 8 characters",
      });
    } else {
      setErrors({
        ...errors,
        password: "",
      });
    }
  };
  const validateFirstName = () => {
    if (formData.firstname.length < 3) {
      setErrors({
        ...errors,
        firstname: "Name cannot be less than 3 characters",
      });
    } else if (/\d/.test(formData.firstname)) {
      setErrors({
        ...errors,
        firstname: "Name cannot contain a number",
      });
    } else {
      setErrors({
        ...errors,
        firstname: "",
      });
    }
  };
  const validateLastName = () => {
    if (formData.lastname.length < 3) {
      setErrors({
        ...errors,
        lastname: "Name cannot be less than 3 characters",
      });
    } else if (/\d/.test(formData.lastname)) {
      setErrors({
        ...errors,
        lastname: "Name cannot contain a number",
      });
    } else {
      setErrors({
        ...errors,
        lastname: "",
      });
    }
  };
  const validateEmail = () => {
    if (
      ![...formData.email].includes("@") ||
      ![...formData.email].includes(".")
    ) {
      setErrors({
        ...errors,
        email: "Invalid email format",
      });
    } else {
      setErrors({
        ...errors,
        email: "",
      });
    }
  };
  const validatePhone = () => {
    if (formData.phone.length < 7) {
      setErrors({
        ...errors,
        phone: "Invalid phone number",
      });
    } else {
      setErrors({
        ...errors,
        phone: "",
      });
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
    validatePhone();
  };
  return (
    <div className={s.formWrapper}>
      <div className={s.top}>
        <h3>Let's get you started!</h3>
        <h5>Get started and connect with different professionals.</h5>
      </div>
      <form onSubmit={validateForm}>
        {/* User's personal information */}
        <div>
          {/* Name */}
          <div className={s.NameFields}>
            <TextField
              onchange={(e) => {
                updateField(
                  e.target.value,
                  e.target.name,
                  setFormdata,
                  formData
                );
                // validateFirstName();
              }}
              onblur={validateFirstName}
              label={"First name"}
              type={"text"}
              name={"firstname"}
              placeholder={"eg John"}
              id="firstname"
              required
              err={errors.firstname}
              value={formData.firstname}
            />
            <TextField
              onchange={(e) =>
                updateField(
                  e.target.value,
                  e.target.name,
                  setFormdata,
                  formData
                )
              }
              label={"Last name"}
              type={"text"}
              onblur={validateLastName}
              name={"lastname"}
              placeholder={"eg Doe"}
              id="lastname"
              required
              err={errors.lastname}
              value={formData.lastname}
            />
          </div>
          <TextField
            onchange={(e) =>
              updateField(e.target.value, e.target.name, setFormdata, formData)
            }
            onblur={validateEmail}
            label={"Email Address"}
            type={"email"}
            name={"email"}
            placeholder={"e.g JohnDoe@email.com"}
            required
            id="email"
            err={errors.email}
            value={formData.email}
          />
          <div className={s.phone}>
            <p className={s.TextLabel}>Phone</p>
            <PhoneInput
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0px",
                maxHeight: "28px",
              }}
              inputProps={{
                required: true,
                "aria-required": true,
                onBlur: validatePhone,
              }}
              inputStyle={{
                width: "100%",
                border: "1px solid rgb(194, 192, 192)",
                height: "30px",
              }}
              value={formData.phone}
              required
              id="phone"
              onChange={(e) => updateField(e, "phone", setFormdata, formData)}
            />
            {errors.phone && <h5 className={s.inputErr}> {errors.phone}</h5>}
          </div>
            <p className={`${s.TextLabel} ${s.GenderLabel}`}>Gender</p>
          <div className={s.GenderFields}>
            <TextField
              type="radio"
              id={"male"}
              label={"Male"}
              value={"Male"}
              name={"gender"}
              err={errors.gender}
              onchange={() =>
                updateField("male", "gender", setFormdata, formData)
              }
            />
            <TextField
              id={"gender"}
              label={"Female"}
              value={"Female"}
              name={"gender"}
              err={errors.gender}
              onchange={() =>{
                updateField("female", "gender", setFormdata, formData)
              console.log(formData)}
              }
              type="radio"
            />
          </div>
          <TextField
            onchange={(e) =>
              updateField(e.target.value, e.target.name, setFormdata, formData)
            }
            label={"Date of birth"}
            type={"date"}
            name="dob"
            required
            placeholder={"dd/mm/yy"}
            id={"dob"}
            err={errors.dob}
            value={formData.dob}
          />

          <TextField
            eye={"password"}
            onchange={(e) => {
              updateField(e.target.value, e.target.name, setFormdata, formData);
              confirmPassword(e);
              checkPasswordLength(e);
            }}
            label={"Password"}
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            id="password" 
            required
            err={errors.password}
            value={formData.password}
          />
          <TextField
            eye={"confirmPassword"}
            onchange={(e) => {
              updateField(e.target.value, e.target.name, setFormdata, formData);
              confirmPassword(e);
            }}
            required
            label={"Retype password"}
            type={"password"}
            name={"confirmPassword"}
            err={errors.confirmPassword}
            placeholder={"Enter password"}
            id="confirmPassword"
          />
        </div>
        
          <div className={s.signinOptions}>
          <div className={s.formDivider}>
          <p className={s.line}></p>
          <p>or</p>
          <p className={s.line}></p>
          </div>
          <div>
          <button type={"button"} className={s.optionButton}>
          Sign in with Google
          
          </button>
 <button type={"button"} className={s.optionButton}>
          Sign in with Linkedin
          </button>
          </div>
          </div>
        
        <div className={s.Bottom}>
          <div className={s.privacy}>
            <TextField
              type={"checkbox"}
              id={"acceptedPrivacy"}
              name={"acceptedPrivacy"}
              required
              value={formData.acceptedPrivacy}
              onchange={() =>
                updateField(
                  !formData.acceptedPrivacy,
                  "acceptedPrivacy",
                  setFormdata,
                  formData
                )
              }
            />
            <label htmlFor="privacy">
              I agree to the{" "}
              <Link to="./">Terms of service</Link> and{" "}
              <Link to="./">Privacy Policy</Link>
            </label>
          </div>

          <button
            disabled={formData.acceptedPrivacy ? false : true}
            type="submit"
          >
            Create account
          </button>
          <p>
            Already have an account? <Link to="./">Log in</Link>
          </p>
        </div>
      </form>
    </div>
    
  );
};

export default EmployerRegistration;

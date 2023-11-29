import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import s from "./RegistrationForm.module.scss";
import TextField from "../../../components/TextField";
import { updateField } from "../../../utils/functions/updateForm";
import { Link } from "react-router-dom";
import AuthOptions from "../../../components/AuthOptions";
import FormSubmitBtn from "../../../components/FormSubmitBtn";
import Checkbox from "../../../components/Checkbox";
import RadioButton from "../../../components/RadioButton";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import User from "../../../utils/classes/User";
import Verification from "../Verification";

const RegistrationForm = ({ userType }) => {
  // Variables
  const data = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "",
    dob: "",
    acceptedPrivacy: false,
    userType: userType,
  };
  const err = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
    dob: "",
    acceptedPrivacy: "",
  };
  const endpoints = {
    EMPLOYER:
      "https://job-hub-591ace1cfc95.herokuapp.com/api/employers/createEmployer",
    TECHTALENT:
      "https://job-hub-591ace1cfc95.herokuapp.com/api/employers/createEmployer",
    AGENT:
      "https://job-hub-591ace1cfc95.herokuapp.com/api/employers/createEmployer",
  };

  // state
  const [formData, setFormdata] = useState(data);
  const [errors, setErrors] = useState(err);
  const [showModal, setShowModal] = useState(true);

  // functions
  const getEndpoint = () => {
    if (userType === "EMPLOYER") {
      console.log("employer");
      return endpoints.EMPLOYER;
    } else if (userType === "TECHTALENT") {
      console.log("techtalent");
      return endpoints.TECHTALENT;
    } else if (userType === "AGENT") {
      console.log("agent");
      return endpoints.AGENT;
    } else {
      console.log("Error Please try again");
    }
  };
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
  const validateName = (value, fieldname) => {
    if (value.length < 3) {
      setErrors({
        ...errors,
        [fieldname]: "Name cannot be less than 3 characters",
      });
    } else if (/\d/.test(value)) {
      setErrors({
        ...errors,
        [fieldname]: "Name cannot contain a number",
      });
    } else {
      setErrors({
        ...errors,
        [fieldname]: "",
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
      return true;
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
    const valid = validatePhone();
    const user = new User(formData);
    valid
      ? axios
          .post(
            "https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/register/",
            user
          )
          .then((res) => res.status)
          .then((status) => {
            console.log(status);
            console.log("success");
          })
          .catch((err) => console.log("error", err))
          .then(
            axios
              .post(getEndpoint(), user)
              .then((res) => {
                console.log("Second call", res);
                setShowModal(true);
              })
              .catch((err) => console.log("Second callErr", err))
          )
      : console.log("invalid data");
  };

  return (
    <>
    
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
              onchange={(e) => updateField(e, setFormdata)}
              label={"First Name"}
              type={"text"}
              name={"firstName"}
              placeholder={"First name"}
              id="firstName"
              value={formData.firstName}
              required
              onblur={() => {
                validateName(formData.firstName, "firstName");
              }}
              err={errors.firstName}
            />
            <TextField
              onchange={(e) => updateField(e, setFormdata)}
              value={formData.lastName}
              required
              onblur={() => {
                validateName(formData.lastName, "lastName");
              }}
              label={"Last name"}
              type={"text"}
              name={"lastName"}
              placeholder={"Last name"}
              id="lastName"
              err={errors.lastName}
            />
          </div>
          <TextField
            onchange={(e) => updateField(e, setFormdata)}
            onblur={validateEmail}
            label={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"Enter your email"}
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
                maxHeight: "36px",
              }}
              inputProps={{
                required: true,
                "aria-required": true,
                onBlur: validatePhone,
              }}
              inputStyle={{
                width: "100%",
                border: "1px solid rgb(194, 192, 192)",
                height: "36px",
                borderTopRightRadius: "6.4px",
                borderBottomRightRadius: "6.4px",
              }}
              value={formData.phone}
              required
              id="phone"
              defaultCountry="ng"
              onChange={(e) => setFormdata((data) => ({ ...data, phone: e }))}
            />
            {errors.phone && <h5 className={s.inputErr}> {errors.phone}</h5>}
          </div>
          <p className={`${s.TextLabel} ${s.GenderLabel}`}>Gender</p>
          <div className={s.GenderFields}>
            <RadioButton
              id={"male"}
              label={"Male"}
              value={"Male"}
              name={"gender"}
              required
              err={errors.gender}
              onchange={(e) => updateField(e, setFormdata)}
            />
            <RadioButton
              required
              id={"gender"}
              label={"Female"}
              value={"Female"}
              name={"gender"}
              err={errors.gender}
              onchange={(e) => updateField(e, setFormdata)}
              type="radio"
            />
          </div>
          <TextField
            onchange={(e) => updateField(e, setFormdata)}
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
            onchange={(e) => {
              updateField(e, setFormdata);
              confirmPassword(e);
              checkPasswordLength(e);
            }}
            label={"Password"}
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            id="password"
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            err={errors.password}
            value={formData.password}
          />
          <TextField
            onchange={(e) => {
              updateField(e, setFormdata);
              confirmPassword(e);
            }}
            required
            label={"Confirm password"}
            type={"password"}
            name={"confirmPassword"}
            err={errors.confirmPassword}
            placeholder={"Re-enter password"}
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            id="confirmPassword"
          />
        </div>

        <div className={s.Bottom}>
          <div className={s.privacy}>
            <Checkbox
              id={"acceptedPrivacy"}
              name={"acceptedPrivacy"}
              required
              value={formData.acceptedPrivacy}
              onchange={(e) =>
                setFormdata((data) => ({
                  ...data,
                  acceptedPrivacy: !data.acceptedPrivacy,
                }))
              }
            />
            <label htmlFor="privacy">
              I agree to the <Link to="./">Terms of service</Link> and{" "}
              <Link to="./">Privacy Policy</Link>
            </label>
          </div>

          <FormSubmitBtn
            formData={formData}
            fieldDependency={"acceptedPrivacy"}
            register
            value="Register"
          />
          <AuthOptions register />

          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </form>
      <Link to={"/register"} className={s.backButton}>
        <BsArrowLeft /> back
      </Link>
    </div>
    {showModal&& <Verification />}
    </>
  );
};

export default RegistrationForm;

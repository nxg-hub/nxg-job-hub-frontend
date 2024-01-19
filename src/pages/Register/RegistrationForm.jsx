import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import s from "./RegistrationForm.module.scss";
import TextField from "../../components/TextField";
import { updateField } from "../../utils/functions/updateField";
import { Link } from "react-router-dom";
import AuthOptions from "../../components/AuthOptions";
import FormSubmitBtn from "../../components/FormSubmitBtn";
import Checkbox from "../../components/Checkbox";
import RadioButton from "../../components/RadioButton";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import User from "../../utils/classes/User";
import EmailVerificationNotice from "../../components/EmailVerificationNotice";
import Notice from "../../components/Notice";
import { API_HOST_URL } from "../../utils/api/API_HOST";

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

  // state
  const [formData, setFormdata] = useState(data);
  const [errors, setErrors] = useState(err);
  const [showEmailVerificationNotice, setShowEmailVerificationNotice] =
    useState(false);
  const [popup, showPopup] = useState(undefined);

  // functions
  const closeModal = (e) => {
    if (e.target === e.currentTarget) setShowEmailVerificationNotice(false);
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
        password: "Minimum 8 characters with letters and numbers.",
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
    if (valid) {
      showPopup({
        type: "info",
        message: `Signing up...`,
      });
      axios
        .post(`${API_HOST_URL}/api/v1/auth/register/`, user)
        .then((res) => {
          if (res.status) {
            setShowEmailVerificationNotice(true);
            showPopup({
              type: "success",
              message: res.data,
            });
            setTimeout(() => showPopup(undefined), 5000);
          }
        })
        .catch((err) => {
          showPopup({
            type: "danger",
            message: `Failed to register. ${
              err.response.data
                ? err.response.data
                : "Please check your internet connection and try again"
            }`,
          });

          setTimeout(() => showPopup(undefined), 5000);
        });
    } else {
      showPopup({
        type: "danger",
        message: `Invalid data`,
      });
    }

    setTimeout(() => showPopup(undefined), 5000);
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
              autoComplete="username"
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
              autoComplete="new-password"
              id="password"
              required
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
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
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              id="confirmPassword"
              autoComplete="confirm-password"
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
              <label htmlFor="acceptedPrivacy">
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
      {showEmailVerificationNotice && (
        <EmailVerificationNotice onClick={closeModal} />
      )}
      {popup && <Notice type={popup.type} message={popup.message} />}
    </>
  );
};

export default RegistrationForm;

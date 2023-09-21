import { useState } from "react";
import Select from "react-select";
import { PhoneInput } from "react-international-phone";
import s from "./index.module.scss";
import TextField from "../../../components/TextField";
import { genderOption } from "../../../utils/data/employer";
import { updateField } from "../../../utils/functions/updateForm";
import { validateForm } from "../../../utils/functions/validateForm";
import { Link } from "react-router-dom";
const EmployerRegistration = () => {
  const data = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    password: "",
  };
  const err = {
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  };
  const genderOptions = genderOption.map((gender) => ({
    value: gender,
    label: gender,
  }));
  const [formData, setFormdata] = useState(data);
  const [errors, setErrors] = useState(err);
  const [hasError, setHasError] = useState(false);

  const confirmPassword = (e) => {
    if (e.target.value !== formData.password) {
      setErrors({ ...errors, password: "Passwords do not match" });
      setHasError(true);
    } else {
      setErrors({ ...errors, password: "" });
      setHasError(false);
    }
  };
  return (
    <div className={s.formWrapper}>
      <form
        onSubmit={(e) =>
          validateForm(e, formData, setErrors, errors, setHasError)
        }
      >
        {/* User's personal information */}
        <div>
          <h3>Personal Information</h3>
          {/* Name */}
          <TextField
            onchange={(e) =>
              updateField(e.target.value, e.target.name, setFormdata, formData)
            }
            label={"Name"}
            type={"text"}
            name={"fullname"}
            placeholder={"eg John Doe"}
            id="fullname"
            required
            err={errors.name}
            value={formData.fullname}
          />
          <TextField
            onchange={(e) =>
              updateField(e.target.value, e.target.name, setFormdata, formData)
            }
            label={"Email Address"}
            type={"email"}
            name={"email"}
            placeholder={"e.g JohnDoe@email.com"}
            required
            id="email"
            err={errors.email}
            value={formData.email}
          />
          <div className="phone ">
            <p className={s.TextLabel}>Phone</p>
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
              id="phone"
              onChange={(e) => updateField(e, "phone", setFormdata, formData)}
            />
            {errors.phone && <h5> {errors.phone}</h5>}
          </div>
          <div className={s.gender}>
            <p className={s.TextLabel}>Phone</p>
            <Select
              onChange={(e) =>
                updateField(e.value, "gender", setFormdata, formData)
              }
              id="gender"
              required
              options={genderOptions}
            />
            {errors.gender && <h5> {errors.gender}</h5>}
          </div>
          <TextField
            onchange={(e) =>
              updateField(e.target.value, e.target.name, setFormdata, formData)
            }
            label={"Residential Address"}
            type={"text"}
            name="address"
            placeholder={"eg 5 Saint Grove, California "}
            required
            id={"address"}
            err={errors.address}
            value={formData.address}
          />

          <TextField
            eye={"password"}
            onchange={(e) =>
              updateField(e.target.value, e.target.name, setFormdata, formData)
            }
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
            onchange={(e) =>
              updateField(e.target.value, e.target.name, setFormdata, formData)
            }
            label={"Retype password"}
            type={"password"}
            name={"confirmPassword"}
            err={errors.confirmPassword}
            placeholder={"Enter password"}
            id="confirmPassword"
          />
        </div>
        <p>
          By clicking "Create account" you accept the{" "}
          <Link to="./">Terms of service</Link> and{" "}
          <Link to="./">Privacy Policy</Link>
        </p>

        <button
          // disabled={hasError ? true : false}
          type="submit"
        >
          Create account
        </button>
        <p>
          Already have an account? <Link to="./">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default EmployerRegistration;

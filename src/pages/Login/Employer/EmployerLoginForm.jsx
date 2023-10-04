import s from "./EmployerLoginForm.module.scss";
import TextField from "../../../components/TextField";
import AuthOptions from "../../../components/AuthOptions";
import { useState } from "react";
import { updateField } from "../../../utils/functions/updateForm";
import FormSubmitBtn from "../../../components/FormSubmitBtn";
const EmployerLoginForm = () => {
  const data = {
    email: "",
    password: "",
    remember_me: "",
  };
  const errors = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(data);
  const [formErrors, setFormErrors] = useState(data);
  return (
    <form className={s.FormWrapper}>
      <TextField
        onchange={(e) =>
          updateField(e.target.value, "email", setFormData, formData)
        }
        label={"Email"}
        placeholder={"Enter your email"}
        type={"email"}
        value={formData.email}
        id={"email"}
        name={"email"}
        required
      />
      <TextField
        onchange={(e) =>
          updateField(e.target.value, "password", setFormData, formData)
        }
        label={"Password"}
        placeholder={"Enter your password"}
        type={"password"}
        value={formData.password}
        name={"password"}
        id={"password"}
        required
      />
      <FormSubmitBtn formData={formData} fieldDependency={"password"} login={true} value={"Sign In"} />
      <AuthOptions login />
      {console.log(formData.password)}
    </form>
  );
};

export default EmployerLoginForm;

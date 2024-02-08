import s from "./index.module.scss";
import TextField from "../../components/TextField";
import { updateField } from "../../utils/functions/updateField";
import { useState } from "react";
import logo from "../../static/images/nxg-logo.png";
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className={s.Container}>
      <div className={s.LoginFormWrapper}>
        <img src={logo} alt="" />
        <form action="">
          <h2>Login to Admin Dashboard</h2>
          <h3>Login as an administrator</h3>
          <div>
            <TextField
              label={"email"}
              type={"email"}
              name={"email"}
              id={"email"}
              placeholder="Enter admin email "
              onchange={(e) => updateField(e, setFormData)}
              value={formData.email}
            />
            <TextField
              label={"password"}
              type={"password"}
              name={"password"}
              id={"password"}
              placeholder="Enter admin password"
              onchange={(e) => updateField(e, setFormData)}
              value={formData.password}
            />
          </div>
          {/* <Checkbox
          id={"remembber"}
          label={"Keep me logged in"}
          // onchange={}
        /> */}
          <button
            disabled={
              (formData.email !== "" && formData.password !== "") ? true : false
            }
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

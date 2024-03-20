import { useState } from "react";
import TextField from "../../components/TextField";
import { updateField } from "../../utils/functions/updateField";
import { useSearchParams } from "react-router-dom";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import axios from "axios";
const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  window.sessionStorage.setItem("token", `Bearer ${token}`);
  const handleReset = async (e) => {
    e.preventDefault();
    if (formData.password!== "" || formData.confirmPassword !=="") {
      let data = {
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      try {
        let res = await axios.post(
          `${API_HOST_URL}/api/v1/auth/update-password/`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res);
      } catch (err) {
        // console.log(err)
        return
      }
    }
    console.log("empty");
  };
  return (
    <div>
      <div
        className="reset-main"
        style={{
          width: "30%",
          padding: "1rem 2.4rem",
          border: "0.03rem solid #2596BE",
          borderRadius: "0.8rem",
        }}
      >
        <h2
          style={{
            fontFamily: "Inter",
            fontSize: "1.6rem",
            fontWeight: "600",
            lineHeight: "2.5rem",
            marginBottom: "1rem",
          }}
        >
          Reset Password
        </h2>
        <form className="reset-form" onSubmit={handleReset}>
          <TextField
            name={"password"}
            onchange={(e) => updateField(e, setFormData)}
            id={"newpassword"}
            label={"New password"}
            type={"password"}
            placeholder={"Enter a new password"}
          />
          <TextField
            name={"confirmPassword"}
            onchange={(e) => updateField(e, setFormData)}
            id={"confirmpassword"}
            label={"Confirm new password"}
            type={"password"}
            placeholder={"Confirm new password"}
          />
          <button
            style={{
              background: "#2596BE",
              color: "#fff",
              padding: ".6rem",
              width: "100%",
              border: "none",
              borderRadius: ".4rem",
              margin: "1rem 0",
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

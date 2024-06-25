import { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import { updateField } from "../../utils/functions/updateField";
import logo from "../../static/images/nxg-logo.png"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import axios from "axios";
import Notice from "../../components/Notice";
const ResetPassword = () => {
const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token") || window.sessionStorage.getItem("token") || navigate("/login");
  window.sessionStorage.setItem("token", token);
  const handleReset = async (e) => {
    e.preventDefault();
    if (formData.password !== "" || formData.confirmPassword !== "") {
      let data = {
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      try {
        setMessage({
          type: "info",
          content: "resetting password",
        });
        let res = await axios.post(
          `${API_HOST_URL}/api/v1/auth/update-password/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            
            },
            
          }
        );
       res.status===200 && setMessage({
          type: "warning",
          content: "Could not send reset password email",
        });
        setTimeout(() => setMessage(null), 5000);
        navigate("/login")
        console.log(res);
      } catch (err) {
        setMessage({
          type: "warning",
          content: "Could not reset password ",
        });
        setTimeout(() => setMessage(null), 5000);
        return
      }
    }
    console.log("empty");
  };
  useEffect(() => {
    setSearchParams("")
  }, [setSearchParams])
  return (
    <div>
      <Link to="/login" >
      <img style={{ height:"70px", width: "auto", margin:"15px"}} src={logo} alt="" />
      </Link>
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
      
      {message && <Notice type={message.type} message={message.content} />}
    </div>
  );
};

export default ResetPassword;

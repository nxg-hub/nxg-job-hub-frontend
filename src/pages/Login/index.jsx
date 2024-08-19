import React, { useEffect, useState } from "react";
import "./index.scss";
import "../../components/accounts/inputs.scss";
import Logo from "../../static/images/logo_colored.png";
import Logpics from "../../static/images/login-pics.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notice from "../../components/Notice";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import TextField from "../../components/TextField";
import AuthOptions from "../../components/AuthOptions";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [popup, showpopUp] = useState(undefined);

  const navigate = useNavigate();

  const onCheck = () => {
    setCheck(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      showpopUp({
        type: "info",
        message: `Logging in...`,
      });
      const res = await axios.post(`${API_HOST_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      const authKey = res.headers.authorization;

      const userRes = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          "Content-Type": "application/json",
          authorization: authKey,
        },
      });

      const id = userRes.data.id; // Assuming the user ID is returned in the response

      if (check && authKey) {
        // if "remember me" is set, Save authentication key to local storage
        window.localStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify({ authKey, email, id })
        );
      } else if (!check && authKey) {
        // if login without "remember me", start a session
        window.sessionStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify({ authKey, email, id })
        );
      } else if (authKey) {
        // if login without "remember me", start a session
        window.localStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify(authKey)
        );
      }

      if (!userRes.data.userType) {
        navigate("/create");
      } else {
        navigate(
          userRes.data.userType === "employer"
            ? "/profilelanding"
            : "/dashboard"
        );
      }
    } catch (error) {
      let errorMessage = error.response.data || error.message;
      console.log(error);

      showpopUp({
        type: "danger",
        message: "Login failed, " + errorMessage,
      });
      setTimeout(() => showpopUp(undefined), 5000);
    }
  };
  const AutoLoginUser = async () => {
    const storedData = JSON.parse(
      window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")
    );
    if (storedData) {
      const userRes = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          "Content-Type": "application/json",
          authorization: storedData.authKey,
        },
      });
      if (!userRes.data.userType) {
        navigate("/create");
      } else {
        navigate("/dashboard");
      }
    }
  };
  useEffect(() => {
    AutoLoginUser();
    // .then(() => {
    //   // Handle successful login if needed
    // })
    // .catch((error) => {
    //   console.error("Auto login failed:", error);
    // });
  });
  return (
    <div className="login-main-container">
      <div className="form-col">
        <div className="log-bg">
          <div className="tech-img">
            <img src={Logo} alt="NXG-Logo" className="logo" />
          </div>
          <img src={Logpics} alt="Loginpics" className="loginpics" />
        </div>
        <form className="logintech" onSubmit={handleLogin}>
          <div className="title">
            <h1>Sign In to your Account</h1>
            <p>Login to your account</p>
          </div>
          <div className="log-form">
            <TextField
              type="text"
              name="email"
              label={"Email"}
              placeholder="Enter your email address"
              autoComplete="username"
              onchange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              type="password"
              name="password"
              label={"Password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              onchange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="forgot">
              <Link
                to="/forgotpassword"
                style={{ color: "#A39E9E", textDecoration: "underline" }}>
                Forgot Password?
              </Link>
            </div>
            <div className="remember">
              <div
                className="check"
                style={{ display: "flex", alignItems: "center" }}>
                <input
                  id="checkbox"
                  type="checkbox"
                  aria-label="checkbox"
                  checked={check}
                  onChange={onCheck}
                />
                <label
                  htmlFor="checkbox"
                  style={{
                    fontSize: ".7rem",
                    fontWeight: "500",
                    fontFamily: "Inter",
                    margin: ".4rem",
                  }}>
                  Keep me logged in
                </label>
              </div>
            </div>
            <div className="btn">
              <button style={{ background: "#2596BE" }}>Sign In</button>
            </div>
          </div>
          <AuthOptions login={true} />
          <p className="signup">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#2596BE", textDecoration: "underline" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      {popup && <Notice type={popup.type} message={popup.message} />}
    </div>
  );
};

export default Login;

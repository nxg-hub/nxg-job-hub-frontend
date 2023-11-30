import React, { useEffect, useState } from "react";
import "./index.scss";
import "../../components/accounts/inputs.scss";
import Logo from "../../static/images/logo_colored.png";
import Logpics from "../../static/images/login-pics.png";
import Inputs from "../../components/accounts/Inputs";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const { authKey } = JSON.parse(
    window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onCheck = () => {
    setCheck(!check);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please enter your details");
    } else {
      axios
        .post("https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          const authKey = res.headers.authorization;
          try {
            window.localStorage.setItem(
              "NXGJOBHUBLOGINKEYV1",
              JSON.stringify({ authKey, email })
            );
          } catch (err) {
            console.log("Could not save JWT", err);
          }
          return authKey;
        })
        .then((authKey) => {
          axios
            .get(
              "https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user",
              {
                headers: {
                  authorization: authKey,
                },
              }
            )
            .then((res) => {
              !res.data.userType ? navigate("/create") : navigate("/dashboard");
            });
        })
        .catch((err) => console.log("loginErr", err));
    }
  };
  useEffect(() => {
    if (authKey)
      axios
        .get(
          "https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user",
          { headers: { authorization: authKey } }
        )
        .then((res) => {
          res.data.userType ? navigate("/dashboard") : navigate("/create");
        });
  }, [authKey, navigate]);
  return (
    <div className="login-main-container">
      <div className="form-col">
        <div className="log-bg">
          <div
            style={{
              width: "7rem",
              height: "5rem",
              position: "absolute",
              margin: "8px 0 0 8px",
            }}
            className="tech-img"
          >
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
            <Inputs
              type="email"
              title="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              errormessage="Email must inculde special charaters like @ and .!"
              required
            />
            <div className="password">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                  autoComplete="current-password"
                  errormessage="Password should be a minimum of 8 characters and should inculde at least 1 special charater, numbers and letters!"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" //Minimum eight characters, at least one letter, one number and one special character
                  // required
                />
                <button
                  onClick={handleShowPassword}
                  className="pass-toggle log-pass"
                >
                  {showPassword ? (
                    <BsEye onClick={handleShowPassword} />
                  ) : (
                    <BsEyeSlash onClick={handleShowPassword} />
                  )}
                </button>
              </div>
            </div>
            <div className="forgot">
              <Link
                to="/forgotpassword"
                style={{ color: "#A39E9E", textDecoration: "underline" }}
              >
                Forgot Password?
              </Link>
            </div>
            <div className="remember">
              <div
                className="check"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  aria-label="checkbox"
                  checked={check}
                  onChange={onCheck}
                />
                <label
                  style={{
                    fontSize: ".7rem",
                    fontWeight: "500",
                    fontFamily: "Inter",
                    margin: ".4rem",
                  }}
                >
                  Keep me logged in
                </label>
              </div>
            </div>
            <div className="btn">
              <button style={{ background: "#2596BE" }}>Sign In</button>
            </div>
          </div>
          <div className="social-acct social-log">
            <div className="or">
              <div className="line"></div>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: "400",
                  fontFamily: "Roboto",
                }}
              >
                or
              </p>
              <div className="line"></div>
            </div>
            <button className="google" style={{ margin: "1rem 0" }}>
              <FcGoogle style={{ width: "1rem", height: "1rem" }} />
              <span>Sign Up with Google</span>
            </button>
            <button className="google">
              <FaLinkedin
                style={{ color: "#2596BE", width: "1rem", height: "1rem" }}
              />
              <span>Sign Up with LinkedIn</span>
            </button>
          </div>
          <p className="signup">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#2596BE", textDecoration: "underline" }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
// import Logo from "../../static/images/logo_colored.png";
import Logo from "../../static/images/splash.png";
import Inputs from "../../components/accounts/Inputs";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import Notice from "../../components/Notice";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${API_HOST_URL}/api/v1/auth/reset-password-email/${email}`
    );
    const data = response.data;
    if (response.status === 200) {
      console.log(response);
      setMessage({
        type: "info",
        content: data,
      });
      setTimeout(() => setMessage(null), 5000);
    } else {
      setMessage({
        type: "warning",
        content: "Could not send reset password email",
      });
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className="forgot-container">
        <div style={{ width: "7rem", height: "5rem", margin: "auto" }}>
          <img src={Logo} alt="NXG-Logo" className="logo" />
        </div>
        <div className="forgot-text">
          <h1
            style={{
              fontFamily: "Inter",
              fontSize: "1.5rem",
              fontWeight: "600",
              lineHeight: "2.5rem",
              marginBottom: "1.3rem",
            }}>
            Forgot Password
          </h1>
          <p
            style={{
              fontFamily: "Inter",
              fontSize: ".8rem",
              fontWeight: "500",
              lineHeight: "1.4rem",
            }}>
            Enter the email address associated to your account and we will send
            you a link <br />
            to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Inputs
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
            errormessage="Email must include special charaters like @ and .!"
            required
          />
          <div className="btn" id="forgot-btn">
            <button style={{ background: "#2596BE" }} type="submit">
              Submit
            </button>
          </div>
        </form>
        {/* Display the message from the server */}
        <p
          style={{
            textAlign: "start",
            fontSize: ".8rem",
            fontWeight: "500",
            fontFamily: "Montserrat",
            marginTop: "-2.5rem",
          }}></p>
        <p className="forgot-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
      {message && <Notice type={message.type} message={message.content} />}
    </div>
  );
};

export default PasswordRecovery;

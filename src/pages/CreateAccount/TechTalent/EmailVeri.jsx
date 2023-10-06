import React from 'react';
import Mail from "../../../assests/mail.png";
import { Link } from "react-router-dom";

const EmailVeri = () => {
  return (
    <div>
        <div className="verify-main" style={{width:"30%", padding:"1rem 2.4rem", border:"none", borderRadius:"0.8rem", boxShadow:".2rem 0.2rem 0.2rem #8e8e8e" }}>
            <div>
                <h2 style={{ fontFamily: "Inter", fontSize: "1.6rem", fontWeight: "600", lineHeight: "2.5rem" }}>Email Verification</h2>
                 <p style={{ fontFamily: "Inter", fontSize: ".8rem", fontWeight: "500" }}>Let's verify your account</p>
            </div>
            <div style={{ width: "5rem", height: "3rem", margin: "2rem 0 2rem 40%" }}>
                <img className="mail-img" src={Mail} alt="Mail-icon" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: '.7rem', marginBottom: '.4rem', lineHeight: '1rem', fontWeight: "500" }}>
                  An email has been sent to your mailbox <br />
                  Click on the link to activate your account.
                </p>
                <Link style={{ fontSize: ".7rem", fontWeight: "400", color: "#8e8e8e", textDecoration: "underline" }}>Resend e-mail</Link>
            </div>
        </div>
    </div>
  )
}

export default EmailVeri
import React, { useState } from "react";
import Logo from "../../../static/images/logo_colored.png";
import ProfileForm from "./ProfileForm";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa'
import { Dialog } from "@headlessui/react";
import EmailVeri from "./EmailVeri";
import { Otp } from "../../LoginAccount/Otp";


const TechTalent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    birthDate: new Date(),
    selectedOption: "",
  });

  const [check, setCheck] = useState("");
  const [verificationMode, setVerificationMode] = useState(""); //To track the various verification mode
  const [isVerificationStarted, setIsVerificationStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onUpdateFormData = (newFormData) => {
    setFormData(newFormData);
  }

  const onCheck = () => {
    setCheck(!check);
  }

  const navigate = useNavigate();

  const handleEmailVerification = (e) => {
    e.preventDefault();
    if (!isVerificationStarted) {

      setIsVerificationStarted(true);
      navigate("/mailVerification");
      console.log(formData);

    } else {
      alert("Invalid enrty")
    }
  }
  const handleOtpVerification = (e) => {
    e.preventDefault();
    if (!isVerificationStarted) {
      
      setIsVerificationStarted(true);
      navigate("/otp")
      console.log(formData);

    } else {
      alert("Invalid enrty")
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (check) {
      setIsOpen(true);
    }
  }

  return (
    <main className="tech-main-container" style={{ position: "relative", backgroundSize: "cover", height: "100%", backgroundPosition: "center" }} aria-label="main-container">
      <div style={{ width: "7rem", height: "5rem", position: "absolute", margin: "-5px 0 0 -5px" }} className="tech-img">
        <img src={Logo} alt="NXG-Logo" className="logo" />
      </div>
      <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <form className="tech-form" onSubmit={onSubmit}>
          <div className="title">
            <h1>Let's get you started!</h1>
            <p>Get started and connect with different professionals.</p>
          </div>
          <div className="forms">
            <ProfileForm formData={formData} onUpdateFormData={onUpdateFormData} />
            <div
              className="terms"
            >
              <div className="check" style={{display:'flex', alignItems:"center"}}>
                  <input type="checkbox" aria-label='checkbox' onChange={onCheck}/>
                  <label style={{ fontSize: ".7rem", fontWeight:'700', fontFamily:"Montserrat", margin: ".4rem" }}>
                    I agree to <span style={{color:"#2596BE", fontWeight:"500", fontFamily:"Inter"}}>Terms of service</span> and <span style={{color:"#2596BE", fontWeight:"500", fontFamily:"Inter"}}>Privacy of conditions</span>
                  </label>
              </div>
            </div>
            <div className="btn" style={{textAlign:'center',  margin: "2rem 0"}}>
            <button
              style={{ background: check ? "#2596BE" : "gray",}}
              disabled={!check || isVerificationStarted}
            >
                Register
            </button>
          </div>
          </div>
          <div className="social-acct">
            <div className="or">
              <div className="line"></div>
              <p style={{ fontSize: "1rem", fontWeight: "400", fontFamily: "Roboto" }}>or</p>
              <div className="line"></div>
            </div>
            <button className="google" style={{ margin: "1rem 0" }}>
              <FcGoogle style={{ width: "1rem", height: "1rem" }} />
              <span>Sign Up with Google</span>
            </button>
            <button className="google">
              <FaLinkedin style={{ color: "#2596BE", width: "1rem", height: "1rem" }} />
              <span>Sign Up with LinkedIn</span>
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: ".8rem", fontWeight: "500", marginBottom: ".3rem" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#2596BE", textDecoration: "underline" }}
            >
              Log In
            </Link>
          </p>
          <Link to="/" className="back">
            <HiOutlineArrowNarrowLeft style={{ width: "1.5rem", height: "1.5rem", color: "#444444", marginRight: ".3rem" }} />
            <p style={{ fontSize: ".8rem", fontWeight: "600", textDecoration: "underline", color: "#000000", cursor: "pointer" }}>Back</p>
          </Link>
        </form>
        {isOpen && (
          <Dialog
            open={isOpen} onClose={() => setIsOpen(false)}
            style={{ position: "absolute", left: "30%", top: "40%", transform: "translate(-50% -50%)", width: "40rem", height: "25rem", display: "flex", justifyContent: "center", alignItems: "center", background: '#ffffff', border: "0.06rem solid #d9d9d9", borderRadius: '.5rem' }}
          >
            <Dialog.Panel>
              <Dialog.Title style={{ marginBottom: '2rem', color: '#000000', textAlign: "center" }}>
                <div>
                  <h2 style={{ fontFamily: "Inter", fontSize: "1.6rem", fontWeight: "600", lineHeight: "2.5rem" }}>Choose Your Mode Of Verification</h2>
                  <p style={{ fontFamily: "Inter", fontSize: ".8rem", fontWeight: "500" }}>Let's verify your account</p>
                </div>
              </Dialog.Title>
              {!isVerificationStarted ? (
                  <div className="btn" style={{marginTop:"-1.4rem"}}>
                    <button
                        style={{ background: "#2596BE", margin:"1.2rem 0"}}
                        onClick={handleEmailVerification}
                      >
                          Verify with E-mail
                    </button>
                    <button
                          style={{ background: "#2596BE"}}
                          onClick={handleOtpVerification}
                      >
                          Verify with Phone Number
                      </button>
                </div>
                ) : (
                    verificationMode === "email" ? (
                      <EmailVeri setVerificationMode={setVerificationMode} />
                    ) : (
                      <Otp setVerificationMode={setVerificationMode} />
                    )
                )}
            </Dialog.Panel>
          </Dialog>
        )}
      </div>
    </main>
  );
};
export default TechTalent;
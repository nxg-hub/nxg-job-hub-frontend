import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";

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

  const [check, setCheck] = useState(false);
  const [sumittedData, setSubmittedData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const onCheck = () => {
    setCheck(true);
  }

  const onUpdateFormData = (newFormData) => {
    setFormData(newFormData);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    setSubmittedData(formData);
    setIsOpen(true);
    console.log(formData);
    
  }

  return (
    <main className="tech-main-container">
      <h1>Create Account As A Tech Talent</h1>
      <form onSubmit={(e) => onSubmit(e, sumittedData)}>
      <div className="forms">
          <ProfileForm formData={formData} onUpdateFormData={onUpdateFormData} />
        </div>
        <div
          className="terms"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop:'1.3rem'
          }}
        >
          <div className="check" style={{display:'flex', justifyContent:'center', alignItems:'center', margin: ".7rem"}}>
            <input type="checkbox" onChange={onCheck}/>
            <label style={{ fontSize: ".8rem", margin: ".4rem", lineHeight:'.9rem' }}>
              By clicking on this box, you agree to accept our <span style={{color:'#3636f9'}}>
              <b>Terms and Conditions</b></span>
            </label>
          </div>
        </div>
        <div className="btn" style={{textAlign:'center',  margin: ".7rem 0"}}>
          <button
            style={{ background: check ? "#3636f9" : "gray",}}
            disabled={!check}
          >
          Register As a Tech-Talent
        </button>
        </div>
        <p style={{ textAlign: "center", fontSize: ".9rem" }}>
          Already have an account?{" "}
          <Link
            to="/register/employer"
            style={{ color: "#3636f9", fontWeight: "700" }}
          >
            Login
          </Link>
        </p>
      </form>
      {isOpen && (
        <Dialog 
          open={isOpen} onClose={() => setIsOpen(false)}
          style={{position: "absolute", left:"50%", top:"50%", transform:"translate(-50% -50%)", justifyContent:"center", alignItems:"center", background:'lightgrey', borderRadius:'.5rem' }}
        >
          <Dialog.Panel style={{padding:'1rem 1.5rem'}}>
            <Dialog.Title style={{fontSize:"3rem", margin:'.4rem 0', color:'blue'}}>Congratulations!</Dialog.Title>
            <p style={{fontSize:'1.3rem', margin:'.4rem 0', lineHeight:'2.5rem'}}>
              In order to complete your registation, 
              please check your email and click on the verification link to verify your account.
            </p>
            <button onClick={() => setIsOpen(false)} style={{padding:'.6rem', borderRadius:'.5rem', fontSize:'1.2rem', background:'blue', border:'none', color:'white'}}>Close Modal</button>
          </Dialog.Panel>
      </Dialog>
      )}
    </main>
  );
};
export default TechTalent;

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MultiStepProgressbar from './MultiStepProgressbar'
import Logo from '../../../static/images/nxg-logo.png'
import { LiaLessThanSolid } from "react-icons/lia";
import MultiStepForm1 from './steps/MultiStepForm1';
import MultiStepForm2 from './steps/MultiStepForm2';
import MultiStepForm3 from './steps/MultiStepForm3';

function TechTalentProfileForm() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const steps = [
        "MultiStepForm1", 
        "MultiStepForm2",
        "MultiStepForm3"
    ];

    const totalPagesCount = steps.length;

    const displayStep = (stepIndex) => {
        const stepName = steps[stepIndex];
        console.log('Current Step:', stepName);
      
        switch (stepName) {
          case 'MultiStepForm1':
            return <MultiStepForm1 />;
          case 'MultiStepForm2':
            return <MultiStepForm2 />;
          case 'MultiStepForm3':
            return <MultiStepForm3 />;
          default:
            return null;
        }
    };
       
    const handleStep = () => {
        if (index < steps.length - 1) {
            setIndex(index + 1)
        }
    }

    const handleBack = () => {
        if (index > 0) {
          setIndex(index - 1);
        } else {
          // If on the first step, navigate back to the dashboard.
          navigate("/dashboard");
        }
    };
   
  return (
    <div>
        <div className="form-logo" style={{width:"120px", height:"69px", margin:"25px 0 0 96px"}}>
            <img src={Logo} alt="Nxg Company Logo" className="logo" />
        </div>
        <div className="tech-pro-heading">
            <h3>Complete Your Profile</h3>
            <p>Kindly fill in the correct details about yourself.</p>
        </div>
        <MultiStepProgressbar step={index} totalSteps={steps.length}  setIndex={setIndex}/>
        <div className="back-arrow" onClick={handleBack}>
            <LiaLessThanSolid />
        </div>
        {displayStep(index)}
        <div className="tech-pro-btn">
            <button onClick={handleStep}>{index === totalPagesCount - 1 ? "Complete Profile" : "Continue"}</button>
        </div>
        
    </div>
  )
}

export default TechTalentProfileForm
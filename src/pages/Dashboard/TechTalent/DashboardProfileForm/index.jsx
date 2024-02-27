import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MultiStepProgressbar from './MultiStepProgressbar'
import Logo from '../../../../static/images/nxg-logo.png'
import { LiaLessThanSolid } from "react-icons/lia";
import MultiStepForm1 from './steps/MultiStepForm1';
import MultiStepForm2 from './steps/MultiStepForm2';
import MultiStepForm3 from './steps/MultiStepForm3';
import axios from 'axios';
import { API_HOST_URL } from '../../../../utils/api/API_HOST';

function TechTalentProfileForm() {
    const [index, setIndex] = useState(0);
    const [formData, setFormData] = useState({
      countryCode: "",
      zipCode: "",
      residentialAddress: "",
      highestQualification: "",
      professionalCert:"",
      experienceLevel:"",
      yearsOfExperience:"",
      jobType:"", 
      currentJob:"",
      jobInterest:"",
      workMode:"",
      profilePicture:"",
      resume:"",
      coverletter:"",
      bio:"",
      portfolioLink:"",
      linkedInUrl:""
    });

    const [errors, setErrors] = useState({ formData: "" });
    
    const navigate = useNavigate();
    const steps = [
        "MultiStepForm1", 
        "MultiStepForm2",
        "MultiStepForm3"
    ];

    const totalPagesCount = steps.length;
    const [isCurrentFormCompleted, setIsCurrentFormCompleted] = useState(false);

    const displayStep = (stepIndex) => {
        switch (steps[stepIndex]) {
          case 'MultiStepForm1':
            return (<MultiStepForm1 formData={formData} setFormData={setFormData} onComplete={() => handleFormCompletion("MultiStepForm1")}/>);
          case 'MultiStepForm2':
            return (<MultiStepForm2 formData={formData} setFormData={setFormData} onComplete={() =>  handleFormCompletion("MultiStepForm2")} />);
          case 'MultiStepForm3':
            return (<MultiStepForm3 formData={formData} setFormData={setFormData} onComplete={() => handleFormCompletion("MultiStepForm3")} />);
          default:
            return null;
        }
    };

    const handleFormCompletion = () => {
      const formErrors = {};
      if (formData.countryCode === "" || formData.zipCode === "" ) {
        formErrors.formData = 'All fields must be filled';
        setErrors(formErrors);
        setIsCurrentFormCompleted(false);
      } else {
        setIsCurrentFormCompleted(true);
        // Save the form data
        // console.log("Form Data Saved:", formData);
      }
    };
    
    const handleStep = () => {
      if (isCurrentFormCompleted === "") {
        alert('Complete the current form before moving to the next step');
        return;
      }
    
      if (index < steps.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        // If on the last step, navigate or perform completion action
        handleProfileCompletion();
      }
    };
    
    const handleBack = () => {
        if (index > 0) {
          setIndex(index - 1);
        } else {
          // If on the first step, navigate back to the dashboard.
          navigate("/dashboard");
        }
    };

    const handleProfileCompletion = async () => {
      // console.log(formData, 'Profile Completed');
        try {
          const loginKey = window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') || window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
          if (!loginKey) {
            console.error('Authentication key not available.');
            return;
          }
          const { id, authKey } = JSON.parse(loginKey);
          if(!id || !authKey) {
            console.error('User ID  or Auth key not available.');
            return;
          };

          const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
            headers: {
              'Content-Type' : 'application/json',
              authorization: authKey,
            }
          });
      
          const techId = response.data.id;
          // console.log(techId);
          // console.log("Filtered data:", formData);

          const res = await axios.patch(`${API_HOST_URL}/api/v1/tech-talent/${techId}`, formData,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: authKey,
            },
          }
          );
          console.log('Response Data:', res.data);

          navigate("/dashboard")
          
        } catch (error) {
          alert(error.response.data);
          console.error('Error posting data:', error.response);
          console.log('Error posting data:', error.response.data);
        }
    };

    // If you want to log the updated formData again after the async operation,
    // you can use useEffect to observe changes in formData
    useEffect(() => {
      console.log(formData, 'Updated FormData');
    }, [formData]);
   
  return (
    <div className='techForm-main'>
        <div className="form-logo pro-logo" >
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
        {errors.formData && (<p style={{ color: 'red', fontSize: '1rem', fontWeight:"500", background:"#fab1a0", padding:"1rem" }}>{errors.formData}</p>)}
        <div className="tech-pro-btn">
            <button onClick={handleStep}>{index === totalPagesCount - 1 ? "Complete Profile" : "Continue"}</button>
        </div>
        
    </div>
  )
}

export default TechTalentProfileForm
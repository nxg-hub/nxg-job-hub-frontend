import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MultiStepProgressbar from './MultiStepProgressbar'
import Logo from '../../../../static/images/nxg-logo.png'
import { LiaLessThanSolid } from "react-icons/lia";
import MultiStepForm1 from './steps/MultiStepForm1';
import MultiStepForm2 from './steps/MultiStepForm2';
import MultiStepForm3 from './steps/MultiStepForm3';
import axios from 'axios';

function TechTalentProfileForm() {
    const [index, setIndex] = useState(0);
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      countryCode: "",
      zipCode: "",
      residentialAddress: "",
      highestQualification: "",
      professionalCert:"",
      experienceLevel:"",
      yearsOfExperience:"",
      jobType:"", 
      currentJob:"",
      job:"",
      workMode:"",
      passport:"",
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
      if (formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.countryCode === "") {
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
      if (!isCurrentFormCompleted) {
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
          // Save the form data
          // console.log("Form Data received:", formData);
          const ID = JSON.parse(window.localStorage.getItem('NXGJOBHUBLOGINKEYV1'));
          if (!ID || !ID.authKey) {
            console.error('Authentication key not available.');
           return;
          }

          const userInfo = JSON.parse(window.localStorage.getItem('user_info'));
          if (!userInfo ) {
            console.error('Authentication key not available.');
           return;
          }
  
          const updateUrl = "https://job-hub-591ace1cfc95.herokuapp.com/api/v1/tech-talent/update-{userInfo.id}";
          
          
          // This code gets the user details
          const userRes = await axios.get(
            "https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user",
            {
              headers: {
                "Content-Type": "application/json",
                authorization: ID.authKey,
              },
            }
          );
          
          // Extracts the authorization key from the response headers
          const authKey = userRes.headers.authorization;
  
          //Makes the update request
          const updateRes = await axios.put(updateUrl, formData
          // {
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: authKey,
          //   },
          // }
          );
          navigate("/dashboard")
          console.log(updateRes.data.id, 'Data received');
        } catch (error) {
          alert("Error posting data:", error.response);
          console.error('Error posting data:', error.response);
          console.log('Error posting data:', error.response);
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
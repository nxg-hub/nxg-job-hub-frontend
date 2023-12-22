import React, { useState, useEffect } from 'react';
import Logo from '../../../../static/images/nxg-logo.png';
import FormStepper from './FormStepper';
import Inputs from '../../../../components/accounts/Inputs';
import { PhoneInput } from 'react-international-phone';
import { recruiterPosition } from '../../../../utils/data/employer';
import './employerprofile.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployerProfileForm() {
  const [loading, setLoading] = useState(true); // Add loading state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loginKey = window.localStorage.getItem('NXGJOBHUBLOGINKEYV1');
        if (!loginKey) {
          console.error('Authentication key not available.');
          setLoading(false);
          return;
        }
        const { authKey, id } = JSON.parse(loginKey);
        if (!authKey || !id) {
          console.error('Auth key or user id not available.');
          setLoading(false);
          return;
        }

        const response = await axios.get("https://job-hub-591ace1cfc95.herokuapp.com/api/v1/auth/get-user", {
          headers: {
            authorization: authKey,
          },
        });
        const userData = response.data;
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchUserData(); // Invoke the fetchUserData function
  }, []);
  

  // Initial state for the first form
  const [personalData, setPersonalData] = useState({
    // firstName: '',  
    // lastName: '',   
    // email: '',      
    // phoneNumber: '',
    // address: '',
    country: '',
    // nationality: '',
    // state: '',
    // zipCode: '',
    position: '',
  });

  // Initial state for the second form
  const [companyData, setCompanyData] = useState({
    companyName: '',
    companyAddress: '',
    companyWebsite: '',
    companyPhone: '',
    // companyZipCode: '',
    industryType: '',
    companySize: '',
    // vacancy: '',
    jobBoard: '',
  });

  const [errors, setErrors] = useState({ data: "" });

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleStep = () => {
    if (step === 0) {
      // Handle validation or any additional logic for the first step
      if (!personalData.country || !personalData.position) {
        alert('All fields must be filled');
        setErrors({ data: 'All fields must be filled' });
        return;
      }
    }
    setStep(step + 1);
    console.log(personalData);
  };

  const handleCompleteProfile = async () => {
    try {
      // Combine data from both forms
      const combinedData = {
        ...personalData,
        ...companyData,
      };

      const loginKey = window.localStorage.getItem('NXGJOBHUBLOGINKEYV1');
      if (!loginKey) {
        console.error('Authentication key not available.');
        return;
      }
      const { authKey } = JSON.parse(loginKey);
      if(!authKey) {
        console.error('Auth key not available.');
        return;
      }

      const response = await axios.get("https://job-hub-591ace1cfc95.herokuapp.com/api/employers/get-employer", {
        headers: {
          authorization: authKey,
        }
      });
      const employerId = response.data.employerID;
      console.log(employerId);

      const res = await axios.patch(`https://job-hub-591ace1cfc95.herokuapp.com/api/employers/${employerId}`, combinedData,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: authKey,
        },
      }
      );
      console.log('Response Data:', res.data);

      // Reset errors and navigate on successful submission
      setErrors({ data: 'Unable to update user data.' });
      navigate('/dashboard');

    } catch (error) {
      console.log('Error posting data:', error.response.data.error || error);
      setErrors({ data: 'Unable to update user data.' });
    }
  };

  const handlePersonalDataChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyDataChange = (updatedCompanyData) => {
    setCompanyData(updatedCompanyData);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Manrope" }}>
      <div className="h-logo" style={{ width: "160px", height: "65px", marginTop: "1.3rem", margin: "auto" }}>
        <img src={Logo} alt="Nxg Company Logo" className="logo" />
      </div>
      {step === 0 && (
        <div style={{ margin: "3rem 0" }}>
          <div style={{ margin: "3rem 0" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "600" }}>
              Complete your profile as a Tech Employer
              {step > 0 ? ` (${step + 1}/2)` : "(1/2)"}
            </h2>
          </div>
          <div className="company-rep">
            <h3>Company Representative Information</h3>
            {errors.data && <p style={{ color: 'red', fontSize: '1rem', fontWeight:"500", background:"#fab1a0", padding:"1rem" }}>{errors.data}</p>}
            <form
              className="rep-forms"
              autoComplete='off'
            >
              <div className='rep-fullname'>
                <Inputs
                  type='text'
                  name="firstName"
                  title='First Name*'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
                <Inputs
                  type='text'
                  name="lastName"
                  title='Last Name*'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="email">
                <Inputs
                  type='email'
                  name="email"
                  title='E-mail Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="phone-address" style={{ textAlign: "start" }}>
                <div className="rep-phone">
                  <label>Phone Number*</label>
                  <PhoneInput
                    inputStyle={{ backgroundColor: '#ffffff', border: '0.06rem solid #c9c9c9', margin: '0.55rem 0', padding: '0.9rem 0.8rem', width: '25.1rem', height: '41px', fontSize: '.7rem', fontWeight: "400", fontFamily: "Montserrat", borderTopRightRadius: '0.4rem', borderBottomRightRadius: '0.4rem', color: "#c9c9c9" }}
                    name="phoneNumber"
                    aria-label="tel"
                    defaultCountry="ng"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                  />
                </div>
                <Inputs
                  type='text'
                  name="address"
                  title='Home Address'
                  value={personalData.address}
                  onChange={handlePersonalDataChange}
                  placeholder="Enter your home address"
                />
              </div>
              <div className="nation-state" style={{ display: "flex" }}>
                <Inputs
                  type='text'
                  name="nationality"
                  title='Nationality*'
                  value={personalData.nationality}
                  onChange={handlePersonalDataChange}
                  placeholder="Enter your nationality"
                  required
                />
                <Inputs
                  type='text'
                  name="state"
                  title='State/District'
                  value={personalData.state}
                  onChange={handlePersonalDataChange}
                  placeholder="Enter your State/District"
                />
              </div>
              <div className="country-zip">
                <Inputs
                  type='text'
                  name="country"
                  title='Country'
                  value={personalData.country}
                  onChange={handlePersonalDataChange}
                  placeholder="Enter your country"
                />
                <Inputs
                  type='text'
                  name="zipCode"
                  title='Zip Code'
                  value={personalData.zipCode}
                  onChange={handlePersonalDataChange}
                  placeholder="Enter zip code"
                />
              </div>
              <div className="rep-recruiter">
                    <label htmlFor="recruiterPosition" style={{ fontWeight: "500", marginBottom: "0.55rem" }}>Recruiter Position</label>
                    {recruiterPosition.map((position) => {
                    return (
                        <label key={position.value} className='rep-label'>
                        <input
                            type="radio"
                            name="position"
                            value={position.value}
                            checked={personalData.position === position.value}
                            onChange={handlePersonalDataChange}
                            className='rep-radio'
                        />
                        <span>{position.label}</span>
                        </label>
                    )
                    })}
              </div>
            </form>
            <div className="rep-btn">
                <button onClick={handleStep}>Continue to Company Information</button>
            </div>
          </div>
        </div>
      )}
      {step > 0 && <FormStepper personalData={personalData} companyData={companyData} onPersonalDataChange={handlePersonalDataChange} onCompanyDataChange={handleCompanyDataChange} onCompleteProfile={handleCompleteProfile}/>}
    </div>
  )
}

export default EmployerProfileForm;
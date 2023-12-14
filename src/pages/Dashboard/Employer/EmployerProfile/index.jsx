import React, { useState } from 'react';
import Logo from '../../../../static/images/nxg-logo.png';
import FormStepper from './FormStepper';
import Inputs from '../../../../components/accounts/Inputs';
import { PhoneInput } from 'react-international-phone';
import { recruiterPosition } from '../../../../utils/data/employer';
import './employerprofile.scss';
import axios from 'axios';

function EmployerProfileForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    country: "",
    nationality: "",
    state: "",
    zipCode: "",
    selectedOption: "", 
    companyName: "",
    companyAddress: "",
    companyWebsite:"",
    companyPhone:"",
    companyZipCode:"",
    industry:"",
    companySize:"",
    selectedVacancyOption:"",
    selectedBoard:""
  });

  const [errors, setErrors] = useState({ data: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleStep = async (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.nationality === ""
    ) {
        alert('All fields must be filled');
      setErrors({ data: 'All fields must be filled' });
    } else {
      try {
        const res = await axios.post("https://job-hub-591ace1cfc95.herokuapp.com/api/employers/createEmployer", data);
        console.log(res.data, 'Data received');
        setStep(step + 1);
      } catch (error) {
        alert("Error posting data:", error.response);
        console.error('Error posting data:', error.response);
        console.log('Error posting data:', error.response);
      }
    }
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
                  value={data.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  errormessage='First name must be filled!'
                  required
                />
                <Inputs
                  type='text'
                  name="lastName"
                  title='Last Name*'
                  value={data.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  errormessage='Last name must be filled!'
                  required
                />
              </div>
              <div className="email">
                <Inputs
                  type='email'
                  name="email"
                  title='E-mail Address'
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  errormessage='Email must include special characters like @ and .!'
                  required
                />
              </div>
              <div className="phone-address" style={{ textAlign: "start" }}>
                <div className="rep-phone">
                  <label>Phone Number*</label>
                  <PhoneInput
                    inputStyle={{ backgroundColor: '#ffffff', border: '0.06rem solid #c9c9c9', margin: '0.55rem 0', padding: '0.9rem 0.8rem', width: '25.1rem', height: '41px', fontSize: '.7rem', fontWeight: "400", fontFamily: "Montserrat", borderTopRightRadius: '0.4rem', borderBottomRightRadius: '0.4rem', color: "#c9c9c9" }}
                    name="phone"
                    aria-label="tel"
                    defaultCountry="ng"
                    value={data.phone}
                    onChange={(value) => {
                      const e = { target: { name: "phone", value } };
                      handleChange(e);
                    }}
                    required
                  />
                </div>
                <Inputs
                  type='text'
                  name="address"
                  title='Home Address'
                  value={data.address}
                  onChange={handleChange}
                  placeholder="Enter your home address"
                />
              </div>
              <div className="nation-state" style={{ display: "flex" }}>
                <Inputs
                  type='text'
                  name="nationality"
                  title='Nationality*'
                  value={data.nationality}
                  onChange={handleChange}
                  placeholder="Enter your nationality"
                  required
                />
                <Inputs
                  type='text'
                  name="state"
                  title='State/District'
                  value={data.state}
                  onChange={handleChange}
                  placeholder="Enter your State/District"
                />
              </div>
              <div className="country-zip">
                <Inputs
                  type='text'
                  name="country"
                  title='Country'
                  value={data.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                />
                <Inputs
                  type='text'
                  name="zipCode"
                  title='Zip Code'
                  value={data.zipCode}
                  onChange={handleChange}
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
                            name="selectedOption"
                            value={position.value}
                            checked={data.selectedOption === position.value}
                            onChange={handleChange}
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
      {step > 0 && <FormStepper data={data} onStepChange={handleStep} />}
    </div>
  )
}

export default EmployerProfileForm;
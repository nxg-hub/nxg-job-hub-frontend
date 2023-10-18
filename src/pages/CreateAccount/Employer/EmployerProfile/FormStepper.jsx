// FormStepper.js

import React from 'react';
import FormStepHeader from './FormStepHeader';
import Inputs from '../../../../components/accounts/Inputs';
import { PhoneInput } from 'react-international-phone';
import './employerprofile.scss';
import { jobVacancy, boards } from '../../../../utils/data/employer';

function FormStepper({ data, onStepChange }) {
  const handleCompleteAccount = (e) => {
    e.preventDefault();
    if (
      data.companyName === "" ||
      data.companyAddress === "" ||
      data.companyWebsite === "" ||
      data.companyPhone === "" ||
      data.industry === ""
    ) {
      alert('All fields must be filled');
    } else {
      console.log(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    data[name] = value;
    onStepChange();
  }

  return (
    <div style={{ margin: "3rem 0" }}>
      <div className="form-stepper-head">
        <FormStepHeader />
      </div>
      <div className="company-rep">
                <div>
                    <div style={{ margin: "3rem 0" }}>
                        <h3>Company Information</h3>
                    </div>
                    <form className="rep-forms">
                        <div className="company-name">
                            <Inputs
                                type='text'
                                name="companyName"
                                title='Company Name*'
                                value={data.companyName}
                                onChange={handleChange}
                                placeholder="Enter your company name"
                                errormessage='Company name must be filled!'
                                required
                            />
                        </div>
                        <div className="company-name">
                            <Inputs
                                type='text'
                                name="companyAddress"
                                title='Company Address*'
                                value={data.companyAddress}
                                onChange={handleChange}
                                placeholder="Enter your company's address"
                                errormessage='Company address must be filled!'
                                required
                            />
                        </div>
                        <div className="company-website">
                            <Inputs
                                type='url'
                                name="companyWebsite"
                                title='Company Website*'
                                value={data.companyWebsite}
                                onChange={handleChange}
                                placeholder="Enter your company website link"
                                errormessage='Company website must be filled!'
                                required
                            />
                        </div>
                        <div className="phone-address" style={{ textAlign: "start" }}>
                            <div className="rep-phone">
                                <label>Phone Number*</label>
                                <PhoneInput
                                inputStyle={{ backgroundColor: '#ffffff', border: '0.06rem solid #c9c9c9', margin: '0.55rem 0', padding: '0.9rem 0.8rem', width: '25.1rem', height: '41px', fontSize: '.7rem', fontWeight: "400", fontFamily: "Montserrat", borderTopRightRadius: '0.4rem', borderBottomRightRadius: '0.4rem', color: "#c9c9c9" }}
                                name="companyPhone"
                                aria-label="tel"
                                defaultCountry="ng"
                                value={data.companyPhone}
                                onChange={(value) => {
                                    const e = { target: { name: "companyPhone", value } };
                                    handleChange(e);
                                }}
                                required
                                />
                            </div>
                            <Inputs
                                type='text'
                                name="companyZipCode"
                                title='Zip Code'
                                value={data.companyZipCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="nation-state" style={{ display: "flex" }}>
                        <Inputs
                            type='text'
                            name="industry"
                            title='Type of Industry*'
                            value={data.industry}
                            onChange={handleChange}
                            required
                        />
                        <Inputs
                            type='text'
                            name="companySize"
                            title='Company Size'
                            value={data.companySize}
                            onChange={handleChange}
                        />
                        </div>
                        <div className="rep-recruiter">
                        <label htmlFor="jobVacany" style={{ fontSize:".8rem", fontWeight: "600", marginBottom: "0.55rem" }}>Type of Job Vacancy</label>
                        {jobVacancy.map((vacancy) => {
                            return (
                            <label key={vacancy.value} className='rep-label'>
                                <input
                                type="radio"
                                name="selectedVacancyOption"
                                value={vacancy.value}
                                checked={data.selectedVacancyOption === vacancy.value}
                                onChange={handleChange}
                                className='rep-radio'
                                />
                                <span>{vacancy.label}</span>
                            </label>
                            )
                        })}
                        </div>
                        <div className='qualification board'>
                        <label style={{ fontSize:".8rem", fontWeight: "600", marginBottom: "0.55rem" }}>Where did you hear about us?</label>
                        <select name="selectedBoard" value={data.selectedBoard} onChange={handleChange}>
                            {boards.map((board, index) => (
                            <option key={index} value={board}>
                                {board}
                            </option>
                            ))}
                        </select>
                        </div>
                    </form>
                </div>
         
        </div>
        <div className="rep-btn">
            <button onClick={handleCompleteAccount}>Complete Employer Account</button>
        </div>
    </div>
  )
}

export default FormStepper;
import React from "react";
import FormStepHeader from "./FormStepHeader";
import Inputs from "../../../../components/accounts/Inputs";
import { PhoneInput } from "react-international-phone";
import Select from 'react-select';
import "./employerprofile.scss";
import { jobVacancy, boards, industry, compSize } from "../../../../utils/data/employer";

function FormStepper({ companyData, onCompanyDataChange, onCompleteProfile }) {

  const handleChange = (selectedOption, name) => {
    let updatedValue = selectedOption.value;
    // Convert company name to uppercase if it is the "companyName" field
  // const updatedValue = name === "companyName" ? value.toUpperCase() : value;
    onCompanyDataChange((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    onCompanyDataChange((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompleteProfile= (e) => {
    e.preventDefault();
    if (
      companyData.companyName === "" ||
      companyData.companyAddress === "" ||
      companyData.companyWebsite === "" ||
      companyData.companyPhone === "" ||
      companyData.industryType === ""
    ) {
      alert("All fields must be filled");
    } else {
      onCompleteProfile();
    }
  };

  const industryOptions = industry.map((industryType) => ({
    value: industryType, 
    label: industryType, 
  }));
const compSizeOptions = compSize.map((companySize) => ({
    value: companySize, 
    label: companySize, 
  }));

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
                type="text"
                name="companyName"
                title="Company Name*"
                value={companyData.companyName}
                onChange={handleValue}
                placeholder="Enter your company name"
                errormessage="Company name must be filled!"
                required
              />
            </div>
            <div className="company-name">
              <Inputs
                type="text"
                name="companyAddress"
                title="Company Address*"
                value={companyData.companyAddress}
                onChange={handleValue}
                placeholder="Enter your company's address"
                errormessage="Company address must be filled!"
                required
              />
            </div>
            <div className="company-website">
              <Inputs
                type="url"
                name="companyWebsite"
                title="Company Website*"
                value={companyData.companyWebsite}
                onChange={handleValue}
                placeholder="Enter your company website link"
                errormessage="Company website must be filled!"
                required
              />
            </div>
            <div className="phone-address">
              <div className="rep-phone">
                <label>Phone Number*</label>
                <PhoneInput
                  inputStyle={{
                    backgroundColor: "#ffffff",
                    border: "0.06rem solid #c9c9c9",
                    margin: "0.55rem 0",
                    padding: "0.9rem 0.8rem",
                    width: "25.1rem",
                    height: "41px",
                    fontSize: ".7rem",
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    borderTopRightRadius: "0.4rem",
                    borderBottomRightRadius: "0.4rem",
                    color: "#c9c9c9",
                  }}
                  name="companyPhone"
                  aria-label="tel"
                  defaultCountry="ng"
                  value={companyData.companyPhone}
                  onChange={(value) => {
                    const e = { target: { name: "companyPhone", value } };
                    handleValue(e);
                  }}
                  required
                />
              </div>
              <Inputs
                type="text"
                name="companyZipCode"
                title="Zip Code"
                value={companyData.companyZipCode}
                onChange={handleValue}
              />
            </div>
            <div className="nation-state">
            <div className="tech-pro-qualification">
                    <label>Type of Industry*</label>
                    <Select options={industryOptions} value={companyData.industryType ? { label: companyData.industryType, value: companyData.industryType } : null} onChange={(selectedOption) => handleChange(selectedOption, 'industryType')} />
                </div>
                <div className="tech-pro-qualification">
                    <label>Company Size</label>
                    <Select options={compSizeOptions} value={companyData.companySize ? { label: companyData.companySize, value: companyData.companySize } : null} onChange={(selectedOption) => handleChange(selectedOption, 'companySize')} />
                </div>
            </div>
            <div className="rep-recruiter">
              <label
                htmlFor="jobVacany"
                style={{
                  fontSize: ".8rem",
                  fontWeight: "600",
                  marginBottom: "0.55rem",
                }}
              >
                Type of Job Vacancy
              </label>
              {jobVacancy.map((vacancy) => {
                return (
                  <label key={vacancy.value} className="rep-label">
                    <input
                      type="radio"
                      name="vacancy"
                      value={vacancy.value}
                      checked={companyData.vacancy === vacancy.value}
                      onChange={handleValue}
                      className="rep-radio"
                    />
                    <span>{vacancy.label}</span>
                  </label>
                );
              })}
            </div>
            <div className="qualification board">
              <label
                style={{
                  fontSize: ".8rem",
                  fontWeight: "600",
                  marginBottom: "0.55rem",
                }}
              >
                Where did you hear about us?
              </label>
              <select
                name="jobBoard"
                value={companyData.jobBoard}
                onChange={handleValue}
              >
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
        <button onClick={handleCompleteProfile}>
          Complete Employer Account
        </button>
      </div>
    </div>
  );
}

export default FormStepper;

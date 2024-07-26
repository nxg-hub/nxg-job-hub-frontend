import React from "react";
import FormStepHeader from "./FormStepHeader";
import Inputs from "../../../../components/accounts/Inputs";
import { PhoneInput } from "react-international-phone";
import Select from 'react-select';
import "./employerprofile.scss";
import { jobVacancy, boards, industry, compSize } from "../../../../utils/data/employer";

function FormStepper({ companyData,  setCompanyData, onCompleteProfile }) {

  const handleChange = (selectedOption, name) => {
    let updatedValue = selectedOption ? selectedOption.value : ""; // Handle null or undefined case
    // Convert company name to uppercase if it is the "companyName" field
  // const updatedValue = name === "companyName" ? value.toUpperCase() : value;
    setCompanyData({
      ...companyData,
      [name]: updatedValue,
    });
    // console.log("Selected Option:", companyData);
  };

  const handleValue = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log("Input Change Event:", companyData);
    // Ensure only one vacancy is selected
    if (type === 'radio' ) {
      setCompanyData({
        ...companyData,
        vacancies: checked ? [value] : [],
      });
    } else {
      setCompanyData({
        ...companyData,
        [name]: value,
      });
    }
  };

  const handleCompleteProfile= (e) => {
    e.preventDefault();
    if (
      companyData.companyName === "" ||
      // companyData.companyDesc === "" ||
      companyData.companyAddress === "" ||
      companyData.companyWebsite === "" ||
      companyData.companyPhone === "" ||
      companyData.industryType === "" ||
      companyData.vacancies.length === 0 // Ensure at least one vacancy is selected
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
const jobBoardOptions = boards.map((jobBoard) => ({
    value: jobBoard, 
    label: jobBoard, 
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
            {/* <div className="company-name">
              <Inputs
                type="text"
                name="companyDesc"
                title="Company Description*"
                value={companyData.companyDesc}
                onChange={handleValue}
                placeholder="Enter your company description"
                errormessage="Company description must be filled!"
                required
              />
            </div> */}
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
                className="placeholder:!text-[#181818]"
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
                    color: "#181818",
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
                    <Select
                  options={industryOptions}
                  value={industryOptions.find(opt => opt.value === companyData.industryType)} // Find the selected option
                  onChange={(selectedOption) => handleChange(selectedOption, 'industryType')}
                />
                </div>
                <div className="tech-pro-qualification">
                    <label>Company Size</label>
                    <Select
                  options={compSizeOptions}
                  value={compSizeOptions.find(opt => opt.value === companyData.companySize)} // Find the selected option
                  onChange={(selectedOption) => handleChange(selectedOption, 'companySize')}
                />
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
              {jobVacancy.map((vacancies) => {
                return (
                  <label key={vacancies.value} className="rep-label">
                    <input
                      type="radio"
                      name="vacancies"
                      value={vacancies.value}
                      checked={companyData.vacancies.includes(vacancies.value)}
                      onChange={handleValue}
                      className="rep-radio"
                    />
                    <span>{vacancies.label}</span>
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
              <Select
                  options={jobBoardOptions}
                  value={jobBoardOptions.find(opt => opt.value === companyData.jobBoard)} // Find the selected option
                  onChange={(selectedOption) => handleChange(selectedOption, 'jobBoard')}
                />
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

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Inputs from '../../../../../components/accounts/Inputs';
import { certifications, levels, qualifications, jobTypes, experience, jobs } from '../../../../../utils/data/tech-talent';
import '../multiStep.scss';

function MultiStepForm2({formData, setFormData, onComplete}) {
    const [formDataCompleted, setFormDataCompleted] = useState(false);
    const handleChange = (selectedOption, name) => {
        let formattedValue = selectedOption.value;
        if (name === 'highestQualification' || name === 'professionalCert' || name === 'jobType' || name === 'experienceLevel' || name === 'jobInterest') {
            formattedValue = formattedValue.toUpperCase();
        } else if (name === 'yearsOfExperience') {
            // Convert yearsOfExperience to a number
            // Extract the minimum value from the range (e.g., "0 - 3" becomes 0)
            const rangeValues = formattedValue.split(' - ');
            formattedValue = parseInt(rangeValues[0], 10);

            // Update the value in experienceOptions
            const updatedExperienceOptions = experienceOptions.map(option => {
                if (option.value === selectedOption.value) {
                return { ...option, value: formattedValue, label: formattedValue.toString() };
                }
                return option;
            });
        
            // Set the updated options
            setExperienceOptions(updatedExperienceOptions);
        }
        setFormData({
            ...formData,
            [name]: formattedValue,
          });
    };

    const handleValue = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const jobTypeOptions = jobTypes.map((jobType) => ({
        value: jobType, 
        label: jobType, 
    }));
    const qualificationOptions = qualifications.map((highestQualification) => ({
        value: highestQualification, 
        label: highestQualification, 
    }));
    const certificationOptions = certifications.map((professionalCert) => ({
        value: professionalCert, 
        label: professionalCert, 
    }));
    const levelOptions = levels.map((experienceLevel) => ({
        value: experienceLevel, 
        label: experienceLevel, 
    }));
    const jobsOptions = jobs.map((jobInterest) => ({
        value: jobInterest, 
        label: jobInterest, 
    }));
    const [experienceOptions, setExperienceOptions] = useState(experience.map((yearsOfExperience) => ({
        value: yearsOfExperience, 
        label: yearsOfExperience, 
    })));

    useEffect(() => {
        const submitForm = () => {
          // Make sure the form data is valid before calling onComplete
          if (formData.highestQualification && formData.yearsOfExperience && formData.jobInterest && formData.experienceLevel && !formDataCompleted) {
            setFormDataCompleted(true);
            onComplete(formData);
          }
        };
    
        submitForm(); // Call the submitForm function directly within useEffect
    
        // You can include other dependencies if needed
    }, [formData, onComplete, formDataCompleted]); 

  return (
    <div>
            <form className='tech-pro-form'>
                <div className="tech-pro-qualification">
                    <label>Highest Qualification*</label>
                    <Select options={qualificationOptions} value={formData.highestQualification ? { label: formData.highestQualification, value: formData.highestQualification } : null} onChange={(selectedOption) => handleChange(selectedOption, 'highestQualification')} />
                </div>
                <div className="tech-pro-qualification" id='tech-experience'>
                    <label>Years of work experience*</label>
                    <Select options={experienceOptions} value={formData.yearsOfExperience ? { label: formData.yearsOfExperience, value: formData.yearsOfExperience } : null} onChange={(selectedOption) => handleChange(selectedOption, 'yearsOfExperience')} />
                </div>
                <div className="tech-pro-qualification">
                    <label>Professional Certification</label>
                    <Select options={certificationOptions} value={formData.professionalCert ? { label: formData.professionalCert, value: formData.professionalCert } : null} onChange={(selectedOption) => handleChange(selectedOption, 'professionalCert')}/>
                </div>
                <div className="tech-pro-job">
                    <Inputs
                        type='text'
                        name="currentJob"
                        title='Current Job Function'
                        value={formData.currentJob}
                        onChange={handleValue}
                        placeholder="Enter current job"
                    />
                </div>
                <div className="tech-pro-qualification">
                    <label>Job Interest*</label>
                    <Select options={jobsOptions} value={formData.jobInterest ? { label: formData.jobInterest, value: formData.jobInterest } : null} onChange={(selectedOption) => handleChange(selectedOption, 'jobInterest')} />
                </div>
                <div className="tech-pro-qualification">
                    <label>Level of Experience in Job Interest*</label>
                    <Select options={levelOptions} value={formData.experienceLevel ? { label: formData.experienceLevel, value: formData.experienceLevel } : null} onChange={(selectedOption) => handleChange(selectedOption, 'experienceLevel')} />
                </div>
                <div className="tech-pro-qualification">
                    <label>Type of Job*</label>
                    <Select options={jobTypeOptions} value={formData.jobType ? { label: formData.jobType, value: formData.jobType } : null} onChange={(selectedOption) => handleChange(selectedOption, 'jobType')} />
                </div>
            </form>

    </div>
  )
}

export default MultiStepForm2
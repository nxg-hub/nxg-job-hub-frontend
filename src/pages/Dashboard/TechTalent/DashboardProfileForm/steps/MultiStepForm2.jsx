import React, { useEffect } from 'react';
import Select from 'react-select';
import Inputs from '../../../../../components/accounts/Inputs';
import { certifications, levels, qualifications, jobTypes, experience, jobs } from '../../../../../utils/data/tech-talent';
import '../multiStep.scss';

function MultiStepForm2({formData, setFormData, onComplete}) {
    const handleChange = (selectedOption, name) => {
        setFormData({
            ...formData,
            [name]: selectedOption.value,
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
    const levelOptions = levels.map((yearsOfExperience) => ({
        value: yearsOfExperience, 
        label: yearsOfExperience, 
    }));
    const jobsOptions = jobs.map((job) => ({
        value: job, 
        label: job, 
    }));
    const experienceOptions = experience.map((experienceLevel) => ({
        value: experienceLevel, 
        label: experienceLevel, 
    }));

    useEffect(() => {
        const submitForm = () => {
          // Make sure the form data is valid before calling onComplete
          if (formData.highestQualification && formData.experience && formData.job && formData.level) {
            onComplete(formData);
          }
        };
    
        submitForm(); // Call the submitForm function directly within useEffect
    
        // You can include other dependencies if needed
    }, [formData, onComplete]); 

  return (
    <div>
            <form className='tech-pro-form'>
                <div className="tech-pro-qualification">
                    <label>Highest Qualification*</label>
                    <Select options={qualificationOptions} value={formData.highestQualification ? { label: formData.highestQualification, value: formData.highestQualification } : null} onChange={(selectedOption) => handleChange(selectedOption, 'highestQualification')} />
                </div>
                <div className="tech-pro-qualification" id='tech-experience'>
                    <label>Years of work experience*</label>
                    <Select options={experienceOptions} value={formData.experienceLevel ? { label: formData.experienceLevel, value: formData.experienceLevel } : null} onChange={(selectedOption) => handleChange(selectedOption, 'experienceLevel')} />
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
                    <Select options={jobsOptions} value={formData.job ? { label: formData.job, value: formData.job } : null} onChange={(selectedOption) => handleChange(selectedOption, 'job')} />
                </div>
                <div className="tech-pro-qualification">
                    <label>Level of Experience in Job Interest*</label>
                    <Select options={levelOptions} value={formData.yearsOfExperience ? { label: formData.yearsOfExperience, value: formData.yearsOfExperience } : null} onChange={(selectedOption) => handleChange(selectedOption, 'yearsOfExperience')} />
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
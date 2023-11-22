import React, { useState } from 'react';
import Select from 'react-select';
import Inputs from '../../../../components/accounts/Inputs';
import { certifications, levels, qualifications, jobTypes, experience } from '../../../../utils/data/tech-talent';
import '../multiStep.scss';

function MultiStepForm2({data = {}, index}) {
    // const [qualification, setQualification] = useState("");
    const [interest, setInterest] = useState("");
    const [currentJob, setCurrentJob] = useState("");

    // const handleSelect = (e) => {
    //     setQualification(e.target.value);
    // }

    const handleChange = (selectedOption, fieldName) => {
        data[fieldName] = selectedOption.value;
    }

    const jobTypeOptions = jobTypes.map((jobType) => ({
        value: jobType, 
        label: jobType, 
    }));
    const qualificationOptions = qualifications.map((qualification) => ({
        value: qualification, 
        label: qualification, 
    }));
    const certificationOptions = certifications.map((certification) => ({
        value: certification, 
        label: certification, 
    }));
    const levelOptions = levels.map((level) => ({
        value: level, 
        label: level, 
    }));
    const experienceOptions = experience.map((levelExperience) => ({
        value: levelExperience, 
        label: levelExperience, 
    }));
  return (
    <div>
            <form className='tech-pro-form'>
                <div className="tech-pro-qualification">
                    <label>Highest Qualification*</label>
                    <Select options={qualificationOptions} value={qualificationOptions.find(option => option.value === data.qualification)} onChange={(selectedOption) => handleChange(selectedOption,  'qualification')} />
                </div>
                <div className="tech-pro-qualification" id='tech-experience'>
                    <label>Years of work experience*</label>
                    <Select options={experienceOptions} value={experienceOptions.find(option => option.value === data.levelExperience)} onChange={(selectedOption) => handleChange(selectedOption,  'levelExperience')} />
                </div>
                <div className="tech-pro-qualification">
                    <label>Professional Certification</label>
                    <Select options={certificationOptions} value={certificationOptions.find(option => option.value === data.certification)} onChange={(selectedOption) => handleChange(selectedOption,  'certification')}/>
                </div>
                <div className="tech-pro-job">
                    <Inputs
                        type='text'
                        name="Current Job*"
                        title='Current Job Function'
                        value={currentJob}
                        onChange={(e) => setCurrentJob(e.target.value) }
                        placeholder="Enter current job"
                    />
                </div>
                <div className="tech-pro-qualification">
                    <label>Job Interest*</label>
                    <Select options={data.selectedOption || []} value={interest} onChange={(e) => setInterest(e.target.value)} />
                </div>
                <div className="tech-pro-qualification">
                    <label>Level of Experience in Job Interest*</label>
                    <Select options={levelOptions} value={levelOptions.find(option => option.value === data.level)} onChange={(selectedOption) => handleChange(selectedOption,  'level')} />
                </div>
                <div className="tech-pro-qualification">
                    <label>Type of Job*</label>
                    <Select options={jobTypeOptions} value={jobTypeOptions.find(option => option.value === data.jobType)} onChange={(selectedOption) => handleChange(selectedOption,  'jobType')} />
                </div>
            </form>

    </div>
  )
}

export default MultiStepForm2
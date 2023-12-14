import React, { useEffect } from 'react';
import Select from 'react-select';
import { workModes} from '../../../../../utils/data/tech-talent';
import '../multiStep.scss';
import FileUploader from '../../../../../components/accounts/FileUploader';
import Inputs from '../../../../../components/accounts/Inputs';

function MultiStepForm3({formData, setFormData, onComplete}) {

    const workModesOptions = workModes.map((workMode) => ({
        value: workMode, 
        label: workMode, 
    }));

    const handleChange = (selectedOption, name) => {
        setFormData({
            ...formData,
            [name]: selectedOption.value,
        });
    }

    const handleValue = (e, name) => {
        const {value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const onFileChange = (files, name) => {
        setFormData({
            ...formData,
            [name]: files,
        });
        console.log(files);
    }

    useEffect(() => {
        const submitForm = () => {
          // Make sure the form data is valid before calling onComplete
          if (formData.passport && formData.resume && formData.coverletter && formData.bio) {
            onComplete(formData);
          }
        };
    
        submitForm(); // Call the submitForm function directly within useEffect
    
        // You can include other dependencies if needed
    }, [formData, onComplete]); 

  return (
    <div>
        <form className="tech-pro-form">
            <div className="tech-pro-qualification">
                <label>Preferred work mode</label>
                <Select options={workModesOptions} value={formData.workMode ? { label: formData.workMode, value: formData.workMode } : null} onChange={(selectedOption) => handleChange(selectedOption, 'workMode')} />
            </div>
            <div className="tech-pro-form">
                <FileUploader title="Upload Passport*" onFileChange={(files) => onFileChange(files, 'passport')} />
            </div>
            <div className="tech-pro-form">
                <FileUploader title="Upload Resume/CV*" onFileChange={(files) => onFileChange(files, 'resume')} />
            </div>
            <div className="tech-pro-form">
                <FileUploader title="Upload Cover Letter*" onFileChange={(files) => onFileChange(files, 'coverletter')} />
            </div>
            <div className="my-profile-bio">
                <label>Write a Bio</label>
                <textarea  cols="5" rows="10" value={formData.bio} onChange={(e) => handleValue(e, 'bio')}></textarea>
            </div>
            <div className="tech-pro-address">
                <Inputs
                type='url'
                name="portfolioLink"
                title='Profile link'
                value={formData.portfolioLink}
                onChange={(e) => handleValue(e, 'portfolioLink')}
                placeholder="Insert link to your portfolio"
                />
            </div>
            <div className="tech-pro-address">
                <Inputs
                type='url'
                name="linkedInUrl"
                title='LinkedIn link'
                value={formData.linkedInUrl}
                onChange={(e) => handleValue(e, 'linkedInUrl')}
                placeholder="Insert LinkedIn profile link"
                />
            </div>
        </form>
    </div>
  )
}

export default MultiStepForm3
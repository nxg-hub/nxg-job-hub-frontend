import React from 'react';
import Select from 'react-select';
import { workModes} from '../../../../utils/data/tech-talent';
import '../multiStep.scss';
import FileUploader from '../../../../components/accounts/FileUploader';
import Inputs from '../../../../components/accounts/Inputs';

function MultiStepForm3({data = {}, index}) {

    const workModesOptions = workModes.map((workMode) => ({
        value: workMode, 
        label: workMode, 
    }));

    const handleChange = (selectedOption, fieldName) => {
        data[fieldName] = selectedOption.value;
    }

    const onFileChange = (files) => {
        console.log(files);
    }

  return (
    <div>
        <form className="tech-pro-form">
            <div className="tech-pro-qualification">
                <label>Preferred work mode</label>
                <Select options={workModesOptions} value={workModesOptions.find(option => option.value === data.workMode)} onChange={(selectedOption) => handleChange(selectedOption,  'workMode')} />
            </div>
            <div className="tech-pro-form">
                <FileUploader title="Upload Passport*" onFileChange={(files) => onFileChange(files)} />
            </div>
            <div className="tech-pro-form">
                <FileUploader title="Upload Resume/CV*" onFileChange={(files) => onFileChange(files)} />
            </div>
            <div className="tech-pro-form">
                <FileUploader title="Upload Cover Letter*" onFileChange={(files) => onFileChange(files)} />
            </div>
            <div className="my-profile-bio">
                <label>Write a Bio</label>
                <textarea  cols="5" rows="10"></textarea>
            </div>
            <div className="tech-pro-address">
                <Inputs
                type='url'
                name="Profile link"
                title='Profile link'
                value={data.profileLink}
                onChange={handleChange}
                placeholder="Insert link to your portfolio"
                />
            </div>
            <div className="tech-pro-address">
                <Inputs
                type='url'
                name="LinkedIn link"
                title='LinkedIn link'
                value={data.linkedinLink}
                onChange={handleChange}
                placeholder="Insert LinkedIn profile link"
                />
            </div>
        </form>
    </div>
  )
}

export default MultiStepForm3
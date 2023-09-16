import React, {useState} from 'react';
import Select from 'react-select';
import { jobs, workModes } from '../../utils/data';
import FileUploader from './FileUploader';

const MultiSelect = () => {
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [selectedWorkMode, setSelectedWorkMode] = useState([]);
    // const [selectedFile, setSelectedFile] = useState(null);


    const handleMultiSelectJobs = (selectedOptions) => {
        setSelectedJobs(selectedOptions);
    }

    const jobOptions = jobs.map((job) => ({
        value: job, 
        label: job, 
    }));

    const handleMultiSelectWorkMode = (selectedOptions) => {
        setSelectedWorkMode(selectedOptions);
    }

    const workModeOptions = workModes.map((workMode) => ({
        value: workMode,
        label:workMode,
    }));


  return (
    <div>
        <div className="jobs" style={{marginBottom: '.7rem'}}>
            <label>Choose your job interests</label>
            <Select 
            options={jobOptions}
            isMulti
            onChange={handleMultiSelectJobs}
            value={selectedJobs}
        />
        </div>
        <div className="work-mode">
            <label>Choose your preferred work mode</label>
            <Select 
            options={workModeOptions}
            isMulti
            onChange={handleMultiSelectWorkMode}
            value={selectedWorkMode}
        />
        </div>
        <div className="photo-upload"style={{margin: '.7rem 0'}}>
            <FileUploader 
                title='Upload your passport'
                onFileSelectSuccess={(file) => (file)} // Pass the success callback function
                onFileSelectError={({error}) => alert(error)} 
            />
        </div>
        <div className="resume">
            <FileUploader
                title='Upload your Resume / CV'
                onFileSelectSuccess={(file) => (file)} 
                onFileSelectError={({error}) => alert(error)} 
            />
        </div>
        <div className="cover-letter">
            <FileUploader
                title='Upload your Cover Letter'
                onFileSelectSuccess={(file) => (file)} 
                onFileSelectError={({error}) => alert(error)} 
            />
        </div>
    </div>
  )
}

export default MultiSelect
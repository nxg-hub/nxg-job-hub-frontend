import { useState } from "react";
import Select from "react-select";
import { jobTypes, jobs, workModes } from "../../utils/data/tech-talent";
import FileUploader from "./FileUploader";

const MultiSelect = () => {
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedWorkMode, setSelectedWorkMode] = useState([]);
  const handleMultiSelectJobType = (selectedOptions) => {
    setSelectedJobTypes(selectedOptions);
  };

  const jobTypeOptions = jobTypes.map((jobType) => ({
    value: jobType,
    label: jobType,
  }));

  const handleMultiSelectJobs = (selectedOptions) => {
    setSelectedJobs(selectedOptions);
  };

  const jobOptions = jobs.map((job) => ({
    value: job,
    label: job,
  }));

  const handleMultiSelectWorkMode = (selectedOptions) => {
    setSelectedWorkMode(selectedOptions);
  };

  const workModeOptions = workModes.map((workMode) => ({
    value: workMode,
    label: workMode,
  }));

  return (
    <div>
      <div className="job-types">
        <label>Choose your prefered job types</label>
        <Select
          options={jobTypeOptions}
          isMulti
          onChange={handleMultiSelectJobType}
          value={selectedJobTypes}
        />
      </div>
      <div className="jobs" style={{ margin: ".7rem 0" }}>
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
  );
};

export default MultiSelect;

import React, { useState } from 'react';
import Select, { components }  from 'react-select';
import { MdOutlineSearch, MdOutlineLocationOn } from 'react-icons/md';
import { jobTypes, levels } from '../../utils/data/tech-talent';


function DashboardSearch({params, onParamChange}) {
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);

    

    const CheckboxOption = (props) => (
        <div>
          <components.Option {...props} className='check-section'>
            <input
              type="checkbox"
              className='dash-checkbox'
              checked={props.isSelected}
              onChange={() => null}
            />
            <label className='label-option'>{props.label}</label>
          </components.Option>
        </div>
    );

    const levelOptions = levels.map((level) => ({
        value: level,
        label: level,
      }));
    const handleMultiSelectLevels = (selectedOptions) => {
        setSelectedLevels(selectedOptions);
    };

    const jobTypeOptions = jobTypes.map((jobType) => ({
        value: jobType,
        label: jobType,
      }));
    const handleMultiSelectJobTypes = (selectedOptions) => {
        setSelectedJobTypes(selectedOptions);
    };

  return (
    <div className="profile-search-section" id='profile-search'>
      <div className="dash-search-section">
        <MdOutlineSearch className='dash-search-icon'/>
        <input 
          type="text" 
          placeholder='Search jobs' 
          className='dash-search-input'
          onChange={onParamChange}
          value={params.title}
          name='title'
        />
      </div>
      <div className="dash-location">
        <MdOutlineLocationOn className='dash-location-icon'/>
        <input 
          type="search" 
          placeholder='Location' 
          className='dash-location-input'
          onChange={onParamChange}
          value={params.body}
          name='body'
        />
      </div>
      <div className="dash-employ-type">
        <Select 
          id='employ-select'
          options={jobTypeOptions}
          isMulti
          components={{ Option: CheckboxOption }}
          onChange={handleMultiSelectJobTypes}
          value={selectedJobTypes}
          placeholder="Employment type"
        />
      </div>
      <div className="dash-level">
        <Select 
          className='level-select'
          options={levelOptions}
          isMulti
          components={{ Option: CheckboxOption }}
          onChange={handleMultiSelectLevels}
          value={selectedLevels}
          placeholder="Experience level"
        />
      </div>
      <div className="dash-search-btn">
        <button>Search Jobs</button>
      </div>
    </div>
  )
}

export default DashboardSearch
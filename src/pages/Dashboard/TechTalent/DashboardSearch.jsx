import React, { useState } from 'react';
import Select, { components }  from 'react-select';
import axios from 'axios';
import { MdOutlineSearch, MdOutlineLocationOn } from 'react-icons/md';
import { jobTypes, levels } from '../../../utils/data/tech-talent';


function DashboardSearch({onJobsFetched, onSearchChange, onLocationChange}) {
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const baseUrl = 'http://localhost:8000/posts';

    const fetchedJobs = (searchTerm) => {
      axios.get(baseUrl)
        .then((response) => {
          const jobsArray = response.data.map((job) => ({
            title: job.title,
            location: job.location
          }));
          // Update's the fetched jobs
          onJobsFetched(jobsArray)
        })
        .catch((error) => {
          console.error('Error occured fetching data:', error);
        });
    };

    const handleSearchJobs = () => {
      if (search === "" || locationSearch === "") {
        fetchedJobs("");
      } else {
        fetchedJobs(search || locationSearch);
      }
    };

    const handleJobSearch = (e) => {
      const searchJob = e.target.value;
      if (searchJob !== "") {
        setSearch(searchJob); 
        onSearchChange(searchJob);
      } else {
        onJobsFetched([]);
      }
      
    };
    const handleLocationSearch = (e) => {
      const searchLocation = e.target.value;
      if (searchLocation !== "") {
        setLocationSearch(searchLocation);
        onLocationChange(searchLocation);
      } else {
        onJobsFetched([]);
      }
    };

    
    const CheckboxOption = (props) => (
          <components.Option {...props} className='check-section'>
            <input
              type="checkbox"
              className='dash-checkbox'
              checked={props.isSelected}
              onChange={() => null}
            />
            <label className='label-option'>{props.label}</label>
          </components.Option>
    );

    const levelOptions = levels.map((level) => ({
        value: level,
        label: level,
      }));
    const handleMultiSelectLevels = (selectedOptions) => {
        setSelectedLevels(selectedOptions);
        // onSearch({ ...params, levels: selectedOptions.map((option) => option.value) });
    };

    const jobTypeOptions = jobTypes.map((jobType) => ({
        value: jobType,
        label: jobType,
      }));
    const handleMultiSelectJobTypes = (selectedOptions) => {
        setSelectedJobTypes(selectedOptions);
        // onSearch({ ...params, jobTypes: selectedOptions.map((option) => option.value) });
    };

  return (
    <>
      <div className="profile-search-section" id='profile-search'>
        <div className="dash-search-section">
          <MdOutlineSearch className='dash-search-icon'/>
          <input 
            type="search" 
            placeholder='Search jobs' 
            className='dash-search-input'
            onChange={handleJobSearch}
            value={search}
          />
        </div>
        <div className="dash-location">
          <MdOutlineLocationOn className='dash-location-icon'/>
          <input 
            type="search" 
            placeholder='Location' 
            className='dash-location-input'
            onChange={handleLocationSearch}
            value={locationSearch}
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
          <button onClick={handleSearchJobs}>Search Jobs</button>
        </div>
      </div>
    </> 
  )
}
export default DashboardSearch
import React, { useState } from 'react';
import Select, { components }  from 'react-select';
import { relevance } from '../../utils/data/tech-talent';
import DashboardSearch from './DashboardSearch';
import useFetchJobs from '../../hooks/useFetchJobs';
import SearchJobCard from './SearchJobCard';
import JobsPagination from './JobsPagination';

function ProfileSearch() {
    const [selectedRelevance, setSelectedRelevance] = useState([]);
    const [params, setParams] = useState({})
    const [page, setPage] = useState(1)
    const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

    function handleParamChange(e) {
      const param = e.target.name
      const value = e.target.value
      setPage(1)
      setParams(prevParams => {
        return {...prevParams, [param]: value}
      })
    }

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

    const relevanceOptions = relevance.map((relevanceType) => ({
        value: relevanceType,
        label: relevanceType,
      }));
    const handleMultiSelectRelevance = (selectedOptions) => {
        setSelectedRelevance(selectedOptions);
    };

  return (
    <div>
      <p style={{fontSize:'16px', fontWeight:"500", marginBottom:".5rem", color:"rgba(0, 0, 0, 0.47)"}}>Search for Jobs</p>
      <div className="profile-search-container">
        <div className="profile-search-wrapper">
          <DashboardSearch params={params} onParamChange={handleParamChange} />
          <div className="relevance-section" id='relevance'>
            <label className="sort">sort by</label>
            <Select 
                options={relevanceOptions}
                isMulti
                components={{ Option: CheckboxOption }}
                onChange={handleMultiSelectRelevance}
                value={selectedRelevance}
                className='relevance-select'
                placeholder="Relevance"
            />
          </div>
        </div>
      </div>
      <div className="fetch-jobs">
        <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
        {loading && <h1>Loading ...</h1>}
        {error && <h1>Error... Try refreshing ur page</h1>}
        {jobs.slice(0, 10).map(job => {
          return <SearchJobCard key={job.id} job={job}/>
        })}
        <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
      </div>
    </div>
  )
}

export default ProfileSearch
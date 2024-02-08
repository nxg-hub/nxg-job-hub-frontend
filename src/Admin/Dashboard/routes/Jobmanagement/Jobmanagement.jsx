import React, { useState} from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import Select, { components } from "react-select"
import { userrelevance } from '../../../../utils/data/tech-talent'
import { PostedJobCard } from './PostedJobCard'
import { jobsToBeVetted } from '../AdminOverview/usersdetails/usersdetails'
import './jobmanagement.scss'

const Jobmanagement = () => {
  const [selectedRelevance, setSelectedRelevance] = useState([]);
  const [activeTab, setActiveTab] = useState('employer');
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };
  const CheckboxOption = (props) => (
    <div>
      <components.Option {...props} className="check-section">
        <input
          type="checkbox"
          className="dash-checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />
        <label className="label-option">{props.label}</label>
      </components.Option>
    </div>
  );

  const relevanceOptions = userrelevance.map((relevanceType) => ({
    value: relevanceType,
    label: relevanceType,
  }));
  const handleMultiSelectRelevance = (selectedOptions) => {
    setSelectedRelevance(selectedOptions);
  };

  return (
    <>
        <section className="job-header-section">
          <div className="user-types">
            <div className={activeTab === "employer" ? "user-active" : "user-talent"}onClick={() => handleActiveTabChange('employer')}>
              <h3>Employer</h3>
            </div>
            <div className={activeTab === "agent" ? "user-active" : "user-talent"} onClick={() => handleActiveTabChange('agent')}>
              <h3>Agent</h3>
            </div>
          </div>
          <div className="admin-search">
            <input type="search" placeholder='Search' />
            <MdOutlineSearch style={{fontSize:"1.2rem"}}/>
          </div>
          <div className="admin-relevance">
            <label className="sort">sort by</label>
            <Select
              options={relevanceOptions}
              isMulti
              components={{ Option: CheckboxOption }}
              onChange={handleMultiSelectRelevance}
              value={selectedRelevance}
              className="relevance-select"
              placeholder="Relevance"
            />
          </div>
        </section>
        <section className="users-details">
         {activeTab === "employer" &&   <PostedJobCard jobsToBeVetted={jobsToBeVetted} />}
         {/* {activeTab === "agent" &&   <EmployerDetailsCard />} */}
        </section>
    </>
 
  )
}

export default Jobmanagement
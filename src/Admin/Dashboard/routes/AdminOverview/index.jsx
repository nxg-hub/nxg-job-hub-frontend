import React, { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import Select, { components } from "react-select";
import { userrelevance } from '../../../../utils/data/tech-talent';
import UsersDetailsCard from './usersdetails/UsersDetailsCard';
import EmployerDetailsCard from './usersdetails/EmployerDetailsCard';
import { talentUsers } from './usersdetails/usersdetails';

const AdminOverview = () => {
  const [selectedRelevance, setSelectedRelevance] = useState([]);
  const [activeTab, setActiveTab] = useState('talent');
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
        <section className="header-section">
          <div className="user-types">
            <div className={activeTab === "talent" ? "user-active" : "user-talent"} onClick={() => handleActiveTabChange('talent')}>
              <h3>Talent</h3>
            </div>
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
         {activeTab === "talent" &&   <UsersDetailsCard talentUsers={talentUsers} />}
         {activeTab === "employer" &&   <EmployerDetailsCard />}
        </section>
    </>
  )
}

export default AdminOverview
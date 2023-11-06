import React, { useState } from 'react';
import Select, { components }  from 'react-select';
import { relevance } from '../../utils/data/tech-talent';
import DashboardSearch from './DashboardSearch';

function ProfileSearch() {
    const [selectedRelevance, setSelectedRelevance] = useState([]);

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
                <DashboardSearch />
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
    </div>
  )
}

export default ProfileSearch
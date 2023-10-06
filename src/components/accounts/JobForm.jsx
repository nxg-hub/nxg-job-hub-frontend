
import React, { useState } from 'react';
import Inputs from './Inputs';
import { certifications, levels, qualifications, jobTypes } from '../../utils/data';
import Select from 'react-select';

const JobForm = () => {
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [selectedQualification, setSelectedQualification] = useState(qualifications[0]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedCertification, setSelectedCertification] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    // const [portfolioLink, setPortfolioLink] = useState('');
    

    const handleQualification = (e) => {
        setSelectedQualification(e.target.value)
    }

    const onValueSelected = (e) => {
        setSelectedOption(e.target.value);
    }
    const handleCertification = (e) => {
        setSelectedCertification(e.target.value);
    }
    const handleLevel = (e) => {
        setSelectedLevel(e.target.value);
    }

    const handleMultiSelectJobType = (selectedOptions) => {
        setSelectedJobTypes(selectedOptions);
    }

    const jobTypeOptions = jobTypes.map((jobType) => ({
        value: jobType, 
        label: jobType, 
    }));

  return (
    <main>
        <div className="left">
         <Inputs 
                type='text'
                title='Zip Code'
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zip code"
            />
            <Inputs 
                type='text'
                title='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your City"
            />
            <Inputs 
                type='text'
                title='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your residential address"
            />
            <div className='qualification'>
                <label>Select Highest Qualification</label>
                <select value={selectedQualification} onChange={handleQualification}>
                    {qualifications.map((qualification, index) => (
                        <option key={index} value={qualification}>
                            {qualification}
                        </option>
                    ))}
                </select>
            </div>
            <div className="experience" style={{marginBottom: '.7rem'}}>
                <label >How many years of experience do you have?</label>
                <div className='radio-options' style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <label className='input-radio'>
                        <input
                            type="radio"
                            title="Less than 1yr"
                            value="Less than 1yr"
                            checked={selectedOption === 'Less than 1yr'}
                            onChange={onValueSelected}
                            style={{marginRight:'.5rem'}}
                        />
                        Less than 1
                    </label>
                    <label className='input-radio'>
                        <input
                            type="radio"
                            title="1 - 3yrs"
                            value="1 - 3yrs"
                            checked={selectedOption === '1 - 3yrs'}
                            onChange={onValueSelected}
                            style={{marginRight:'.5rem'}}
                        />
                        1 - 3yrs
                    </label>
                    <label className='input-radio'>
                        <input
                            type="radio"
                            title="4 - 6yrs"
                            value="4 - 6yrs"
                            checked={selectedOption === '4 - 6yrs'}
                            onChange={onValueSelected}
                            style={{marginRight:'.5rem'}}
                        />
                        4 - 6yrs
                    </label>
                    <label className='input-radio'>
                        <input
                            type="radio"
                            title="7+"
                            value="7+"
                            checked={selectedOption === '7+'}
                            onChange={onValueSelected}
                            style={{marginRight:'.5rem'}}
                        />
                        7<sup>+</sup>
                    </label>
                </div>
            </div>
            <div className='certification'>
                <label>Select your professional certification if any</label>
                <select value={selectedCertification} onChange={handleCertification}>
                    {certifications.map((certification, index) => (
                        <option key={index} value={certification}>
                            {certification}
                        </option>
                    ))}
                </select>
            </div>
            <div className='level'>
                <label>Select your job experience level</label>
                <select value={selectedLevel} onChange={handleLevel}>
                    {levels.map((level, index) => (
                        <option key={index} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>
            <div className="job-types">
                <label>Choose your prefered job types</label>
                <Select 
                    options={jobTypeOptions}
                    isMulti
                    onChange={handleMultiSelectJobType}
                    value={selectedJobTypes}
                />
            </div>
            {/* <div className="portfolio">
                <label>Insert Portfolio/Linkedin Link</label>
                <input 
                    type="url" 
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder='Insert link'
                />
            </div> */}
        </div>
        
    </main>
  )
}

export default JobForm
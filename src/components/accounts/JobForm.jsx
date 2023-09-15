import React, { useState } from 'react';
import { certifications, levels, qualifications } from '../../utils/data';
import MultiSelect from './MultiSelect';

const JobForm = () => {
    const [selectedQualification, setSelectedQualification] = useState(qualifications[0]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedCertification, setSelectedCertification] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');

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

  return (
    <main>
        <div className="left">
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
            <MultiSelect />
        </div>
        
    </main>
  )
}

export default JobForm
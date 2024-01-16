import React from 'react';
import './subscription.scss';

const SubSwitch = ({isToggled, onToggle}) => {
  return (
    <label  className="sub-tabs-btns">
        <input 
            type="checkbox" 
            checked= {isToggled}
            onChange={onToggle}
        />
        <span className='sub-slider'/>
        <div className="sub-tabs-labels">
            <p className={isToggled ? 'active' : ''}>Monthly</p>
            <p className={!isToggled ? 'active' : ''}>Yearly</p>
        </div>
    </label>
  )
}

export default SubSwitch
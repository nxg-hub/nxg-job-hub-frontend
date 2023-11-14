import React from 'react';
import './profile.css';

const Progress_bar = ({currentStep, ...props}) => {
  return (
        <div {...props}>
            <div className="indicator-container">
                <div className="indicator" >
                    <span className="line"><span ></span></span>
                    <p className={currentStep >= 0 && "active"} >1</p>
                    <p className={currentStep >= 1 && "active"}>2</p>
                    <p className={currentStep >= 2 && "active"}>3</p>
                </div>
            </div>
        </div>
    )
}

export default Progress_bar
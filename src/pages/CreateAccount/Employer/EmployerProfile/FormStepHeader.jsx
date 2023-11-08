import React from 'react';

const FormStepHeader = () => {
    let step = 1;
    const stepNumber = parseInt(step++)
  return (
    <div className='step-header'>
      <div className="step-header-container">
        <div className={`step-header-step ${stepNumber >= 1 ? "completed" : ""}`}>
            <h2>Complete your profile as a Tech Employer ({stepNumber + 1}/2)</h2>
        </div>
      </div>
    </div>
  );
};

export default FormStepHeader;

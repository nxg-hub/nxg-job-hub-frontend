import React, { useState } from 'react';
import MultiStepProgressbar from '../TechTalent/DashboardProfileForm/MultiStepProgressbar';
import './subscription.scss';
import SubCards from './SubCards';
import { SubPayment } from './SubPayment';
import { SubSuccess } from './SubSuccess';

export const MonthlySubscription = () => {
  const [currentStep, setCurrentStep] = useState(0);
//   const steps = ["SubCards", "SubPayment", "SubSuccess"];
//   const totalPagesCount = currentStep.length;

 const steps = [
    "SubCards",
    "SubPayment",
    "SubSuccess"
  ];

  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };

  const displayStep = (stepIndex) => {
    switch (steps[stepIndex]) {
      case 'SubCards':
        return <SubCards onStepChange={handleStepChange} />;
      case 'SubPayment':
        return <SubPayment />;
      case 'SubSuccess':
        return <SubSuccess />;
      default:
        return null;
    }
  };

  return (
    <div className='subscription-main'>
      <div className="sub-progressbar">
        <MultiStepProgressbar step={currentStep} totalSteps={steps.length} setIndex={handleStepChange} />
      </div>
      <div className="sub-cards">
        {/* <SubCards onStepChange={handleStepChange}/> */}
        {displayStep(currentStep)}
      </div>
      <button
        className='sub-btn'
        disabled={currentStep === 0 || currentStep === steps.length - 1}
        onClick={() => setCurrentStep(currentStep === steps.length -1 ? 0 : currentStep - 1)}
      >
        {currentStep === steps.length -1 ? "Go Back To Dashboard" : "Previous"}
      </button>
    </div>
  );
};


// import React, { useState } from 'react'
// import MultiStepProgressbar from '../TechTalent/DashboardProfileForm/MultiStepProgressbar'
// import './subscription.scss'
// import SubCards from './SubCards'
// import { SubPayment } from './SubPayment';
// import { SubSuccess } from './SubSuccess';

// export const MonthlySubscription = () => {
//     const [index, setIndex] = useState(0);
//     const steps = [
//         "SubCards",
//         "SubPayment", 
//         "SubSuccess"
//     ];

//     const totalPagesCount = steps.length;

//     const displayStep = (stepIndex) => {
//         switch (steps[stepIndex]) {
//             case 'SubCards':
//             return (<SubCards />);
//           case 'SubPayment':
//             return (<SubPayment />);
//           case 'SubSuccess':
//             return (<SubSuccess />);
//           default:
//             return null;
//         }
//     };

//   return (
//     <div className='subscription-main'>
//         <div className="sub-progressbar">
//             <MultiStepProgressbar step={index} totalSteps={steps.length}  setIndex={setIndex} />
//         </div>
//         <div className="sub-cards">
//             {displayStep(index)}
//         </div>
//         <button 
//             className='sub-btn' 
//             disabled={index === 0 || index === totalPagesCount - 1} 
//             onClick={() => setIndex(index === totalPagesCount - 1 ? 0 : index - 1)}
//         >
//             {index === totalPagesCount - 1 ? "Go Back To Dashboard" : "Previous"}
//         </button>
//     </div>
//   )
// }

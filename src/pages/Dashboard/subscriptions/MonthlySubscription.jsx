import React, { useState } from 'react'
import MultiStepProgressbar from '../TechTalent/DashboardProfileForm/MultiStepProgressbar'
import './subscription.scss'
import SubSwitch from './SubSwitch'
import SubCards from './SubCards'

export const MonthlySubscription = () => {
    const [isYearly, setIsYearly] = useState(false);
  return (
    <div className='subscription-main'>
        <div className="sub-progressbar">
            <MultiStepProgressbar />
        </div>
        <div className="sub-tabs">
            <h2 className="sub-tabs-title">Choose Your Subscription Plan!!!</h2>
            <SubSwitch isToggled={isYearly} onToggle={() => setIsYearly(!isYearly)}/>
        </div>
        <div className="sub-text">
            <p>
                Choose the subscription plan that best suits you, start for free now and upgrade later ..
            </p>
        </div>
        <div className="sub-cards">
            <SubCards isYearly={isYearly} />
        </div>
    </div>
  )
}

import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import logo from '../../../../static/images/nxg-logo.png';
import TechSubCards from './TechSubCards';
import { SubPayment } from '../subpayments/SubPayment';

function TechTalentSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const handleSubscribe = (isSubscribed) => {
    setIsSubscribed(isSubscribed);
  };

  return (
    <div className='subscriptions-container'>
      {!isSubscribed && (
        <div className='subscription-main'>
          <div className="sub-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="sub-cards">
            <TechSubCards onSubscribe={handleSubscribe} />
          </div>
          <button
            className='sub-btn'
            onClick={() => navigate("/dashboard")}
          >
            Back To Dashboard
          </button>
      </div>
    )}
    {isSubscribed && <SubPayment />}  
    </div>
  )
}

export default TechTalentSubscription
import React, { useState} from 'react';
import { useNavigate } from 'react-router';
import './subscription.scss';
import logo from '../../../static/images/nxg-logo.png';
import SubCards from './SubCards';
import { SubPayment } from './subpayments/SubPayment';

export const EmployerSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const handleSubscribe = (isSubscribed) => {
    setIsSubscribed(isSubscribed);
  };

  return (
    <>
      {!isSubscribed && (
        <div className='subscription-main'>
        <div className="sub-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="sub-cards">
          <SubCards onSubscribe={handleSubscribe} />
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
    </>
    
  );
};
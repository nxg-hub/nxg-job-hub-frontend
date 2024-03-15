import React from 'react';
import basic from '../../../../static/icons/free-icon.svg';
import silver from '../../../../static/icons/silver-icon.svg';
import gold from '../../../../static/icons/gold-icon.svg';
import platinum from '../../../../static/icons/platinum-icon.svg';
import '../../subscriptions/subscription.scss';
import { BsCheck } from 'react-icons/bs';

const TechSubCards = ({onSubscribe}) => {
    const monthlySubscriptions = [
        {
            subId: 1,
            subLogo: basic,
            subTitle: "Free",
            subPrice: "0$",
            subBenefit: [
                "Access to all basic features",
                "Use the website for one month only, completely free"
            ],
            subGroup : "Free"
        },
        {
            subId: 2,
            subLogo: silver,
            subTitle: "Sliver",
            subPrice: "25$/3months",
            subBenefit: [
                "Access to all basic features",
                "Solid foundation for limited job posting and searching.",
                "10 vetted job posting throughout the entire 3 months period."
            ],
            subGroup : "Sliver"
        },
        {
            subId: 3,
            subLogo: gold,
            subTitle: "Gold",
            subPrice: "70$/6months",
            subBenefit: [
                "Access to all basic features",
                "Solid foundation for limited job posting and searching.",
                "Unlimited vetted job listing, posting and tech talent search."
            ],
            subGroup : "Most Popular"
        },
        {
            subId: 4,
            subLogo: platinum,
            subTitle: "Platinum",
            subPrice: "90$/Yearly",
            subBenefit: [
                "Access to all basic features",
                "Solid foundation for limited job posting and searching.",
                "Unlimited vetted job listing, posting and tech talent search.",
                "Fast job application, tech talent profile matching mechanism and customer support."
            ],
            subGroup : "Recommended"
        },
    ];



    const handlePayment = () => {
        onSubscribe(true);
    }

  return (
    <>
        <div className="sub-tabs">
            <h2 className="sub-tabs-title">Choose Your Subscription Plan!!!</h2>
        </div>
            <div className="sub-text">
                <p>
                    Choose the subscription plan that best suits you, start for free now and upgrade later ..
                </p>
            </div>
            <div className='sub-cards-main'>
                {monthlySubscriptions.map((subscription, index) => (
                    <div className='sub-cards-single' key={subscription.subId}>
                        <div className="sub-cards-title-container">
                            {(index >= monthlySubscriptions.length - 2) && (
                            <p style={{ float: "right", background: "rgba(102, 182, 209, 1)", color: "#fff", width: "160px", border: "none", borderRadius: "21px", padding: "8px", fontSize: "18px", fontWeight: "500", margin: ".4rem" }}>{subscription.subGroup}</p>
                            )}
                            <div className="sub-cards-title">
                                <img src={subscription.subLogo} alt=""  />
                                <h3>{subscription.subTitle}</h3>
                            </div>
                            <p className='sub-price'>{subscription.subPrice}</p>
                        </div>
                        <div className="sub-cards-lists">
                            <ul>
                                {subscription.subBenefit.map((benefit, index) => (
                                    <li key={index}>
                                        <div className="sub-check">
                                            <BsCheck style={{color: "rgba(77, 242, 19, 1)"}} />
                                        </div>
                                        <p>{benefit}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {subscription.subId === 1 ? (
                            null
                        ) : (
                            <div className="sub-cards-btns">
                                <button className={subscription.subGroup === "Recommended" ? "recommended-btn" : ""} onClick={handlePayment}>Subscribe</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        
    </>
  )
}

export default TechSubCards;
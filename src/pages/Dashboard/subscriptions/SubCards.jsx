import React, {useEffect, useState} from 'react';
import basic from '../../../static/icons/free-icon.svg';
import silver from '../../../static/icons/silver-icon.svg';
import gold from '../../../static/icons/gold-icon.svg';
import platinum from '../../../static/icons/platinum-icon.svg';
import './subscription.scss';
import { BsCheck } from 'react-icons/bs';
import axios from 'axios';
import { API_HOST_URL } from '../../../utils/api/API_HOST';


const SubCards = ({onSubscribe, country}) => {
    const [exchangeRate, setExchangeRate] = useState(null);
    // Function to fetch and convert prices to Naira

    useEffect(() => {
        fetchExchangeRate();
    }, []);

    const fetchExchangeRate = async () => {
        try {
            const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
            const data = await response.json();
            // console.log(data.usd['ngn']);
            setExchangeRate(data.usd['ngn']); // Assuming NGN is the target currency
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    const convertToNGN = (price) => {
        if (exchangeRate) {
            const priceInUSD = parseFloat(price.replace('$', ''));
            const priceInNGN = priceInUSD * exchangeRate;
            return priceInNGN.toFixed(2) + ' ₦';
        } else {
            return price;
        }
    };
    const monthlySubscriptions = [
        {
            subId: 1,
            subLogo: basic,
            subTitle: "Free",
            subPrice: "0$",
            subBenefit: [
                "As a way to welcome new users and allow them to explore our platform, the first month of usage is completely free. During this period, users will have access to all basic features .",
            ],
            spanTitle: "Validity:",
            span: "1 Month",
            subGroup : "Free"
        },
        {
            subId: 2,
            subLogo: silver,
            subTitle: "Sliver",
            subPrice: "25$/3months",
            subBenefit: [
                "The Silver plan is designed for tech agents to have access to all basic features on this website and provide a solid foundation for limited job seaching and posting",
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
                "The Gold plan offers extended benefits for users looking for more flexibiity and a longer commitment.",
                "Unlimited vetted job listing, posting and Tech talent search support"
            ],
            subGroup : "Most Popular"
        },
        {
            subId: 4,
            subLogo: platinum,
            subTitle: "Platinum",
            subPrice: "90$/Yearly",
            subBenefit: [
                "The Platinum plan caters to users seeking an even longer commitment with added features.",
                "Access to unlimited vetted tech talents, fast job application, Tech talent profile matching mechanism and NXG hub customer support."
            ],
            subGroup : "Recommended"
        },
    ];

    const handlePayment = async () => {
        try {
            const loginKey =
              window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') ||
              window.sessionStorage.getItem('NXGJOBHUBLOGINKEYV1');
      
            if (!loginKey) {
              throw new Error('Authentication key not available.');
            }
      
            let authKey;
            try {
              authKey = JSON.parse(loginKey).authKey;
            } catch (error) {
              throw new Error('Error parsing authentication key:', error);
            }
      
            const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
              headers: {
                'Content-Type': 'application/json',
                authorization: authKey,
              },
            });
      
            const userData = response.data; // Assuming the response is an object with employer data
            const { firstName, lastName, email, phoneNumber } = userData;
            // console.log(userData);
      
            await axios.post(`${API_HOST_URL}/api/subscriptions/create-account`, {
              firstName,
              lastName,
              email,
              phoneNumber,
            }, {
              headers: {
                'Content-Type' : 'application/json',
                authorization: authKey,
              },
            });
            console.log('User data sent to subscriptions endpoint successfully:', userData );
          } catch (error) {
            console.error('Error posting user data:', error.message);
          }
    //    onSubscribe(true);
    }
    // const handlePayment = () => {
    //    onSubscribe(true);
    // }

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
                        {/* Convert price to NGN if user is Nigerian */}
                        <p className='sub-price'>{country === "Nigeria" ? convertToNGN(subscription.subPrice) : subscription.subPrice}</p>
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
                            {subscription.subId === 1 && (
                                <div className="sub-span">
                                    <p><span>{subscription.spanTitle}</span> {subscription.span}</p>
                            </div>
                            )}
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

export default SubCards;
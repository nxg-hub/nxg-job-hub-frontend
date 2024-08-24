import React, { useEffect, useState, useContext } from "react";
import basic from "../../../static/icons/free-icon.svg?react";
import silver from "../../../static/icons/silver-icon.svg?react";
import gold from "../../../static/icons/gold-icon.svg?react";
import platinum from "../../../static/icons/platinum-icon.svg?react";
import "./subscription.scss";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { API_HOST_URL } from "../../../utils/api/API_HOST";
import { UserContext } from "..";

const SubCards = ({ country, verifyTransaction }) => {
  const user = useContext(UserContext);
  const [exchangeRate, setExchangeRate] = useState(null);
  // Function to fetch and convert prices to Naira

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
      );
      const data = await response.json();
      //   console.log(data.usd["ngn"]);
      setExchangeRate(data.usd["ngn"]); // Assuming NGN is the target currency
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const convertToDollar = (price) => {
    if (exchangeRate) {
      const priceInNGN = parseFloat(price.replace("₦", "")) * 1000;
      const priceInDollar = priceInNGN / exchangeRate;
      return " $" + priceInDollar.toFixed(2);
    } else {
      return price;
    }
  };
  const monthlySubscriptions = [
    {
      subId: 1,
      subLogo: basic,
      subTitle: "Free",
      subPrice: "₦0",
      subBenefit: [
        "As a way to welcome new users and allow them to explore our platform, the first month of usage is completely free. During this period, users will have access to all basic features .",
      ],
      spanTitle: "Validity:",
      span: "1 Month",
      planType: "Free",
    },
    {
      subId: 2,
      subLogo: silver,
      subTitle: "Silver",
      subPrice: `₦25,000/3months`,
      subBenefit: [
        "The Silver plan is designed for tech agents to have access to all basic features on this website and provide a solid foundation for limited job seaching and posting",
        "10 vetted job posting throughout the entire 3 months period.",
      ],
      planType: "Silver",
    },
    {
      subId: 3,
      subLogo: gold,
      subTitle: "Gold",
      subPrice: "₦70,000/6months",
      subBenefit: [
        "The Gold plan offers extended benefits for users looking for more flexibiity and a longer commitment.",
        "Unlimited vetted job listing, posting and Tech talent search support",
      ],
      planType: "Gold",
    },
    {
      subId: 4,
      subLogo: platinum,
      subTitle: "Platinum",
      subPrice: "₦90,000/Yearly",
      subBenefit: [
        "The Platinum plan caters to users seeking an even longer commitment with added features.",
        "Access to unlimited vetted tech talents, fast job application, Tech talent profile matching mechanism and NXG hub customer support.",
      ],
      planType: "Platinum",
    },
  ];

  const handlePayment = async (subscription) => {
    try {
      // Convert planType to string and uppercase
      const planType = String(subscription.planType).toUpperCase();

      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        planType: planType,
      };

      await axios.post(
        `${API_HOST_URL}/api/subscriptions/create-account`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //   console.log(userData);

      if (userData) {
        const subscribeResponse = await axios.post(
          `${API_HOST_URL}/api/subscriptions/subscribe`,
          {
            email: user.email,
            callback_url: `${window.location.origin}/sub-success`,
          }
        );
        console.log(subscribeResponse);
        // console.log('User subscribed successfully:', subscribeResponse.data);

        // Check if subscribeResponse.data and authorization_url are available
        if (
          subscribeResponse.data &&
          subscribeResponse.data.data &&
          subscribeResponse.data.data.authorization_url
        ) {
          // Redirect user to the authorization_url
          window.location.href = subscribeResponse.data.data.authorization_url;
        } else {
          console.error("Authorization URL is missing.");
          // Handle the scenario where authorization_url is missing
        }

        try {
          await verifyTransaction();
        } catch (error) {
          console.error("Error verifying transaction:", error);
          // Handle verification error here
          // You can display an error message to the user
        }
      }
    } catch (error) {
      console.error("Error posting user data:", error.response.message);
    }
    // onSubscribe(true);
  };
  // const verifyCustomer = async (user) => {
  //     try {
  //         const { email, accountNumber, bvn, bankCode, customerCode } = user;
  //         await axios.post(`${API_HOST_URL}/api/subscriptions/verify-customer`, {
  //             email,
  //             account_number: accountNumber,
  //             bvn,
  //             bank_code: bankCode,
  //             customer_code: customerCode
  //         });
  //         console.log('Customer verified successfully.');
  //     } catch (error) {
  //         console.error('Error verifying customer:', error.message);
  //     }
  // };

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
          Choose the subscription plan that best suits you, start for free now
          and upgrade later ..
        </p>
      </div>
      <div className="sub-cards-main">
        {monthlySubscriptions.map((subscription, index) => (
          <div className="sub-cards-single" key={subscription.subId}>
            <div className="sub-cards-title-container">
              {index >= monthlySubscriptions.length - 2 && (
                <p
                  style={{
                    float: "right",
                    background: "rgba(102, 182, 209, 1)",
                    color: "#fff",
                    width: "160px",
                    border: "none",
                    borderRadius: "21px",
                    padding: "8px",
                    fontSize: "18px",
                    fontWeight: "500",
                    margin: ".4rem",
                  }}>
                  {subscription.planType}
                </p>
              )}
              <div className="sub-cards-title">
                <img src={subscription.subLogo} alt="" />
                <h3>{subscription.subTitle}</h3>
              </div>
              {/* Convert price to NGN if user is Nigerian */}
              <p className="sub-price">
                {country === "nigeria"
                  ? subscription.subPrice
                  : convertToDollar(subscription.subPrice)}
              </p>
            </div>
            <div className="sub-cards-lists">
              <ul>
                {subscription.subBenefit.map((benefit, index) => (
                  <li key={index}>
                    <div className="sub-check">
                      <BsCheck style={{ color: "rgba(77, 242, 19, 1)" }} />
                    </div>
                    <p>{benefit}</p>
                  </li>
                ))}
                {subscription.subId === 1 && (
                  <div className="sub-span">
                    <p>
                      <span>{subscription.spanTitle}</span> {subscription.span}
                    </p>
                  </div>
                )}
              </ul>
            </div>
            {subscription.subId === 1 ? null : (
              <div className="sub-cards-btns">
                <button
                  className={
                    subscription.planType === "Recommended"
                      ? "recommended-btn"
                      : ""
                  }
                  // onClick={() => {handlePayment(subscription);}}>
                  onClick={() => handlePayment(subscription)}>
                  Subscribe
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SubCards;

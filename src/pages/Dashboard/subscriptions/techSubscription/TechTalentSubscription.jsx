import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import logo from "../../../../static/images/nxg-logo.png";
import TechSubCards from "./TechSubCards";
// import { SubPayment } from '../subpayments/SubPayment';
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import axios from "axios";

function TechTalentSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const navigate = useNavigate();

  const fetchTalentData = useCallback(async () => {
    if (!token.authKey) {
      navigate("/login");
      return;
    }
    try {
      const loginKey =
        window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

      if (!loginKey) {
        throw new Error("Authentication key not available.");
      }

      let authKey;
      try {
        authKey = JSON.parse(loginKey).authKey;
      } catch (error) {
        throw new Error("Error parsing authentication key:", error);
      }

      const response = await axios.get(
        `${API_HOST_URL}/api/v1/tech-talent/get-user`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: authKey,
          },
        }
      );

      const talentData = response.data; // Assuming the response is an object with employer data
      // console.log(talentData);

      // Update state with fetched data
      setCountryCode(talentData.countryCode || "");
    } catch (error) {
      console.error("Error fetching talent data:", error.message);
    }
  }, []);
  useEffect(() => {
    // Fetch user's nationality from the provided endpoint
    fetchTalentData();
  }, [fetchTalentData]);
  const handleSubscribe = (isSubscribed) => {
    setIsSubscribed(isSubscribed);
  };
  return (
    <div className="subscriptions-container">
      {!isSubscribed && (
        <div className="subscription-main">
          <div className="sub-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="sub-cards">
            <TechSubCards
              onSubscribe={handleSubscribe}
              countryCode={countryCode}
            />
          </div>
          <button className="sub-btn" onClick={() => navigate("/dashboard")}>
            Back To Dashboard
          </button>
        </div>
      )}
      {/* {isSubscribed && <SubPayment />}   */}
    </div>
  );
}

export default TechTalentSubscription;

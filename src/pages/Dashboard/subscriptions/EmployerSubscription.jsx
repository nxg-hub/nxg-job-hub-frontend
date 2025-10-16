import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import "./subscription.scss";
import logo from "../../../static/images/nxg-logo.png";
import SubCards from "./SubCards";
// import { SubPayment } from './subpayments/SubPayment';
import axios from "axios";
import { API_HOST_URL } from "../../../utils/api/API_HOST";

export const EmployerSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [country, setCountry] = useState("");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const fetchEmployerData = useCallback(async () => {
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
        `${API_HOST_URL}/api/employers/get-employer`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: authKey,
          },
        }
      );

      const employerData = response.data; // Assuming the response is an object with employer data
      setUser(employerData.user);
      // Update state with fetched data
      setCountry(employerData.country || "");
    } catch (error) {
      console.error("Error fetching employer data:", error.message);
    }
  }, []);
  useEffect(() => {
    // Fetch user's nationality from the provided endpoint
    fetchEmployerData();
  }, [fetchEmployerData]);

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
            <SubCards
              onSubscribe={handleSubscribe}
              country={country}
              user={user}
            />
          </div>
        </div>
      )}
      {/* {isSubscribed && <SubPayment />}   */}
    </div>
  );
};

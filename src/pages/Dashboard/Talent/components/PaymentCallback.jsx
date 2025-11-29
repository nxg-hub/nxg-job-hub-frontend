import React, { useEffect, useState } from "react";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useNavigate } from "react-router-dom";

export default function PaymentCallback() {
  const [status, setStatus] = useState("Verifying payment...");
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const reference = queryParams.get("reference");
    const talentId = queryParams.get("talentId");
    const providerId = queryParams.get("providerId");

    const verifyAndRequest = async () => {
      if (!reference) {
        setStatus("No payment reference found.");
        return;
      }

      try {
        // Step 1: Verify payment
        const verifyRes = await fetch(
          `${API_HOST_URL}/api/v1/requests/verify-service-charge-transaction/${reference}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const verifyData = await verifyRes.json();

        if (!verifyData.status) throw new Error("Payment verification failed");

        // Step 2: Trigger service request
        const requestRes = await fetch(
          `${API_HOST_URL}/api/v1/requests/request-service-provider`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ talentId, providerId, message: "request" }),
          }
        );
        if (!requestRes.ok) throw new Error("Service request failed");

        setStatus("Payment verified and service request sent successfully!");

        setTimeout(() => {
          navigate("/talent");
        }, 3000);
      } catch (error) {
        setStatus(error.message);
        console.log(error);
      }
    };

    verifyAndRequest();
  }, []);

  return (
    <div className="p-6 text-center">
      <p>{status}</p>
    </div>
  );
}

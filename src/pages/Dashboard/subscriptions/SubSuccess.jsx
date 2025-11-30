import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_HOST_URL } from "../../../utils/api/API_HOST";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useUserData } from "@/store/userDataStorage";
import { set } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const SubSuccess = () => {
  // const employer = useUserData((state) => state.userData);

  // const [subMessage, setSubMessage] = useState("");
  // const [isSuccess, setIsSuccess] = useState(null);
  // const [subStatus, setSubStatus] = useState("");
  // const [manualStatus, setManualStatus] = useState(false);
  // const [searchParams] = useSearchParams();
  // const fetchSubStatus = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${API_HOST_URL}/api/subscriptions/status/${employer.email}`
  //     );
  //     setSubStatus(res.data.subscriptionStatus);
  //     console.log(res.data.subscriptionStatus);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const activateSubManually = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${API_HOST_URL}/api/subscriptions/activate?email=${employer.email}`
  //     );
  //     console.log(res);
  //     setManualStatus(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchSubStatus(), [];
  // });
  // useEffect(() => {
  //   const verifyTransaction = async () => {
  //     if (searchParams.has("reference")) {
  //       const transactionReference = searchParams.get("reference");

  //       try {
  //         const response = await axios.post(
  //           `${API_HOST_URL}/api/subscriptions/verify-transaction`,
  //           null,
  //           {
  //             params: { reference: transactionReference },
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         if (response.data.data.status === "success") {
  //           fetchSubStatus();

  //           if (subStatus === "ACTIVE") {
  //             setSubMessage(`subscription is successful!`);
  //             setIsSuccess(true);
  //             // Delay of 5 seconds before redirecting to the dashboard
  //             setTimeout(() => {
  //               // Redirect to the dashboard
  //               window.location.href = "/employer";

  //               // Clear query parameters from the URL
  //               window.history.replaceState({}, document.title, "/employer");
  //             }, 5000); // 5000 milliseconds = 5 seconds
  //           } else {
  //             activateSubManually();
  //             if (manualStatus) {
  //               setSubMessage(`subscription is successful!`);
  //               setIsSuccess(true);
  //               // Delay of 5 seconds before redirecting to the dashboard
  //               setTimeout(() => {
  //                 // Redirect to the dashboard
  //                 window.location.href = "/employer";

  //                 // Clear query parameters from the URL
  //                 window.history.replaceState({}, document.title, "/employer");
  //               }, 5000); // 5000 milliseconds = 5 seconds
  //             }
  //           }
  //         } else {
  //           setSubMessage(
  //             "There was an issue verifying your subscription. Payment Not Confirmed. Please contact support."
  //           );
  //           setIsSuccess(false);

  //           // Delay of 5 seconds before redirecting to the dashboard
  //           setTimeout(() => {
  //             // Redirect to the dashboard
  //             window.location.href = "/employer";

  //             // Clear query parameters from the URL
  //             window.history.replaceState({}, document.title, "/employer");
  //           }, 5000); // 5000 milliseconds = 5 seconds
  //         }

  //         console.log("Transaction verified successfully.", response.data);
  //       } catch (error) {
  //         setSubMessage("Error verifying transaction. Please try again.");
  //         console.error("Error verifying transaction:", error.message);
  //       }
  //     }
  //   };

  //   verifyTransaction().catch((error) => {
  //     console.error("Error in verifyTransaction:", error);
  //   });
  // }, [searchParams]);

  const employer = useUserData((state) => state.userData);
  const [subMessage, setSubMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const verifySubscriptionFlow = async () => {
      if (!searchParams.has("reference")) return;

      const reference = searchParams.get("reference");
      setLoading(true);
      try {
        // 1. VERIFY TRANSACTION
        const verifyRes = await axios.post(
          `${API_HOST_URL}/api/subscriptions/verify-transaction`,
          null,
          {
            params: { reference },
            headers: { "Content-Type": "application/json" },
          }
        );

        const isPaid = verifyRes.data?.data?.status === "success";

        if (!isPaid) {
          setSubMessage("Payment verification failed. Contact support.");
          setIsSuccess(false);
          redirectToDashboard();
          return;
        }

        // 2. GET SUB STATUS AFTER PAYMENT
        const statusRes1 = await axios.get(
          `${API_HOST_URL}/api/subscriptions/status/${employer.email}`
        );

        let status = statusRes1.data.subscriptionStatus;

        // 3. IF STILL INACTIVE → manually activate
        if (status !== "ACTIVE") {
          await axios.post(
            `${API_HOST_URL}/api/subscriptions/activate?email=${employer.email}`
          );

          // 4. Fetch status again after manual activation
          const statusRes2 = await axios.get(
            `${API_HOST_URL}/api/subscriptions/status/${employer.email}`
          );

          status = statusRes2.data.subscriptionStatus;
        }

        // ✅ 5. Final Decision
        if (status === "ACTIVE") {
          setSubMessage("Subscription is successful!");
          toast({
            title: ` Successful 🎉`,
            description: `Subscription is successful!`,
          });
          setIsSuccess(true);
        } else {
          setSubMessage(
            "Payment verified but subscription could not be activated. Contact support."
          );
          toast({
            title: `Subscription activation error`,
            description: `Payment verified but subscription could not be activated. Contact support.`,
          });
          setIsSuccess(false);
        }

        redirectToDashboard();
      } catch (err) {
        console.error(err);
        setSubMessage("An error occurred. Please try again.");
        toast({
          variant: "destructive",
          title: ` Error`,
          description: "An error occurred. Please try again. reload your page.",
        });
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifySubscriptionFlow();
  }, [searchParams]);

  // ✅ helper function
  const redirectToDashboard = () => {
    setTimeout(() => {
      window.location.href = "/employer";
      window.history.replaceState({}, document.title, "/employer");
    }, 5000);
  };
  console.log(isSuccess, subMessage);
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? (
        <p>Loading...</p> // Show a loading message or spinner while awaiting response
      ) : isSuccess ? (
        <>
          <div style={{ fontSize: "100px", color: "green" }}>✔</div>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "green" }}>
            {subMessage}
          </p>
        </>
      ) : (
        <>
          <div style={{ fontSize: "100px", color: "red" }}>✘</div>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "red" }}>
            {subMessage}
          </p>
        </>
      )}

      <Toaster />
    </div>
  );
};

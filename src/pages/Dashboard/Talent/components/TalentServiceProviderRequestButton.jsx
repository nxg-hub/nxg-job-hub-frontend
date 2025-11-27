import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { toast } from "@/hooks/use-toast";

const ENABLE_PAYMENTS = false;
const TalentServiceProviderRequestButton = ({ providerId }) => {
  const userData = useSelector(
    (state) => state.TalentUserReducer.LoggedIntalentData
  );
  const [loading, setLoading] = useState(false);

  const handleRequestService = async () => {
    const talentId = userData.techId;

    if (!ENABLE_PAYMENTS) {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_HOST_URL}/api/v1/requests/request-service-provider`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              providerId,
              talentId,
              message: "request",
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to send request");

        toast({
          title: `Successful 🎉`,
          description: `Request sent successfully!`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: `failed`,
          description: "Error sending request",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }

      return; // 👈 stop here when payment disabled
    }

    try {
      setLoading(true);
      const payload = {
        // reference: crypto.randomUUID(),
        amount: 1000 * 100, // Paystack expects amount in kobo
        email: userData.email,
        callback_url: `${window.location.origin}/talent/payment-callback?talentId=${talentId}&providerId=${providerId}`,
        metadata: {
          purpose: "service-request",
        },
      };

      const res = await fetch(`${API_HOST_URL}/api/v1/webhooks/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data?.data?.authorization_url) {
        alert("Failed to initialize payment");
        toast({
          variant: "destructive",
          title: `Failed `,
          description: `Failed to initialize payment`,
        });
        return;
      }

      // Redirect to Paystack checkout
      window.location.href = data?.data?.authorization_url;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: `Failed `,
        description: `Error initializing payment`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      className="w-full bg-sky-600 hover:bg-sky-700"
      onClick={handleRequestService}>
      {loading ? "Processing.." : "Request Service"}
    </Button>
  );
};

export default TalentServiceProviderRequestButton;

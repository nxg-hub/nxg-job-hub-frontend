import React, { useContext } from "react";
import { UserContext } from "../../pages/Dashboard";
import TechTalentSubscription from "../../pages/Dashboard/subscriptions/techSubscription/TechTalentSubscription";
import { EmployerSubscription } from "../../pages/Dashboard/subscriptions/EmployerSubscription";

const SubscriptionController = () => {
  const user = useContext(UserContext);

  if (user.userType === "TECHTALENT") {
    return <TechTalentSubscription />;
  } else if (user.userType === "EMPLOYER") {
    return <EmployerSubscription />;
  } else {
  }
};
export default SubscriptionController;

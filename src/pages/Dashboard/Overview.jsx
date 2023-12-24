import { useContext } from "react";
import EmployerOverview from "./Employer/routes/EmployerOverview";
import TechTalentOverview from "./TechTalent/Overview";
import { UserContext } from ".";
const Overview = () => {
  const user = useContext(UserContext);
  if (user.userType === "TECHTALENT") {
    return <TechTalentOverview />;
  } else if (user.userType === "EMPLOYER") {
    return <EmployerOverview />;
  } else {
  }
};

export default Overview;

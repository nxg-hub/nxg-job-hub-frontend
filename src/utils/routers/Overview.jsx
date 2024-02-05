import { useContext } from "react";
import EmployerOverview from "../../pages/Dashboard/Employer/routes/EmployerOverview";
import TechTalentOverview from "../../pages/Dashboard/TechTalent/Overview";
import { UserContext } from "../../pages/Dashboard";
import AdminOverview from "../../pages/Dashboard/AdminDashboard/routes/AdminOverview";

const Overview = () => {
  const user = useContext(UserContext);
  if (user.userType === "TECHTALENT") {
    return <TechTalentOverview />;
  } else if (user.userType === "EMPLOYER") {
    return <EmployerOverview />;
  } else {
    return <AdminOverview />
  }
};

export default Overview;

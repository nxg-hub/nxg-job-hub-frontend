import React, { useContext } from "react";
import { UserContext } from "../../pages/Dashboard";
import EmployerDashProfile from "../../pages/Dashboard/Employer/routes/EmployerDashProfile/EmployerDashProfile";
import DashProfile from "../../pages/Dashboard/TechTalent/myProfile/DashProfile";

const ProfileController = () => {
  const user = useContext(UserContext);

  if (user.userType === "TECHTALENT") {
    return <DashProfile />;
  } else if (user.userType === "EMPLOYER") {
    return <EmployerDashProfile />;
  } else {
  }
};
export default ProfileController;

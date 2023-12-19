import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfileLanding from "./pages/ProfileLanding";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Explore from "./components/hero/Explore";
import Dashboard from "./pages/Dashboard";
import DashProfile from "./pages/Dashboard/TechTalent/myProfile/DashProfile.jsx";
import EmployerProfileForm from "./pages/Dashboard/Employer/EmployerProfile";
import Passwordsettings from "./pages/Dashboard/TechTalent/setting/Passwordsettings.jsx";
import DashboardProfileForm from "./pages/Dashboard/TechTalent/DashboardProfileForm/index.jsx";
import Wallet from "./pages/Dashboard/wallet/Wallet.jsx";
import Register from "./pages/Register/index.jsx";
import Login from "./pages/Login/index.jsx";
import PasswordRecovery from "./pages/Login/PasswordRecovery.jsx";
import ResetPassword from "./pages/Login/ResetPassword.jsx";
import { Otp } from "./pages/Login/Otp.jsx";
import EmailVerificationNotice from "./components/EmailVerificationNotice/index.jsx";
import SelectAccountType from "./components/SelectAccountType";
import PostJobs from "./pages/Dashboard/Employer/routes/PostJobs/index.jsx";
import Overview from "./pages/Dashboard/Overview.jsx";
import AlertTab from "./components/AlertTab/index.jsx";
import notification_data from "./utils/data/notifications.js";
import JobPosts from "./pages/Dashboard/Employer/routes/JobPosts/index.jsx";
import JobApplicants from "./pages/Dashboard/Employer/routes/JobApplicants/index.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* Registration */}
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<SelectAccountType />} />
        {/* Log in */}
        <Route path="/login" element={<Login />} />
        <Route path="/profilelanding" element={<ProfileLanding />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/techprofileform" element={<DashboardProfileForm />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/employerprofile" element={<EmployerProfileForm />} />

        {/* Modals */}
        <Route path="/mailverification" element={<EmailVerificationNotice />} />
        <Route path="/forgotpassword" element={<PasswordRecovery />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/otp" element={<Otp />} />
        {/* <Route
          path="test"
          element={
            <SuccessModular
              title="Verification Successful"
              description="Congratulations your account has been verified successfully"
              action={{
                path: "/login",
                text: " Login to your account",
              }}
            />
          }
        /> */}
        <Route path="test" element={<PostJobs />} />
        <Route
          path="/tech-talent-profile-form"
          element={<DashboardProfileForm />}
        />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Overview />} />
          {/* <Route path="messages" element={<Chat />} /> */}
          <Route path="notifications" element={<AlertTab items={notification_data} />} />
          <Route path="profile" element={<DashProfile />} />
          <Route path="posts">
            <Route path="" element={<JobPosts />} />
            <Route path="create" element={<PostJobs />} />
          </Route>
          <Route path="applicants" element={<JobApplicants />} />
          <Route path="applications" element={<h2>My Applications </h2>} />
          <Route path="saved" element={<h2>Saved Jobs </h2>} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="analytics" element={<h2>Analytics </h2>} />
          <Route path="profile-details" element={<h2>Profile Details</h2>} />
          <Route path="password-settings" element={<Passwordsettings />} />
          <Route path="Privacy" element={<h2>Privacy</h2>} />
          <Route
            path="terms-and-conditions"
            element={<h2>Terms and Conditions</h2>}
          />
          <Route path="help" element={<h2>Help </h2>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

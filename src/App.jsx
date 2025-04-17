import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProfileLanding from "./pages/ProfileLanding.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Explore from "./components/hero/Explore.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import EmployerProfileForm from "./pages/Dashboard/Employer/EmployerProfile/index.jsx";
import Passwordsettings from "./pages/Dashboard/TechTalent/setting/Passwordsettings.jsx";
import DashboardProfileForm from "./pages/Dashboard/TechTalent/DashboardProfileForm/index.jsx";
// import Wallet from "./pages/Dashboard/wallet/Wallet.jsx";
import JobListings from "./pages/Dashboard/job-listings";
import Login from "./pages/Login/index.jsx";
import PasswordRecovery from "./pages/Login/PasswordRecovery.jsx";
import ResetPassword from "./pages/Login/ResetPassword.jsx";
import { Otp } from "./pages/Login/Otp.jsx";
import SelectAccountType from "./components/SelectAccountType/selectaccountype.jsx";
import PostJobs from "./pages/Dashboard/Employer/routes/PostJobs/index.jsx";
import NotificationTab from "./components/NotificationTab/index.jsx";
import JobPosts from "./pages/Dashboard/Employer/routes/JobPosts/index.jsx";
// import JobApplicants from "./pages/Dashboard/Employer/routes/JobApplicants/index.jsx";
import EmployerVerificationForm from "./pages/Dashboard/Employer/routes/EmployerDashProfile/EmployerVerificationForm.jsx";
import ProfileController from "./utils/routers/ProfileController.jsx";
import Overview from "./utils/routers/Overview.jsx";
import SubscriptionController from "./utils/routers/SubscriptionController.jsx";
import { VerificationProvider } from "./pages/Dashboard/Employer/routes/EmployerDashProfile/VerificationContext.jsx";
import ProtectedRoute from "./utils/routers/ProtectedRoute.jsx";
import SavedJobCard from "./pages/Dashboard/TechTalent/SavedJobs/SavedJobCard/index.jsx";
import { SubSuccess } from "./pages/Dashboard/subscriptions/SubSuccess.jsx";
import Findjob from "./pages/FindJob/FindjobPage.jsx";
import Faq from "./pages/Faq/Faq.jsx";
import PrivacyPolicy from "./pages/Privacy/Privacy.jsx";
import TermsAndCondition from "./pages/TermsAndCondition/TermsAndCondition.jsx";
import Help from "./pages/Dashboard/Help/Help.jsx";
import SavedJobs from "./pages/Dashboard/TechTalent/SavedJobs/index.jsx";
import Interview from "./pages/Dashboard/Employer/routes/Interview/Interview.jsx";
import CompanyServices from "./pages/Dashboard/Employer/routes/Mycompanyservices/CompanyServices.jsx";
import ReviewApplicants from "./pages/Dashboard/Employer/routes/JobApplicants/reviewApplicant/ReviewApplicants.jsx";
import FullReview from "./pages/Dashboard/Employer/routes/JobApplicants/reviewApplicant/FullReview.jsx";
import Applications from "./pages/Dashboard/TechTalent/ApplicationCard/index.jsx";
import FeaturedTalent from "./pages/Dashboard/FeaturedTalent/index.jsx";
import PostJobForm from "./pages/PostJobForm.jsx";
import SuccessfulJobPost from "./components/ExternalJobPost/SuccessfulJobPost.jsx";
import LoginForm from "./pages/Login/Login.jsx";
import SignupForm from "./pages/Register/SignupPage.jsx";
import { ServiceProviderDashboard } from "./pages/services-provider.jsx";
import { ServicesProviderHomePage } from "./pages/Dashboard/ServiceProvider/dashboardhome.jsx";
import ServiceProviderProfile from "./pages/Dashboard/ServiceProvider/profile.jsx";
import { ServiceProviderFormCompletion } from "./pages/servicesprovidercompleteform.jsx";
import { JobTracker } from "./pages/Dashboard/ServiceProvider/jobs-tracker.jsx";
import MessagesPage from "./pages/Dashboard/messages.jsx";
import { AgentDashboard } from "./pages/agent.jsx";
import AgentHomePage from "./pages/Dashboard/Agent/dashboardhome.jsx";
import XCandidatesPage from "./pages/Dashboard/Agent/newcandidate.jsx";
import CandidatesPage from "./pages/Dashboard/Agent/candidates.jsx";
import CandidateManagementPage from "./pages/Dashboard/Agent/candidatesmatches.jsx";
import AgentProfilePage from "./pages/Dashboard/Agent/agentprofile.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
        />
        <Route
          path="/services"
          element={<Services />}
        />
        <Route
          path="/services-provider/complete-profile"
          element={<ServiceProviderFormCompletion />}
        />

        <Route
          path="/agent/dashboard"
          element={
            <VerificationProvider>
              <AgentDashboard />
            </VerificationProvider>
          }>
          <Route
            index
            element={<AgentHomePage />}
          />
          <Route
            path="profile"
            element={<AgentProfilePage />}
          />
          <Route
            path="candidates"
            element={<CandidatesPage />}
          />
          <Route
            path="jobs"
            element={<XCandidatesPage />}
          />
          <Route
            path="chats"
            element={<XCandidatesPage />}
          />
          <Route
            path="candidate-matches"
            element={<CandidateManagementPage />}
          />
        </Route>

        <Route
          path="/services-provider"
          element={
            <VerificationProvider>
              <ServiceProviderDashboard />
            </VerificationProvider>
          }>
          <Route
            index
            element={<ServicesProviderHomePage />}
          />
          <Route
            path="profile"
            element={<ServiceProviderProfile />}
          />
          <Route
            path="job-tracker"
            element={<JobTracker />}
          />
          <Route
            path="messages"
            element={<MessagesPage />}
          />
        </Route>

        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/post-job-form"
          element={<PostJobForm />}
        />
        <Route
          path="/findjob"
          element={<Findjob />}
        />
        <Route
          path="/faqs"
          element={<Faq />}
        />
        <Route
          path="/privacy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="/terms"
          element={<TermsAndCondition />}
        />
        <Route
          path="/successfulJobPost"
          element={<SuccessfulJobPost />}
        />
        {/* Registration */}
        <Route
          path="/register"
          element={<SignupForm />}
        />
        <Route
          path="/create"
          element={<SelectAccountType />}
        />
        {/* Log in */}
        <Route
          path="/login"
          element={<LoginForm />}
        />
        <Route element={<ProtectedRoute />}>
          {/* <Route element={<VerificationProvider/>}>
            <Route path="/verifiedForm" element={<EmployerVerificationForm/>} />
          </Route> */}
          <Route
            path="/verifiedForm"
            element={
              <VerificationProvider>
                <EmployerVerificationForm />
              </VerificationProvider>
            }></Route>
          <Route
            path="/profilelanding"
            element={<ProfileLanding />}
          />
          <Route
            path="/explore"
            element={<Explore />}
          />
          <Route
            path="/techprofileform"
            element={<DashboardProfileForm />}
          />
          <Route
            path="/employerprofile"
            element={<EmployerProfileForm />}
          />
          <Route
            path="/dashboard"
            element={
              <VerificationProvider>
                <Dashboard />
              </VerificationProvider>
            }>
            <Route
              path=""
              element={<Overview />}
            />
            <Route
              path="notifications"
              element={<NotificationTab />}
            />
            <Route
              path="profile"
              element={<ProfileController />}
            />
            <Route
              path="featuredTalent"
              element={<FeaturedTalent />}
            />
            {/* <Route path="profile" element={<VerificationProvider>
              <ProfileController />
            </VerificationProvider>} /> */}
            <Route path="posts">
              <Route
                path=""
                element={<JobPosts />}
              />
              <Route
                path="create"
                element={<PostJobs />}
              />
            </Route>
            {/* <Route path="applicants" element={<JobApplicants />} /> */}
            <Route
              path="posts/review-applicants/:id"
              element={<ReviewApplicants />}
            />
            <Route
              path="review-appliedtalent/:id"
              element={<FullReview />}
            />
            <Route
              path="interviews"
              element={<Interview />}
            />
            <Route
              path="services"
              element={<CompanyServices />}
            />
            <Route
              path="applications"
              element={<Applications />}
            />
            <Route
              path="saved"
              element={<SavedJobs />}
            />
            {/* <Route path="wallet" element={<Wallet />} />W */}
            <Route
              path="job-listings"
              element={<JobListings />}
            />
            <Route
              path="analytics"
              element={<h2>Analytics </h2>}
            />
            <Route
              path="subscription"
              element={<SubscriptionController />}
            />
            <Route
              path="profile-details"
              element={<h2>Profile Details</h2>}
            />
            <Route
              path="password-settings"
              element={<Passwordsettings />}
            />
            <Route
              path="privacy"
              element={<PrivacyPolicy />}
            />
            <Route
              path="terms"
              element={<TermsAndCondition />}
            />
            <Route
              path="help"
              element={<Help />}
            />
          </Route>
          <Route
            path="/sub-success"
            element={<SubSuccess />}>
            <Route
              path=":reference"
              element={<SubSuccess />}
            />
          </Route>
        </Route>

        {/* Modals */}
        <Route
          path="/forgotpassword"
          element={<PasswordRecovery />}
        />
        <Route
          path="/resetpassword"
          element={<ResetPassword />}
        />
        <Route
          path="/otp"
          element={<Otp />}
        />
        <Route
          path="/auth/reset-password"
          element={<ResetPassword />}
        />
        <Route
          path="/iso"
          element={<SavedJobCard />}
        />
        {
          <Route
            path="job-listings"
            element={<JobListings />}
          />
        }
      </Routes>
    </>
  );
}

export default App;

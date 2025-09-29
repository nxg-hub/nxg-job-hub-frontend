import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { ServiceProviderProfileCompleteForm } from "./pages/servicesprovidercompleteform.jsx";
import { XServiceProviderFormCompletion } from "./pages/xservicesprovidercompleteform.jsx";
import { JobTracker } from "./pages/Dashboard/ServiceProvider/jobs-tracker.jsx";
import MessagesPage from "./pages/Dashboard/messages.jsx";
import { AgentDashboard } from "./pages/agent.jsx";
import DashboardTab from "./pages/Dashboard/Agent/dashboard-tab.jsx";
import MatchesTab from "./pages/Dashboard/Agent/matches-tab.jsx";
import JobsTab from "./pages/Dashboard/Agent/jobs-tab.jsx";
import CandidatesTab from "./pages/Dashboard/Agent/candidates-tabs.jsx";
import MessagesTab from "./pages/Dashboard/Agent/messages-tab.jsx";
import ProfileTab from "./pages/Dashboard/Agent/profile-tab.jsx";
import EmployerTab from "./pages/Dashboard/Agent/employers-tab.jsx";
import { EmployerDashboard } from "./pages/employer.jsx";
import EmployerDashboardTab from "./pages/Dashboard/Employer2/employer-dashboard-tab.jsx";
import EmployerJobTab from "./pages/Dashboard/Employer2/employer-job-tab.jsx";
import EmployerCompanyProfileTab from "./pages/Dashboard/Employer2/employer-company-profile-tab.jsx";
import EmployerApplicantsTab from "./pages/Dashboard/Employer2/employer-applicants-tab.jsx";

import EmployerSettingTab from "./pages/Dashboard/Employer2/employer-setting-tab.jsx";
import EmployerMessagesTab from "./pages/Dashboard/Employer2/employer-message-tab.jsx";
import { TalentDashboard } from "./pages/talent.jsx";
import TalentDashboardTab from "./pages/Dashboard/Talent/talent-dashboard-tab.jsx";
import TalentProfileTab from "./pages/Dashboard/Talent/talent-profile-tab.jsx";
import TalentJobsTab from "./pages/Dashboard/Talent/talent-jobs-tab.jsx";
import TalentMessageTab from "./pages/Dashboard/Talent/talent-message-tab.jsx";
import { EmployerProfileCompleteForm } from "./pages/employerCompleteForm.jsx";
import AgentCompleteProfileForm from "./pages/agentCompleteProfile.jsx";
import EmployerVerifiedDocuments from "./pages/employerVerifiedDocument.jsx";
import AgentCompleteProfile from "./pages/agentCP.jsx";
import JobPreview from "./pages/Dashboard/Employer2/employer-job-preview.jsx";
import { EmployerSubscription } from "./pages/Dashboard/subscriptions/EmployerSubscription.jsx";
import { SubscriptionPage } from "./pages/subscribePage.jsx";
import { TechTalentProfileCompleteForm } from "./pages/talentCompleteForm.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-job-form" element={<PostJobForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/create" element={<SelectAccountType />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-job-form" element={<PostJobForm />} />
        <Route path="/findjob" element={<Findjob />} />
        <Route path="/faqs" element={<Faq />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/successfulJobPost" element={<SuccessfulJobPost />} />
        <Route path="/techtalent/complete-profile" element={<TechTalentProfileCompleteForm/>} />

        {/* agent user routes */}
        <Route path="/agent" element={<AgentDashboard />}>
          <Route index element={<DashboardTab />} />
          <Route path="profile" element={<ProfileTab />} />
          <Route path="employers" element={<EmployerTab />} />
          <Route path="candidates" element={<CandidatesTab />} />
          <Route path="jobs" element={<JobsTab />} />
          <Route path="chats" element={<MessagesTab />} />
          <Route path="candidate-matches" element={<MatchesTab />} />
        </Route>
        <Route
          path="/agent/complete-profile"
          element={<AgentCompleteProfileForm />}
        />
        <Route
          path="/agent/complete-profile-form"
          element={<AgentCompleteProfile />}
        />
        {/* end agent user routes */}

        {/* service provider user routes */}
        <Route path="/services-provider" element={<ServiceProviderDashboard />}>
          <Route index element={<ServicesProviderHomePage />} />
          <Route path="profile" element={<ServiceProviderProfile />} />
          <Route path="job-tracker" element={<JobTracker />} />
          <Route path="messages" element={<MessagesPage />} />
        </Route>
        <Route
          path="/services-provider/complete-profile"
          element={<ServiceProviderProfileCompleteForm />}
        />
        <Route
          path="/services-provider/complete-profile-x"
          element={<XServiceProviderFormCompletion />}
        />
        <Route
          path="/services-provider/complete-profile-x"
          element={<XServiceProviderFormCompletion />}
        />
        {/* end service provider user routes */}

        {/* talent user routes */}
        <Route path="/talent" element={<TalentDashboard />}>
          <Route index element={<TalentDashboardTab />} />
          <Route path="profile" element={<TalentProfileTab />} />
          <Route path="jobs" element={<TalentJobsTab />} />
          <Route path="messages" element={<TalentMessageTab />} />
        </Route>
        {/* end talent user routes */}

        {/* employer's user routes */}
        <Route path="/employer" element={<EmployerDashboard />}>
          <Route index element={<EmployerDashboardTab />} />
          <Route path="jobs" element={<EmployerJobTab />} />
          <Route
            path="companyprofile"
            element={<EmployerCompanyProfileTab />}
          />
          <Route path="applicants" element={<EmployerApplicantsTab />} />
          <Route path="messages" element={<EmployerMessagesTab />} />
          <Route path="setting" element={<EmployerSettingTab />} />
          <Route path="subscription" element={<SubscriptionPage />} />
        </Route>
        <Route
          path="/employer/complete-profile"
          element={<EmployerProfileCompleteForm />}
        />
        <Route
          path="/employer/verified-document"
          element={<EmployerVerifiedDocuments />}
        />
        <Route
          path="/employer/subscriptions"
          element={<EmployerSubscription />}
        />
        <Route path="/job/preview" element={<JobPreview />} />
        {/* end employer user routes */}

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
            }
          ></Route>

          <Route path="/profilelanding" element={<ProfileLanding />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/techprofileform" element={<DashboardProfileForm />} />
          <Route path="/employerprofile" element={<EmployerProfileForm />} />

          <Route
            path="/dashboard"
            element={
              <VerificationProvider>
                <Dashboard />
              </VerificationProvider>
            }
          >
            <Route path="" element={<Overview />} />
            <Route path="notifications" element={<NotificationTab />} />
            <Route path="profile" element={<ProfileController />} />
            <Route path="featuredTalent" element={<FeaturedTalent />} />
            {/* <Route path="profile" element={<VerificationProvider>
              <ProfileController />
            </VerificationProvider>} /> */}
            <Route path="posts">
              <Route path="" element={<JobPosts />} />
              <Route path="create" element={<PostJobs />} />
            </Route>
            {/* <Route path="applicants" element={<JobApplicants />} /> */}
            <Route
              path="posts/review-applicants/:id"
              element={<ReviewApplicants />}
            />
            <Route path="review-appliedtalent/:id" element={<FullReview />} />
            <Route path="interviews" element={<Interview />} />
            <Route path="services" element={<CompanyServices />} />
            <Route path="applications" element={<Applications />} />
            <Route path="saved" element={<SavedJobs />} />
            {/* <Route path="wallet" element={<Wallet />} />W */}
            <Route path="job-listings" element={<JobListings />} />
            <Route path="analytics" element={<h2>Analytics </h2>} />
            <Route path="subscription" element={<SubscriptionController />} />
            <Route path="profile-details" element={<h2>Profile Details</h2>} />
            <Route path="password-settings" element={<Passwordsettings />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsAndCondition />} />
            <Route path="help" element={<Help />} />
          </Route>

          <Route path="/sub-success" element={<SubSuccess />}>
            <Route path=":reference" element={<SubSuccess />} />
          </Route>
        </Route>

        {/* Modals */}
        <Route path="/forgotpassword" element={<PasswordRecovery />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/iso" element={<SavedJobCard />} />
        {<Route path="job-listings" element={<JobListings />} />}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

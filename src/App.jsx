import { Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home.jsx";
import ProfileLanding from "./pages/ProfileLanding.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Explore from "./components/hero/Explore.jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import EmployerProfileForm from "./pages/Dashboard/Employer/EmployerProfile/index.jsx";
import Passwordsettings from "./pages/Dashboard/Talent/setting/Passwordsettings.jsx";
// import DashboardProfileForm from "./pages/Dashboard/TechTalent/DashboardProfileForm/index.jsx";
// import Wallet from "./pages/Dashboard/wallet/Wallet.jsx";
// import JobListings from "./pages/Dashboard/job-listings";
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
// import ProfileController from "./utils/routers/ProfileController.jsx";
// import Overview from "./utils/routers/Overview.jsx";
import SubscriptionController from "./utils/routers/SubscriptionController.jsx";
import { VerificationProvider } from "./pages/Dashboard/Employer/routes/EmployerDashProfile/VerificationContext.jsx";
import ProtectedRoute from "./utils/routers/ProtectedRoute.jsx";
// import SavedJobCard from "./pages/Dashboard/TechTalent/SavedJobs/SavedJobCard/index.jsx";
import { SubSuccess } from "./pages/Dashboard/subscriptions/SubSuccess.jsx";
import Findjob from "./pages/FindJob/FindjobPage.jsx";
import Faq from "./pages/Faq/Faq.jsx";
import PrivacyPolicy from "./pages/Privacy/Privacy.jsx";
import TermsAndCondition from "./pages/TermsAndCondition/TermsAndCondition.jsx";
import Help from "./pages/Dashboard/Help/Help.jsx";
// import SavedJobs from "./pages/Dashboard/TechTalent/SavedJobs/index.jsx";
import Interview from "./pages/Dashboard/Employer/routes/Interview/Interview.jsx";
import CompanyServices from "./pages/Dashboard/Employer/routes/Mycompanyservices/CompanyServices.jsx";
import ReviewApplicants from "./pages/Dashboard/Employer/routes/JobApplicants/reviewApplicant/ReviewApplicants.jsx";
import FullReview from "./pages/Dashboard/Employer/routes/JobApplicants/reviewApplicant/FullReview.jsx";
// import Applications from "./pages/Dashboard/TechTalent/ApplicationCard/index.jsx";
// import FeaturedTalent from "./pages/Dashboard/FeaturedTalent/index.jsx";
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
import TalentMessageTab from "./pages/Dashboard/Talent/talent-message-tab.jsx";
import { EmployerProfileCompleteForm } from "./pages/CompleteYourProfile/employer/employerCompleteForm.jsx";
import JobPreview from "./pages/Dashboard/Employer2/employer-job-preview.jsx";
import { EmployerSubscription } from "./pages/Dashboard/subscriptions/EmployerSubscription.jsx";
import { SubscriptionPage } from "./pages/subscribePage.jsx";
import { TechTalentProfileCompleteForm } from "./pages/talentCompleteForm.jsx";
import { TalentJobTracker } from "./pages/Dashboard/Talent/TalentJobTracker.jsx";
import CreateAccountType from "./components/SelectAccountType/createaccountype.jsx";
import SuccessfulSignupPage from "./pages/Register/successfulSignUpPage.jsx";
import EmployerVerifiedDocuments from "./pages/employerVerifiedDocument.jsx";
import JobCategoryPage from "./pages/JobCategoryPage.jsx";
import JobCategoriesPage from "./pages/JobCategoriesPage.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import FeaturedTalentPagesTab from "./pages/Dashboard/Employer2/featured-talent-page.jsx";
import EmployerHelpCenterTab from "./pages/Dashboard/Employer2/employerHelpCenterTab.jsx";
import TalentServiceProvider from "./pages/Dashboard/Talent/TalentServiceProvider.jsx";
import PaymentCallback from "./pages/Dashboard/Talent/components/PaymentCallback.jsx";

const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="post-job-form" element={<PostJobForm />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupForm />} />
        </Route>
        <Route path="/jobs/:category" element={<JobCategoryPage />} />
        <Route path="/all-categories" element={<JobCategoriesPage />} />
        <Route
          path="/register/success-signup"
          element={<SuccessfulSignupPage />}
        />
        <Route path="/create" element={<SelectAccountType />} />
        <Route path="/createAccount" element={<CreateAccountType />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-job-form" element={<PostJobForm />} />
        <Route path="/findjob" element={<Findjob />} />
        <Route path="/faqs" element={<Faq />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/successfulJobPost" element={<SuccessfulJobPost />} />

        {/* service provider user routes */}
        <Route path="/services-provider" element={<ServiceProviderDashboard />}>
          <Route index element={<ServicesProviderHomePage />} />
          <Route path="profile" element={<ServiceProviderProfile />} />
          <Route path="job-tracker" element={<JobTracker />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="setting" element={<Passwordsettings />} />
        </Route>
        <Route
          path="/services-provider/complete-profile"
          element={<ServiceProviderProfileCompleteForm />}
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
          <Route path="setting" element={<Passwordsettings />} />
          <Route path="jobs" element={<TalentJobTracker />} />
          <Route path="messages" element={<TalentMessageTab />} />
          {/* <Route path="subscriptions" element={<TechTalentSubscription />} /> */}
          <Route path="service-providers" element={<TalentServiceProvider />} />
          <Route path="payment-callback" element={<PaymentCallback />} />
        </Route>
        <Route
          path="/techtalent/complete-profile"
          element={<TechTalentProfileCompleteForm />}
        />
        {/* end talent user routes */}

        {/* employer's user routes */}
        <Route path="/employer" element={<EmployerDashboard />}>
          <Route index element={<EmployerDashboardTab />} />
          <Route path="jobs" element={<EmployerJobTab />} />
          <Route
            path="companyprofile"
            element={<EmployerCompanyProfileTab />}
          />
          <Route path="featuredTalent" element={<FeaturedTalentPagesTab />} />
          <Route path="applicants" element={<EmployerApplicantsTab />} />
          <Route path="messages" element={<EmployerMessagesTab />} />
          <Route path="help-center" element={<EmployerHelpCenterTab />} />
          <Route path="setting" element={<EmployerSettingTab />} />
          <Route path="subscription" element={<EmployerSubscription />} />
        </Route>
        <Route path="/sub-success" element={<SubSuccess />}>
          <Route path=":reference" element={<SubSuccess />} />
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
            }></Route>

          <Route path="/profilelanding" element={<ProfileLanding />} />
          <Route path="/explore" element={<Explore />} />
          {/* <Route path="/techprofileform" element={<DashboardProfileForm />} /> */}
          <Route path="/employerprofile" element={<EmployerProfileForm />} />

          {/* <Route
            path="/dashboard"
            element={
              <VerificationProvider>
                <Dashboard />
              </VerificationProvider>
            }>
            <Route path="" element={<Overview />} />
            <Route path="notifications" element={<NotificationTab />} />
            <Route path="profile" element={<ProfileController />} />
            <Route path="featuredTalent" element={<FeaturedTalent />} />
            <Route path="profile" element={<VerificationProvider>
              <ProfileController />
            </VerificationProvider>} />
            <Route path="posts">
              <Route path="" element={<JobPosts />} />
              <Route path="create" element={<PostJobs />} />
            </Route>
            <Route path="applicants" element={<JobApplicants />} />
            <Route
              path="posts/review-applicants/:id"
              element={<ReviewApplicants />}
            />
            <Route path="review-appliedtalent/:id" element={<FullReview />} />
            <Route path="interviews" element={<Interview />} />
            <Route path="services" element={<CompanyServices />} />
            <Route path="applications" element={<Applications />} />
            <Route path="saved" element={<SavedJobs />} />
            <Route path="wallet" element={<Wallet />} />W
            <Route path="job-listings" element={<JobListings />} />
            <Route path="analytics" element={<h2>Analytics </h2>} />
            <Route path="subscription" element={<SubscriptionController />} />
            <Route path="profile-details" element={<h2>Profile Details</h2>} />
            <Route path="password-settings" element={<Passwordsettings />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsAndCondition />} />
            <Route path="help" element={<Help />} />
          </Route>  */}

          <Route path="/sub-success" element={<SubSuccess />}>
            <Route path=":reference" element={<SubSuccess />} />
          </Route>
        </Route>

        {/* Modals */}
        <Route path="/forgotpassword" element={<PasswordRecovery />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        {/* <Route path="/iso" element={<SavedJobCard />} /> */}
        {/* {<Route path="job-listings" element={<JobListings />} />} */}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

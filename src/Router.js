import React, { lazy } from "react";

const Home = lazy(()=>import("./pages/Home.jsx"));
const Services = lazy(()=>import("./pages/Services.jsx"));
const About = lazy(()=>import("./pages/About.jsx"));
const Contact = lazy(()=>import("./pages/Contact.jsx"));
const Employer = lazy(()=>import("./pages/CreateAccount/Employer"));
const TechTalent = lazy(()=>import("./pages/CreateAccount/TechTalent"));
const EmailVeri = lazy(()=>import("./pages/CreateAccount/TechTalent/EmailVeri.jsx"));
const LogTalent = lazy(()=>import("./pages/LoginAccount/index.jsx"));
const ProfileLanding = lazy(()=>import("./pages/ProfileLanding.jsx"));
const ForgotPassword = lazy(()=>import("./pages/LoginAccount/ForgotPassword.jsx"));
const ResetPassword = lazy(()=>import("./pages/LoginAccount/ResetPassword.jsx"));
const Otp = lazy(()=>import("./pages/LoginAccount/Otp.jsx"));


const AppRoutes = [
    {
        path:"/",
        element: <Home/>
    },
    {
        path:"/services",
        element: <Services/>
    },
    {
        path:"/about",
        element: <About/>
    },
    {
        path:"/contact",
        element: <Contact/>
    },
    {
        path:"/employer",
        element: <Employer/>
    },
    {
        path:"/techtalent",
        element: <TechTalent/>
    },
    {
        path:"/mailverification",
        element: <EmailVeri/>
    },
    {
        path:"/logtalent",
        element: <LogTalent/>
    },
    {
        path:"/profilelanding",
        element: <ProfileLanding/>
    },
    {
        path:"/forgotpassword",
        element: <ForgotPassword/>
    },
    {
        path:"/resetpassword",
        element: <ResetPassword/>
    },
    {
        path:"/otp",
        element: <Otp/>
    },
    {
        path:"*",
        element: <div>Page Not Found</div>
    }
]
export default AppRoutes;
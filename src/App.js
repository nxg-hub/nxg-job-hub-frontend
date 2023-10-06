import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employer from "./pages/CreateAccount/Employer";
import TechTalent from "./pages/CreateAccount/TechTalent";
import  LogTalent  from "./pages/LoginAccount/index";
import ForgotPassword from "./pages/LoginAccount/ForgotPassword";
import { Otp } from "./pages/LoginAccount/Otp";
import ProfileLanding from "./pages/ProfileLanding";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ResetPassword from "./pages/LoginAccount/ResetPassword";
import EmailVeri from "./pages/CreateAccount/TechTalent/EmailVeri";
import Explore from "./components/hero/Explore";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import EmployerRegistration from "./pages/CreateAccount/Employer/EmployerRegistration";
import EmployerLogin from "./pages/Login/Employer";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/techtalent" element={<TechTalent />}/>
        <Route path="/mailverification" element={<EmailVeri />}/>
        <Route path="/logtalent" element={<LogTalent/>}/>
        <Route path="/profilelanding" element={<ProfileLanding/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<CreateAccount />}/>
        <Route path="register/employer" element={<EmployerRegistration />} />
        <Route path="login" element={<Login />}/>
        <Route path="login/employer" element={<EmployerLogin />} />
      </Routes>
      
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import {default as EmployerRegistration} from "./pages/CreateAccount/Employer";
import Login from "./pages/Login";
import {default as EmployerLogin}  from "./pages/Login/Employer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<CreateAccount />}/>
        <Route path="register/employer" element={<EmployerRegistration />} />
        <Route path="login" element={<Login />}/>
        <Route path="login/employer" element={<EmployerLogin />} />
        
      </Routes>
      
    </Router>
  );
}

export default App;

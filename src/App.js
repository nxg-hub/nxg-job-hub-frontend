import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Employer from "./pages/CreateAccount/Employer";
import { TechTalent } from "./pages/TechTalent";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<CreateAccount />}/>
        <Route path="register/employer" element={<Employer />} />
        <Route path="register/techtalent" element={<TechTalent />}/>
      </Routes>
    </Router>
  );
}

export default App;

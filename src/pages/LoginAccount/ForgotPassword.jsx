import React, {useState} from 'react';
import Logo from "../../static/images/logo_colored.png";
import Inputs from '../../components/accounts/Inputs';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div className="forgot-container">
            <div style={{width:"7rem", height:"5rem", margin:"auto"}}>
                <img src={Logo} alt="NXG-Logo" className="logo" />
            </div>
            <div className="forgot-text">
                <h1 style={{fontFamily:"Inter", fontSize:"1.5rem", fontWeight:"600", lineHeight:"2.5rem", marginBottom:"1.3rem"}}>Forgot Password</h1>
                <p  style={{fontFamily:"Inter", fontSize:".8rem", fontWeight:"500", lineHeight:"1.4rem"}}>
                    Enter the email address associated to your account and we will send you a link <br />
                     to reset your password.
                </p>
            </div>
            <form>
                <Inputs 
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                errormessage='Email must inculde special charaters like @ and .!'
                required
                />
                <div className="btn" id='forgot-btn'>
                    <button
                        style={{ background: "#2596BE"}}
                    >
                        Submit
                    </button>
            </div>
            </form>
            <p style={{textAlign:"start", fontSize:".8rem", fontWeight:"500", fontFamily:"Montserrat", marginTop:"-2.5rem"}}><Link to="/logtalent" style={{color:"#000000"}}>Back to Login</Link></p>
        </div>
    </div>
  )
}

export default ForgotPassword
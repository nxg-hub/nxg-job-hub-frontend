// import axios from 'axios';
import React, { useState } from 'react'

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleReset = () => {
// axios.post
    }

  return (
    <div>
        <div className="reset-main" style={{width:"30%", padding:"1rem 2.4rem", border:"0.03rem solid #2596BE", borderRadius:"0.8rem"}}>
            <h2 style={{ fontFamily: "Inter", fontSize: "1.6rem", fontWeight: "600", lineHeight: "2.5rem", marginBottom:"1rem"}}>Reset Password</h2>
            <form onSubmit={handleReset}>
                <div className="password">
                    <label>New Password</label>
                    <div className="password-input">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="*******"
                            autoComplete='current-password'
                            // errormessage='Password should be a minimum of 8 characters and should inculde at least 1 special charater, numbers and letters!'
                            // pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"//Minimum eight characters, at least one letter, one number and one special character
                            required
                        />
                    </div>
                </div>
                <div className="password" style={{margin:"1rem 0"}}>
                    <label>Confirm Password</label>
                    <div className="password-input">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="*******"
                            autoComplete='current-password'
                            errormessage='Password did not match!'
                            // pattern={password}//Minimum eight characters, at least one letter, one number and one special character
                            required
                        />
                    </div>
                </div>
                <button style={{background:"#2596BE", color:"#fff", padding:".6rem", width:"100%", border:"none", borderRadius:".4rem", margin:"1rem 0"}}>Reset Password</button>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword
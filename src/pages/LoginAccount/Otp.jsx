import React, { useState } from 'react'

export const Otp = () => {
    const [otp, setOtp] =useState(new Array(4).fill(""));

    const handleOtpChange = (element, index) => {
        if(isNaN(element.value)) return false;

        setOtp([...otp.map((data, item) => (item === index) ? element.value : data)]);

        //Focus inputs
        if (element.nextSibling){
            element.nextSibling.focus();
        }
    };

    const generateRandomOtp = () => {
        // Generate a random 6-digit OTP
        const randomOtp = Math.floor(100000 + Math.random() * 900000);
        console.log(randomOtp);

        return randomOtp.toString();
    
    };

    const sendOtp = () => {
        // Generate a random OTP
        const randomOtp = generateRandomOtp();

        // Display the generated OTP
        alert(`Generated OTP: ${randomOtp}`);
    }

  return (
    <>
    <div className="otp-main">
        <div style={{marginBottom:"1.3rem"}}>
            <h2 style={{ fontFamily: "Inter", fontSize: "1.6rem", fontWeight: "600", lineHeight: "2.5rem" }}>OTP Verification</h2>
            <p style={{ fontFamily: "Inter", fontSize: ".8rem", fontWeight: "500" }}>Kindly enter the 4-digit code sent to your phone number </p>
        </div>
        {otp.map((data, index) => {
            return (
                <input
                    className='otp-box' 
                    type="text" 
                    name='otp'
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                />
            );
        })}
        <div style={{fontFamily:" Inter", fontSize: ".9rem", fontWeight: "500", margin:"1.2rem 0"}}>
            <button style={{background:"#2596BE", color:"#fff", padding:".6rem", width:"100%", border:"none", borderRadius:".4rem"}} onClick={sendOtp}>Submit</button>
            <button style={{marginRight:".5rem", color:"#8E8E8E", background:"transparent", border:"none", textDecoration:"underline", marginTop:".6rem", fontSize:".7rem"}}>Resend OTP</button>
        </div>
    </div>
    </>
  )
}

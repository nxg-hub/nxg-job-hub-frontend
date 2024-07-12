import React, { useState, useEffect} from 'react'
import logo from '../../../../static/images/nxg-logo.png'
import axios from 'axios';
import { API_HOST_URL } from '../../../../utils/api/API_HOST';
import { PiLink } from 'react-icons/pi'

export default function SubUssd() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const loginKey = window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') || window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
            if (!loginKey) {
              console.error('Authentication key not available.');
              return;
            }
            const { authKey, id } = JSON.parse(loginKey);
            if (!authKey || !id) {
              console.error('Auth key or user id not available.');
              return;
            }
    
            const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
              headers: {
                'Content-Type' : 'application/json',
                authorization: authKey,
              },
            });
            const userData = response.data;
            setEmail(userData.email);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        fetchUserData(); // Invoke the fetchUserData function
      }, []);

  return (
    <div className='sub-pay-side'>
        <div className="sub-pay-logo-section">
            <div className="sub-pay-logo">
                <img src={logo} alt="Nxg-logo" />
            </div>
            <div className="sub-pay-mail-section">
                <span>{email}</span>
                <p>Pay <span className='pay'>$ 70</span></p>
           </div>
        </div>
        <div className="sub-qr-section">
            <h4>Choose Your Bank To Make Payment</h4>
            <div className="sub-ussd-form">
               <div className="sub-bank-name ussd-bank-name">
                    <h5>First Bank of Nigeria</h5>
                    <p>*894*.....*......#</p>
               </div>
               <div className="sub-ussd-copy-section">
                    <h5>Dial The Code Below To Complete Your Payment</h5>
                    <p>
                        <PiLink style={{color:"#00678F"}}/>
                        <span>*894*70*123456789#</span>
                    </p>
                    <button>Copy</button>
                </div>
            </div>
            
            <div className="sub-ussd-btns">
                <button className='btn-complete'>Payment Completed</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
  )
}

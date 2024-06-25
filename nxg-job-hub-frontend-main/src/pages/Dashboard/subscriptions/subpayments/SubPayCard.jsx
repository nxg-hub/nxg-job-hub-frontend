import React, { useState, useEffect} from 'react';
import logo from '../../../../static/images/nxg-logo.png';
import axios from 'axios';
import { API_HOST_URL } from '../../../../utils/api/API_HOST';

export default function SubPayCard() {
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
        <div className="sub-pay-card-section">
            <form>
                <div className="card-numb">
                    <label htmlFor="">Card Number</label>
                    <input type="number" placeholder='0000 0000 0000 0000' />
                </div>
                <div className="cvv-section">
                    <div className="card-date">
                        <label htmlFor="">Card Expiry Date</label>
                        <input type="number" placeholder='MM/YY' />
                    </div>
                    <div className="card-cvv">
                        <label htmlFor="">CVV</label>
                        <input type="number" placeholder='123' />
                    </div>
                </div>
                <div className="sub-pay-btn">
                    <button>Pay $70</button>
                </div>
            </form>
        </div>
    </div>
  )
}

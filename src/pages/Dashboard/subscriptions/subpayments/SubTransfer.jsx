import React, {useState, useEffect} from 'react';
import logo from '../../../../static/images/nxg-logo.png';
import arrow from '../../../../static/wallet-card-icons/import-export.svg';
import axios from 'axios';
import { API_HOST_URL } from '../../../../utils/api/API_HOST';

function SubTransfer() {
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
        <div className="sub-trans-section">
            <div className="sub-trans-logo-section">
                <div className="sub-trans-logo">
                    <img src={arrow} alt="import-logo" />
                </div>
                <p>Bank transfer</p>
            </div>
            <div className="sub-trans-contents">
                <div className="sub-bank-name">
                    <h5>Bank Name</h5>
                    <p className='sub-bank-para'>Guarantee Trust Bank</p>
                </div>
                <div className="sub-bank-name">
                    <h5>Account Number</h5>
                    <p className='sub-bank-para'>0001234678499</p>
                </div>
                <div className="sub-bank-name">
                    <h5>Amount</h5>
                    <p className='sub-bank-para'>$ 70</p>
                </div>
            </div>
            <div className="sub-trans-info">
                <p>Use this account details for the purpose of this transaction <span>ONLY</span></p>
            </div>
        </div>
    </div>
  )
}

export default SubTransfer
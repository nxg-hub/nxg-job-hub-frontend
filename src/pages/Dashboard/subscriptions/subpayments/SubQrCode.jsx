import React, {useState, useEffect} from 'react';
import logo from '../../../../static/images/nxg-logo.png';
import qrCode from '../../../../static/wallet-card-icons/qr-code-1.svg';
import axios from 'axios';
import { API_HOST_URL } from '../../../../utils/api/API_HOST';

export default function SubQrCode() {
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
            <p>Scan the QR code with your bank app to complete payment</p>
            <div className="sub-qr-icon">
                <img src={qrCode} alt="QR-Code Icon" />
            </div>
        </div>
    </div>
  )
}

import React, { useContext, useState, useEffect, useCallback} from 'react';
import { UserContext } from '../../..';
import Inputs from '../../../../../components/accounts/Inputs';
import Online from '../../../../../static/icons/online-icon.svg';
import { CiUser } from 'react-icons/ci';
import {MdOutlineVerifiedUser } from 'react-icons/md';
import './employerDashProfile.scss';
import { Link } from 'react-router-dom';
import { useVerification } from './VerificationContext';
import EmployerVerificationForm from './EmployerVerificationForm';
import axios from 'axios';
import { API_HOST_URL } from '../../../../../utils/api/API_HOST';

const EmployerDashProfile = () => {
    const user = useContext(UserContext)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [address, setAddress] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const currentYear = new Date().getFullYear() ;
  const {isVerified, setVerificationStatus} = useVerification(); 
  const [isVerificationFormVisible] = useState(false);

  const fetchEmployerData = useCallback(async () => {
    try {
      const loginKey =
        window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') ||
        window.sessionStorage.getItem('NXGJOBHUBLOGINKEYV1');

      if (!loginKey) {
        console.error('Authentication key not available.');
        return;
      }

      let authKey;
      try {
        authKey = JSON.parse(loginKey).authKey;
      } catch (error) {
        console.error('Error parsing authentication key:', error);
        return;
      }

      const response = await axios.get(`${API_HOST_URL}/api/employers/get-employer`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: authKey,
        },
      });

      const employerData = response.data; // Assuming the response is an object with employer data
      // console.log(employerData);

      // Update state with fetched data
      setAddress(employerData.address || "");
      setCompanyDescription(employerData.companyDescription || "");
      setCompanyName(employerData.companyName || "");

      // Set verification status based on the fetched data
      setVerificationStatus(employerData.isVerified || false);

    } catch (error) {
      console.error('Error fetching employer data:', error);
    }
  }, [setVerificationStatus]);
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setProfilePicture(user.profilePicture)
      fetchEmployerData();
    }
  }, [user, fetchEmployerData]);

  const handleVerificationSuccess = () => {
    setVerificationStatus(true);
  };

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const loginKey =
        window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') ||
        window.sessionStorage.getItem('NXGJOBHUBLOGINKEYV1');

      if (!loginKey) {
        console.error('Authentication key not available.');
        return;
      }

      let authKey;
      try {
        authKey = JSON.parse(loginKey).authKey;
      } catch (error) {
        console.error('Error parsing authentication key:', error);
        return;
      }

      const response = await axios.get(`${API_HOST_URL}/api/employers/get-employer`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: authKey,
        },
      });

      const employerId = response.data.employerID; // Assuming user object has employerId
      // console.log(employerId);

      const updateData = {
        address,
        companyDescription,
      };

      const updateResponse = await axios.put(`${API_HOST_URL}/api/employers/${employerId}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
          authorization: authKey,
        },
      });

      console.log('Update successful:', updateResponse.data);

    } catch (error) {
      console.error('Error updating data:', error.updateResponse ? error.updateResponse.data : error);
    }
  };
  
  return (
    <div className='dash-profile-main-container' style={{background:"#fff"}}>
        <div className="employer-dash-header">
            <h1>My Profile</h1>
        </div>
        <div className="employer-dash-section">
            <div className="employer-dash">
                <div className="connect-pics">
                    <div className="connect-img">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="user" />
                      ) : (
                        <CiUser className="user" />
                      )}
                    </div>
                    <div className="online">
                        {isVerified ? (
                            <div className="verified">
                                <MdOutlineVerifiedUser fontSize="1.2rem" color='#2596be'/>
                                <div className="verified avaliability">
                                    <img src={Online} alt="Online-Icon" />
                                </div>
                            </div>
                        ) : (
                            <div className="verified avaliability">
                                <img src={Online} alt="Online-Icon" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="job-opens">
                    <p className="post-id">Profile ID : <span>{user.firstName}{parseInt(currentYear) - parseInt(user.dateOfBirth)}</span></p>
                    <div className="employer-name">
                        <p>Recruiter, {companyName}</p>
                    </div>
                    {!isVerified && (
                        <Link to="/verifiedForm" className="acct-verify" >
                            <MdOutlineVerifiedUser fontSize="1.2rem" color='#2596be'/>
                            <span>Verify Account</span>
                        </Link>
                    )}
                </div>
                <form onSubmit={handleSave}>
                    <div className="my-profile-fullname">
                        <div className="my-profile-firstname">
                            <Inputs 
                                type="text"
                                title="First Name"
                                placeholder="Enter your first name"
                                value={firstName}
                                disabled
                            />
                        </div>
                        <div className="my-profile-lastname">
                            <Inputs 
                                type="text"
                                title="Last Name"
                                placeholder="Enter your last name"
                                value={lastName}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="my-profile-bio">
                        <label>About</label>
                        <textarea  cols="5" rows="5" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)}></textarea>
                    </div>
                    <div className="my-profile-email">
                        <Inputs 
                        type="email"
                        title="Email"
                        value={email}
                        disabled
                        />
                    </div>
                    <div className="my-profile-address">
                        <Inputs 
                        type="text"
                        title="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Save</button>
                </form>
            </div>
            <div className="employer-dash1">
                <section >
                    <div className="employ-dashBtns">
                        {/* <Link to="/dashboard/wallet">View Wallet</Link> */}
                        <Link to="/verifiedForm" className='verifiedForm-btn'>Verify Account</Link>
                    </div>
                    <div className="employ-dashBtns">
                        <Link to="/employerprofile">Edit Profile</Link>
                    </div>
                </section>
            </div>
        </div>
        {/* {!isVerified && <EmployerVerificationForm onVerificationSuccess={handleVerificationSuccess} hidden />} */}
        {isVerificationFormVisible && (
        <EmployerVerificationForm onVerificationSuccess={handleVerificationSuccess} hidden />
      )}
    </div>
  )
}

export default EmployerDashProfile
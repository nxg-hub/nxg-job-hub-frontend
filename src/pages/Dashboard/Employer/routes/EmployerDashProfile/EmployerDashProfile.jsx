import React, { useContext, useState, useEffect} from 'react';
import { UserContext } from '../../..';
import Inputs from '../../../../../components/accounts/Inputs';
import Verify from '../../../../../static/icons/verifyUser.svg';
import Online from '../../../../../static/icons/online-icon.svg';
import { CiUser } from 'react-icons/ci';
import './employerDashProfile.scss';
import { Link } from 'react-router-dom';

const EmployerDashProfile = () => {
    const user = useContext(UserContext)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const currentYear = new Date().getFullYear() ;

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setAddress(user.address)
    }
  }, [user])
  
  return (
    <div className='dash-profile-main-container' style={{background:"#fff"}}>
        <div className="employer-dash-header">
            <h1>My Profile</h1>
        </div>
        <div className="employer-dash-section">
            <div className="employer-dash">
                <div className="connect-pics">
                    <div className="connect-img">
                        <CiUser className='user' />
                    </div>
                    <div className="online">
                        <div className="verified">
                            <img src={Verify} alt="Verify-Icon" />
                        </div>
                        <div className="verified avaliability">
                            <img src={Online} alt="Online-Icon" />
                        </div>
                        
                    </div>
                </div>
                <div className="job-opens">
                    <p className="post-id">Profile ID : <span>{user.firstName}{parseInt(currentYear) - parseInt(user.dateOfBirth)}</span></p>
                    <div className="employer-name">
                        <p>Recruiter, {user.companyName}</p>
                    </div>
                </div>
                <form>
                    <div className="my-profile-fullname">
                        <div className="my-profile-firstname">
                            <Inputs 
                                type="text"
                                title="First Name"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="my-profile-lastname">
                            <Inputs 
                                type="text"
                                title="Last Name"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="my-profile-bio">
                        <label>About</label>
                        <textarea  cols="5" rows="5"></textarea>
                    </div>
                    <div className="my-profile-email">
                        <Inputs 
                        type="email"
                        title="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button>Save</button>
                </form>
            </div>
            <div className="employer-dash1">
                <section >
                    <div className="employ-dashBtns">
                        <Link to="wallet">View Wallet</Link>
                        <Link to="/verifiedForm" className='verifiedForm-btn'>Verify Account</Link>
                    </div>
                    <div className="employ-dashBtns">
                        <Link to="/employerprofile">Edit Profile</Link>
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}

export default EmployerDashProfile
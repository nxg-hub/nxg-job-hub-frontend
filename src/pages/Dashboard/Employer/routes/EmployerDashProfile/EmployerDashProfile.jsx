import React, { useContext, useState, useEffect} from 'react';
import { UserContext } from '../../..';
import Inputs from '../../../../../components/accounts/Inputs';
import User from '../../../../../static/images/Sarah.png';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { BsCircleFill } from 'react-icons/bs';
import './employerDashProfile.scss';
import { Link } from 'react-router-dom';

const EmployerDashProfile = () => {
    const user = useContext(UserContext)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState("");
  const currentYear = new Date().getFullYear() ;

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
    }
  }, [user])
  
  return (
    <div className='dash-profile-main-container'>
        <div className="employer-dash-header">
            <h1>My Profile</h1>
        </div>
        <div className="employer-dash-section">
            <div className="employer-dash">
                <section>
                    <h2>{user.firstName}</h2>
                    <p>Talent Recruiter</p>
                </section>
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
                </form>
            </div>
            <div className="employer-dash1">
                <section className='employer-connect-section'>
                    <div className="connect">
                        <div className="connect-btn">
                            <button>Connect</button>
                        </div>
                        <div className="connect-pics">
                            <div className="connect-img">
                                <img src={User} alt="User's Identity" />
                            </div>
                            <MdOutlineVerifiedUser className='verified-user' />
                            <div className="online">
                                <BsCircleFill fontSize="12px" color='#299019'/>
                                <p>Online</p>
                            </div>
                        </div>
                        <div className="connect-btn messagebtn">
                            <button>Message</button>
                        </div>
                    </div>
                    <div className="job-opens">
                        <p className="post-id">Profile ID : <span>{user.firstName}{parseInt(currentYear) - parseInt(user.dateOfBirth)}</span></p>
                        <div className="connect-jobs">
                            <div className="jobs-connect">
                                <span>15</span>
                                <p>Connects</p>
                            </div>
                            <div className="jobs-connect">
                                <span>30</span>
                                <p>Job Uploads</p>
                            </div>
                            <div className="jobs-connect">
                                <span>19</span>
                                <p>Jobs Open</p>
                            </div>
                        </div>
                    </div>
                    <div className="recruit">
                        <h2>{user.firstName} {user.lastName}, 34</h2>
                        <div className="employer-name">
                            <p>Recruiter, {user.companyName}</p>
                        </div>
                    </div>
                </section>
                <section style={{margin:"1rem auto", width:"90%"}}>
                    <div className="employ-dashBtns">
                        <Link to="/employerprofile">Edit Profile</Link>
                        <Link to="/verifiedForm" className='verifiedForm-btn'>Verify Account</Link>
                    </div>
                    <div className="employ-dashBtns">
                        <Link to="wallet">View Wallet</Link>
                    </div>
                </section>
            </div>
        </div>
        <div className="employ-dashBtn">
            <Link to="dashboard">Back To Dashboard</Link>
        </div>
    </div>
  )
}

export default EmployerDashProfile
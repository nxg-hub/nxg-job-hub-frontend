import React, { useState } from 'react';
import "./myProfile.scss";
import User from '../../../static/images/Sarah.png';
import { PiCameraLight } from 'react-icons/pi';
import Inputs from '../../../components/accounts/Inputs';

function DashProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState("");
  return (
    <div className="dash-profile-main-container">
        <div className="my-profile-heading">
          <h1>My Profile</h1>
        </div>
        <div className="my-profile-forms-container">
          <div className="my-profile-form1">
            <div className="my-profile-form-img-section">
              <div className="my-profile-form-pics">
                <div className="my-profile-form-pics-lg">
                  <img src={User} alt="User's Identity" />
                </div>
                <div className="my-profile-form-pics-sm">
                  <PiCameraLight className='camera'/>
                </div>
              </div>
              <div className="my-profile-form-one">
                <div className="my-profile-header">
                  <h3>Sarah</h3>
                  <div className="my-profile-ps">
                    <p className="post">Product Designer</p>
                    <p className="post-id">Profile ID : <span>Sarah 23</span></p>
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
                </form>
              </div>
            </div>
          </div>
          <div className="my-profile-form2">
            <form>
              <div className="my-profile-address">
                <Inputs 
                  type="text"
                  title="Education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
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
              <div className="my-profile-address">
                <Inputs 
                  type="text"
                  title="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
              <div className="my-profile-address">
                <Inputs 
                  type="text"
                  title="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
              <div className="my-profile-address">
                <Inputs 
                  type="text"
                  title="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
        </div>
    </div>
  )
}

export default DashProfile
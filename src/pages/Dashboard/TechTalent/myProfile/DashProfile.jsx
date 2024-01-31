import { useState, useContext, useEffect } from 'react';
import "./myProfile.scss";
import { CiUser } from 'react-icons/ci';
import { PiCameraLight } from 'react-icons/pi';
import Inputs from '../../../../components/accounts/Inputs';
import { GoPlus } from "react-icons/go";
import { UserContext } from '../..';

function DashProfile() {
  const user = useContext(UserContext)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [residentialAddress, setResidentialAddress] = useState(user.address);
  const [experience, setExperience] = useState(user.experience);
  const [skills, setSkills] = useState("");
  // console.log(user)
  const currentYear = new Date().getFullYear() 
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setResidentialAddress(user.residentialAddress)
      setExperience(user.experience)
    }
  }, [user])
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
                  <CiUser className='user' />
                </div>
                <div className="my-profile-form-pics-sm">
                  <PiCameraLight className='camera'/>
                </div>
              </div>
              <div className="my-profile-form-one">
                <div className="my-profile-header">
                  <h3>{user.firstName}</h3>
                  <div className="my-profile-ps">
                    <p className="post">Product Designer</p>
                    <p className="post-id">Profile ID : <span>{user.firstName}{parseInt(currentYear) - parseInt(user.dateOfBirth)}</span></p>
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
                      value={residentialAddress}
                      onChange={(e) => setResidentialAddress(e.target.value)}
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
                  title="Work Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div className="add-experience-btn">
                <GoPlus className='plus-icon' /> <span>Add Experience</span>
              </div>
              <div className="my-profile-address">
                <Inputs 
                  type="text"
                  title="Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
              <div className="add-experience-btn add-skill">
                <GoPlus className='plus-icon' /> <span>Add Skill</span>
              </div>
              <div className="my-profile-btn">
                <button >Update Profile</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default DashProfile
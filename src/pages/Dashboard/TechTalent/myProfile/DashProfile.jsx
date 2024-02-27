import { useState, useContext, useEffect } from 'react';
import "./myProfile.scss";
import { CiUser } from 'react-icons/ci';
import { PiCameraLight } from 'react-icons/pi';
import Inputs from '../../../../components/accounts/Inputs';
import { GoPlus, GoX } from "react-icons/go";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { UserContext } from '../..';
import { talentSkills } from '../../../../utils/data/tech-talent';
import { Dialog } from '@headlessui/react';

function DashProfile() {
  const user = useContext(UserContext)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState([{skill: ""}]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [title, setTitle] = useState("");
  const [firm, setFirm] = useState("");
  const [year, setYear] = useState("");
  // console.log(user)
  const currentYear = new Date().getFullYear() 
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = {
      bio: bio,
      residentialAddress: residentialAddress,
      skills: skills.map(skill => skill.skill),
      experienceLevel: experienceLevel,
    };
  
    // Now you can send `formData` to the backend
    console.log(formData);
  };

  const handleAddSkill = () => {
    setShowDropdown(true);
    setSkills([...skills, { skill: "" }]);
  };


  const handleSelectSkill = (selectedSkill) => {
    setSkills([...skills, { skill: selectedSkill }]);
    setShowDropdown(false);
  };

  const handleRemoveSkill = (selectedSkill) => {
    const updatedSkills = skills.filter(skill => skill.skill !== selectedSkill);
    setSkills(updatedSkills);
  }

  const handleInput = () => {
    setExperienceLevel({
      title: title,
      firm: firm,
      year: year,
    });
    setOpenInput(false);
  }

  const addExperience = () => {
    setOpenInput(!openInput);
  }

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
                <div className='my-profile-cam-section'>
                  <div className="my-profile-form-pics-sm">
                    <PiCameraLight className='camera'/>
                  </div>
                  <MdOutlineVerifiedUser fontSize="1.5rem" color='#2596be' style={{marginLeft:".3rem"}}/>
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
                        readOnly
                      />
                   </div>
                    <div className="my-profile-lastname">
                      <Inputs 
                        type="text"
                        title="Last Name"
                        placeholder="Enter your last name"
                        value={lastName}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="my-profile-bio">
                    <label>About</label>
                    <textarea  cols="5" rows="5" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                  </div>
                  <div className="my-profile-email">
                    <Inputs 
                      type="email"
                      title="Email"
                      value={email}
                      readOnly
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
            <form onSubmit={handleUpdate}>
              <div className="my-profile-address">
                <label>Skills</label>
                <div className="textarea">
                  {skills
                    .map((selectedSkill, index) => (
                      <div className="selected-skill" key={index}>
                        {selectedSkill.skill && 
                          <div className="skill">
                            <span>{selectedSkill.skill}</span>
                            {selectedSkill.skill && (
                              <GoX className="delete-icon" onClick={() => handleRemoveSkill(selectedSkill.skill)} />
                            )}
                          </div>
                        }
                      </div>
                    ))}
                </div>
              </div>
              <div className="add-experience-btn add-skill" onClick={handleAddSkill}>
                <GoPlus className='plus-icon' /> <span>Add Skill</span>
              </div>
              {showDropdown && (
                 <div className="skills-lists">
                   <div className="talent-dropdown">
                    {talentSkills.map((skill, index) => (
                      <p key={index} onClick={() => handleSelectSkill(skill)}>{skill}</p>
                    ))}
                  </div>
                 </div>
                )}
              <div className="my-profile-address">
                <div className="textarea job-experience">
                <label>Work Experience</label>
                  <div className="firm">
                    <h3>{title}</h3>
                    <p>{firm}</p>
                  </div>
                  <div className="period">
                    <p>{year}</p>
                  </div>
                </div>
              </div>
              <div className="add-experience-btn" onClick={addExperience}>
                <GoPlus className='plus-icon' /> <span>Add Experience</span>
              </div>
              {openInput && (
        <Dialog
          open={openInput}
          onClose={() => setOpenInput(false)}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            border: "none",
            borderRadius: "24px",
            padding:"2rem 1rem",
            zIndex: "100"
          }}
        >
          <Dialog.Panel>
            <Dialog.Title style={{ textAlign: "center" }}>
             Add Your Experience
            </Dialog.Title>
              <div className="exp-input">
                <input type="text" placeholder='Enter your job title' value={title} onChange={(e) =>setTitle(e.target.value)}/>
                <input type="text" placeholder='Enter company name' value={firm} onChange={(e) =>setFirm(e.target.value)}/>
                <input type="text" placeholder='Enter your working years' value={year} onChange={(e) =>setYear(e.target.value)}/>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  margin: "3rem auto",
                }}
              >
                <button
                  onClick={handleInput}
                  style={{
                    width: "100%",
                    maxWidth: "580px",
                    padding: "8px",
                    background: "#006A90",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "25px",
                    fontWeight: "500",
                  }}
                >
                  Add Input
                </button>
              </div>
            
          </Dialog.Panel>
        </Dialog>
      )}
              <div className="my-profile-btn">
                <button type='submit'>Update Profile</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default DashProfile
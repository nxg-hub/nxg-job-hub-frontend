import { useState, useContext, useEffect, useCallback } from "react";
import "./myProfile.scss";
import { CiUser } from "react-icons/ci";
import { PiCameraLight } from "react-icons/pi";
import Inputs from "../../../../components/accounts/Inputs";
import { GoPlus, GoX } from "react-icons/go";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { UserContext } from "../..";
import { talentSkills } from "../../../../utils/data/tech-talent";
import { Dialog } from "@headlessui/react";
import { useVerification } from "../../Employer/routes/EmployerDashProfile/VerificationContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import { useApiRequest } from "../../../../utils/functions/fetchEndPoint";
import { useSelector } from "react-redux";
import Notice from "../../../../components/Notice";

function DashProfile() {
  const user = useContext(UserContext);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState("");
  const [bio, setBio] = useState("");
  const [jobInterest, setJobInterest] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [experienceLevel, setExperienceLevel] = useState({
    title: "",
    firm: "",
    year: "",
  });
  const [skills, setSkills] = useState([{ skill: "" }]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [title, setTitle] = useState("");
  const [firm, setFirm] = useState("");
  const [year, setYear] = useState("");
  const { isVerified, setVerificationStatus } = useVerification();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [popup, showpopUp] = useState(undefined);
  const navigateCompleteProfilePage = () => {
    navigate("/techprofileform");
  };
  const fetchTalentData = useCallback(async () => {
    try {
      const loginKey =
        window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

      if (!loginKey) {
        console.error("Authentication key not available.");
        navigate("/login");
        return;
      }

      let authKey;
      try {
        authKey = JSON.parse(loginKey).authKey;
      } catch (error) {
        console.error("Error parsing authentication key:", error);
        return;
      }

      const response = await axios.get(
        `${API_HOST_URL}/api/v1/tech-talent/get-user`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: authKey,
          },
        }
      );

      const talentData = response.data; // Assuming the response is an object with employer data
      setProfilePicture(talentData.profilePicture);

      // Update state with fetched data
      setResidentialAddress(talentData.residentialAddress || "");
      setBio(talentData.bio || "");
      setJobInterest(talentData.jobInterest || "");
      setExperienceLevel(talentData.experienceLevel || "");
      // setSkills(talentData.skills || []);

      // Set verification status based on the fetched data
      const updatedVerificationStatus = talentData.verified || false;
      setVerificationStatus(updatedVerificationStatus);

      // Save verification status to local storage
      localStorage.setItem(
        "verificationStatus",
        JSON.stringify(updatedVerificationStatus)
      );
    } catch (error) {
      console.error("Error fetching talent data:", error);
    }
  }, [setVerificationStatus]);
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setProfilePicture(user.profilePicture || "");
      fetchTalentData();
    }
  }, [user, fetchTalentData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const loginKey =
        window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

      if (!loginKey) {
        console.error("Authentication key not available.");
        return;
      }

      let authKey;
      try {
        authKey = JSON.parse(loginKey).authKey;
      } catch (error) {
        console.error("Error parsing authentication key:", error);
        return;
      }

      const response = await axios.get(
        `${API_HOST_URL}/api/v1/tech-talent/get-user`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: authKey,
          },
        }
      );

      const techId = response.data.techId; // Assuming user object has employerId
      // console.log(techId);

      const formData = {
        bio: bio,
        residentialAddress: residentialAddress,
        skills: skills.map((skill) => skill.skill),
        experienceLevel: `${experienceLevel.title} at ${experienceLevel.firm} (${experienceLevel.year})`, // Format as string,
      };

      const res = await axios.put(
        `${API_HOST_URL}/api/v1/tech-talent/${techId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: authKey,
          },
        }
      );
      if (res.status === 200) {
        showpopUp({
          type: "success",
          message: "Update successful",
        });
        setTimeout(() => {
          showpopUp(undefined);
        }, 5000);
      }
      //  ? setUploadSuccess(true) : null;
      console.log("Update successful:");
      // Once the update is successful, set the verification status to true
      setVerificationStatus(true);
      // Save verification status to local storage
      localStorage.setItem("verificationStatus", JSON.stringify(true));
    } catch (error) {
      console.error(
        "Error updating data:",
        error.updateResponse ? error.updateResponse.data : error
      );

      showpopUp({
        type: "danger",
        message: "Error updating data",
      });
      setTimeout(() => showpopUp(undefined), 5000);
    }
  };

  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  };

  const handleAddSkill = () => {
    setShowDropdown(true);
    // Filter out any empty string skills before adding a new empty skill
    const filteredSkills = skills.filter((skill) => {
      // return skill && skill.trim() !== "";
      return skill.skill.trim() !== "";
    });

    setSkills([...filteredSkills, { skill: "" }]);
    // setSkills([...skills, { skill: "" }]);
  };
  const handleSelectSkill = (selectedSkill) => {
    // Check if the selected skill is not empty
    if (selectedSkill.trim() !== "") {
      // Filter out any empty string skills before adding the selected skill
      const updatedSkills = skills.filter((skill) => {
        return skill && skill.skill.trim() !== "";
      });

      setSkills([...updatedSkills, { skill: selectedSkill }]);
    }
    setShowDropdown(false);
  };

  const handleRemoveSkill = (selectedSkill) => {
    const updatedSkills = skills.filter(
      (skill) => skill.skill !== selectedSkill
    );
    setSkills(updatedSkills);
  };

  const handleInput = () => {
    setExperienceLevel({
      title: title,
      firm: firm,
      year: year,
    });
    setOpenInput(false);
  };

  const addExperience = () => {
    setOpenInput(!openInput);
  };
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
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="user" />
                ) : (
                  <CiUser className="user" />
                )}
              </div>
              <div className="my-profile-cam-section">
                <div className="my-profile-form-pics-sm">
                  <PiCameraLight className="camera" />
                </div>
                {isVerified ? (
                  <MdOutlineVerifiedUser
                    fontSize="1.5rem"
                    color="#2596be"
                    style={{ marginLeft: ".3rem" }}
                  />
                ) : null}
              </div>
            </div>

            <div className="my-profile-header">
              <h3>{user.firstName}</h3>
              <div className="my-profile-ps">
                <p className="post">
                  {jobInterest
                    ? capitalizeWords(jobInterest)
                    : "User's Job Role"}
                </p>
                <p className="post-id">
                  Profile ID :{" "}
                  <span>
                    {user.firstName}
                    {parseInt(currentYear) - parseInt(user.dateOfBirth)}
                  </span>
                </p>
              </div>
              {!isVerified && (
                <Link to="/techprofileform" className="acct-verify">
                  <MdOutlineVerifiedUser fontSize="1.2rem" color="#2596be" />
                  <span>Verify Account</span>
                </Link>
              )}
            </div>
            <div className="my-profile-form-one">
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
                  <textarea
                    cols="5"
                    rows="5"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}></textarea>
                </div>
                <div className="my-profile-email">
                  <Inputs type="email" title="Email" value={email} readOnly />
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
                {skills.map((selectedSkill, index) => (
                  <div className="selected-skill" key={index}>
                    {selectedSkill.skill && (
                      <div className="skill">
                        <span>{selectedSkill.skill}</span>
                        {selectedSkill.skill && (
                          <GoX
                            className="delete-icon"
                            onClick={() =>
                              handleRemoveSkill(selectedSkill.skill)
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="add-experience-btn add-skill"
              onClick={handleAddSkill}>
              <GoPlus className="plus-icon" /> <span>Add Skill</span>
            </div>
            {showDropdown && (
              <div className="skills-lists">
                <div className="talent-dropdown">
                  {talentSkills.map((skill, index) => (
                    <p key={index} onClick={() => handleSelectSkill(skill)}>
                      {skill}
                    </p>
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
              <GoPlus className="plus-icon" /> <span>Add Experience</span>
            </div>
            <div
              onClick={() => {
                navigate("/techprofileform");
              }}
              className="mt-6 bg-transparent px-4 py-3 border border-gray-800 rounded-md w-[50%] cursor-pointer ">
              Edit profile
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
                  padding: "2rem 1rem",
                  zIndex: "100",
                }}>
                <Dialog.Backdrop
                  onClick={() => {
                    setOpenInput(false);
                  }}
                  className="fixed inset-0 bg-black/30"
                />
                <div className="w-full">
                  <Dialog.Panel>
                    <Dialog.Title style={{ textAlign: "center" }}>
                      Add Your Experience
                    </Dialog.Title>
                    <div
                      className="exp-input"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "2rem",
                      }}>
                      <input
                        type="text"
                        placeholder="Enter your job title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: "100%", padding: "0.3rem 0.8rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Enter company name"
                        value={firm}
                        onChange={(e) => setFirm(e.target.value)}
                        style={{ width: "100%", padding: "0.3rem 0.8rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Enter your working years"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{ width: "100%", padding: "0.3rem 0.8rem" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "block",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        margin: "3rem auto",
                      }}>
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
                        }}>
                        Add Input
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </Dialog>
            )}
            <div className="my-profile-btn">
              <button type="submit">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
      {popup && <Notice type={popup.type} message={popup.message} />}
    </div>
  );
}

export default DashProfile;

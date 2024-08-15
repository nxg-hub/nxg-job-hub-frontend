import React, { useState } from "react";
import Spinner from "../../../../assets/svg/spinner.svg?.react";
import Inputs from "../../../../components/accounts/Inputs";
import "./settings.scss";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function Passwordsettings() {
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState("");
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const isValidPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          newPassword
        );

      if (!isValidPassword) {
        setPasswordError(
          "Password should be a minimum of 8 characters and should include at least 1 special character, numbers, and letters!"
        );
        setTimeout(() => {
          setPasswordError("");
        }, 2000);
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError("New password and confirm password do not match!");
        setTimeout(() => {
          setPasswordError("");
        }, 2000);
        return;
      }

      const response = await axios.post(
        `${API_HOST_URL}/api/v1/auth/update-password/in-app`,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        setSuccessMessage("Password change is successful");
        setConfirmPassword("");
        setCurrentPassword("");
        setNewPassword("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setPasswordError("");
      } else {
        setPasswordError("Failed to update password. Please try again.");
        setTimeout(() => {
          setPasswordError("");
        }, 2000);
      }
    } catch (err) {
      if (err.response.status === 400) {
        setPasswordError(
          "Incorrect Password, please input your current password correctly"
        );
        setTimeout(() => {
          setPasswordError("");
        }, 2000);
      } else {
        console.log(err);
        setPasswordError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Manrope" }}>
      <div className="pass-header">
        <h2>Password Settings</h2>
      </div>
      <div className="password-section">
        <div className="password-change">
          <h3>Change Password</h3>
          <form className="pass-update" onSubmit={handlePasswordChange}>
            <div className="current-pass relative">
              <Inputs
                type={showPassword ? "text" : "password"}
                title="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                autoComplete="off"
                // errormessage="Password must be correct!"
                required
              />
              <div>
                {showPassword ? (
                  <BsEye
                    onClick={handleShowPassword}
                    className="absolute top-[55px] right-[10px] cursor-pointer"
                  />
                ) : (
                  <BsEyeSlash
                    onClick={handleShowPassword}
                    className="absolute top-[55px] right-[10px] cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="current-pass relative">
              <Inputs
                type={showPassword ? "text" : "password"}
                title="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                autoComplete="current-password"
                required
              />
              <div>
                {showPassword ? (
                  <BsEye
                    onClick={handleShowPassword}
                    className="absolute top-[55px] right-[10px] cursor-pointer"
                  />
                ) : (
                  <BsEyeSlash
                    onClick={handleShowPassword}
                    className="absolute top-[55px] right-[10px] cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="current-pass relative">
              <Inputs
                type={showPassword ? "text" : "password"}
                title="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-Enter your new password"
                autoComplete="current-password"
                required
              />
              <div>
                {showPassword ? (
                  <BsEye
                    onClick={handleShowPassword}
                    className="absolute top-[55px] right-[10px] cursor-pointer"
                  />
                ) : (
                  <BsEyeSlash
                    onClick={handleShowPassword}
                    className="absolute top-[55px] right-[10px] cursor-pointer"
                  />
                )}
              </div>
              {passwordError !== "" && (
                <div className="text-sm text-start text-[#ee2a2a]">
                  <p>{passwordError}</p>
                </div>
              )}{" "}
              {successMessage !== "" && (
                <div className="change-successful">
                  <p>Password change was successful</p>
                </div>
              )}
            </div>
            <div className="pass-btn w-full">
              <button className="flex items-center justify-center">
                {" "}
                {loading ? (
                  <img src={Spinner} className="w-[30px]" alt="loading" />
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Passwordsettings;

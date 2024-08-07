import React, { useState } from "react";
import Inputs from "../../../../components/accounts/Inputs";
import "./settings.scss";
import axios from "axios";
import { API_HOST_URL } from "../../../../utils/api/API_HOST";
import { Eye } from "../../../../utils/functions/PasswordEye";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function Passwordsettings() {
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      // Your password validation logic
      const isValidPassword =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          newPassword
        );

      if (!isValidPassword) {
        setPasswordError(
          "Password should be a minimum of 8 characters and should include at least 1 special character, numbers, and letters!"
        );
        return;
      }
      // Check if the current password matches the entered current password
      // if (currentPassword !== password) {
      //   setPasswordError("Current password is incorrect!");
      //   return;
      // }
      // Check if the new password matches the confirm password
      if (newPassword !== confirmPassword) {
        setPasswordError("New password and confirm password do not match!");
        return;
      }

      const { res } = await axios.post(
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
    } catch (err) {
      console.log(err);
    }

    // Display success message
    setIsOpen(true);
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
                errormessage="Password must be correct!"
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
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                errormessage="Password should be a minimum of 8 characters and should inculde at least 1 special charater, numbers and letters!"
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
                errormessage="Password did not match!"
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
            <div className="pass-btn">
              <button>Change Password</button>
            </div>
          </form>
          {isOpen && (
            <div className="change-successful">
              <p>Password change was successful</p>
            </div>
          )}
          {passwordError && (
            <div className="change-failed">
              <p>{passwordError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Passwordsettings;

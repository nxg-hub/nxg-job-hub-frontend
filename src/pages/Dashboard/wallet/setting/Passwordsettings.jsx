import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Inputs from '../../../../components/accounts/Inputs';
import './settings.scss';

function Passwordsettings() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Your password validation logic
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newPassword);

    if (!isValidPassword) {
      setPasswordError('Password should be a minimum of 8 characters and should include at least 1 special character, numbers, and letters!');
      return;
    }
    // Check if the current password matches the entered current password
    if (currentPassword !== password) {
      setPasswordError('Current password is incorrect!');
      return;
    }
    // Check if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match!');
      return;
    }
    // Display success message
    setIsOpen(true);

  }

  return (
    <div style={{fontFamily:"Manrope"}}>
      <div className="pass-header">
        <h2>Password Settings</h2>
      </div>
        <div className="password-section">
          <div className="dash-password">
            <label>Password</label>
            <div className="password-input">
              <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                  autoComplete='current-password'
                  errormessage='Password should be a minimum of 8 characters and should inculde at least 1 special charater, numbers and letters!'
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"//Minimum eight characters, at least one letter, one number and one special character
                  required
              />
              <button
                  onClick={handleShowPassword}
                  className='pass-toggle'
              >
                {showPassword ? (
                    <BsEye onClick={handleShowPassword}/>
                    ) : (
                    <BsEyeSlash onClick={handleShowPassword}/>
                    )
                }
              </button>
              </div>
          </div>
          <div className="password-change">
            <h3>Change Password</h3>
            <form className="pass-update" onSubmit={handlePasswordChange}>
              <div className="current-pass">
                <Inputs 
                  type='password'
                  title='Current Password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  autocomplete="off"
                  errormessage='Password must be correct!'
                  required
                />
              </div>
              <div className="current-pass">
                <Inputs 
                  type='password'
                  title='New Password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  autoComplete="current-password"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                  errormessage='Password should be a minimum of 8 characters and should inculde at least 1 special charater, numbers and letters!'
                  required
                />
              </div>
              <div className="current-pass">
                <Inputs 
                  type='password'
                  title='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-Enter your new password"
                  autoComplete="current-password"
                  errormessage='Password did not match!'
                  required
                />
              </div>
              <div className="pass-btn">
                <button >Change Password</button>
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
  )
}

export default Passwordsettings
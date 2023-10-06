import React from 'react';
import Inputs from '../../../components/accounts/Inputs';
import '../../../components/accounts/inputs.scss';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ProfileForm ({formData, onUpdateFormData}) {
    const {
        fullName,
        email,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        selectedOption,
        phone,
    } = formData;
    
    // const [country, setCountry] = useState('');
    const handleShowPassword = () => {
        onUpdateFormData({...formData, showPassword : !showPassword});
    }

    const handleShowConfirmPassword = () => {
        onUpdateFormData({...formData, showConfirmPassword: !showConfirmPassword});
    }

    const onValueChange = (e) => {
        onUpdateFormData({...formData, selectedOption: e.target.value});
    }

  return (
    <div>
        <div className="left">
            <Inputs 
                type='text'
                title='Full Name'
                value={fullName}
                onChange={(e) => onUpdateFormData({...formData, fullName: e.target.value})}
                placeholder="Enter your full name"
                autocomplete="off"
                pattern="^[A-Za-z0-9\s]{8,20}$"
                errormessage='Full name should be a minimum of 8 characters!'
                required
            />
            <Inputs 
                type='email'
                title='E-mail Address'
                value={email}
                onChange={(e) => onUpdateFormData({...formData, email: e.target.value})}
                placeholder="Enter your email address"
                autocomplete="off"
                errormessage='Email must inculde special charaters like @ and .!'
                required
            />
            <div className='password'>
                <label>Password</label>
                <div className="password-input">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => onUpdateFormData({...formData, password: e.target.value})}
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
            <div className='password'>
                <label>Retype Password</label>
                <div className="password-input">
                    <input 
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => onUpdateFormData({...formData, confirmPassword: e.target.value})}
                        placeholder="*******"
                        autoComplete='current-password'
                        errormessage='Passwords did not match!'
                        pattern={formData.password} //Set the pattern to match the password
                        required
                    />
                    <button
                        onClick={handleShowConfirmPassword}
                        className='pass-toggle'
                    >
                        {showConfirmPassword ? (
                            <BsEye onClick={handleShowConfirmPassword}/>
                            ) : (
                            <BsEyeSlash onClick={handleShowConfirmPassword}/>
                            )
                        }
                    </button>
                </div>
            </div>
            
            <div className="phone ">
                <label>Phone</label>
                <PhoneInput
                    inputStyle={{backgroundColor: '#ffffff', border: '0.06rem solid #c9c9c9', margin: '0.55rem 0', 
                    padding:'0.6rem 0.7rem', width:'25.1rem', fontSize:'.7rem', fontWeight:"400", fontFamily:"Montserrat",
                    borderTopRightRadius:'0.4rem', borderBottomRightRadius:'0.4rem', color:"#c9c9c9"}}
                    title="phone"
                    aria-label="tel"
                    defaultCountry="ng"
                    value={phone}
                    onChange={(value) =>onUpdateFormData({...formData, phone: value})}
                    required 
                />
            </div>
            <div className="gender">
                <label>Gender</label>
                <div className='input-radio'>
                    <label>
                        <input
                            type="radio"
                            title="Male"
                            value="Male"
                            checked={selectedOption === 'Male'}
                            onChange={onValueChange}
                            style={{marginRight:'0.55rem'}}
                        />
                        Male
                    </label>
                    <label style={{marginLeft:"0.55rem"}}>
                        <input
                            type="radio"
                            title="Female"
                            value="Female"
                            checked={selectedOption === 'Female'}
                            onChange={onValueChange}
                            style={{marginRight:'0.55rem'}}
                        />
                        Female
                    </label>
                </div>
            </div>
            <div className="dob">
                <label>Date of Birth</label>
                <DatePicker 
                    className='date'
                    title='date'
                    aria-label='date'
                    selected={formData.birthDate}
                    onChange={(date) => onUpdateFormData({...formData, birthDate: date})}
                />
            </div>
            
          
            {/* <Inputs 
                type='text'
                title='Nationality'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your nationality"
            /> */}
            
        </div>
    </div>
  )
}

export default ProfileForm
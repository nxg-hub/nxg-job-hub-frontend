
import React from 'react';
import Inputs from '../../../components/accounts/Inputs';
import '../../../components/accounts/inputs.scss';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ProfileForm ({formData, onUpdateFormData}) {
    // const [country, setCountry] = useState('');
    const handleShowPassword = () => {
        onUpdateFormData({ ...formData, showPassword: !formData.showPassword});
    }

    const handleShowConfirmPassword = () => {
        onUpdateFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword});
    }

    const onValueChange = (e) => {
        onUpdateFormData({ ...formData, selectedOption: e.target.value});
    }

  return (
    <main>
        <div className="left">
            <Inputs 
                type='text'
                title='Full Name'
                value={formData.fullName}
                onChange={(e) => onUpdateFormData({...formData, fullName: e.target.value})}
                placeholder="Enter your full name"
                errorMessage='Username should be a least of 8-16 characters and should not inculde special charaters!'
                pattern="^[A-Za-z0-9]{8,16}$"
                required
            />
            <Inputs 
                type='email'
                title='Email'
                value={formData.email}
                onChange={(e) => onUpdateFormData({...formData, email: e.target.value})}
                placeholder="example@gmail.com"
                errorMessage='Email must inculde special charaters like @ and .!'
                required
            />
            <div className="phone ">
                <label>Phone</label>
                <PhoneInput
                    inputStyle={{backgroundColor: '#fbfbfb', border: 'none', margin: '0.75rem 0', 
                    padding:'0.8rem 0.5rem', width:'18.2rem', fontSize:'.9rem', opacity:'.5', 
                    borderTopRightRadius:'0.37rem', borderBottomRightRadius:'0.37rem'}}
                    defaultCountry="ng"
                    value={formData.phone}
                    onChange={(value) => onUpdateFormData({...formData, phone: value})}
                    required 
                />
            </div>
            <div className="password-input">
                <Inputs 
                    type={formData.showPassword ? 'text' : 'password'}
                    title='Password'
                    value={formData.password}
                    onChange={(e) => onUpdateFormData({...formData, password: e.target.value})}
                    placeholder="*******"
                    autoComplete='new-password'
                    errorMessage='Password should be a minimum of 8 characters and should inculde at least 1 special charater, numbers and letters!'
                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"//Minimum eight characters, at least one letter, one number and one special character
                    required
                />
                <span 
                onClick={handleShowPassword}
                className='pass-toggle'
                >
                {formData.showPassword ? (
                    <BsEye onClick={handleShowPassword}/>
                    ) : (
                    <BsEyeSlash onClick={handleShowPassword}/>
                    )
                }
                </span>
            </div>
            <div className="password-input">
                <Inputs 
                    type={formData.showConfirmPassword ? 'text' : 'password'}
                    title='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={(e) => onUpdateFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="*******"
                    autoComplete='new-password'
                    errorMessage='Passwords did not match!'
                    pattern={formData.password} //Set the pattern to match the password
                    required
                />
                <span 
                onClick={handleShowConfirmPassword}
                className='pass-toggle'
                >
                {formData.showConfirmPassword ? (
                    <BsEye onClick={handleShowConfirmPassword}/>
                    ) : (
                    <BsEyeSlash onClick={handleShowConfirmPassword}/>
                    )
                }
                </span>
            </div>
            <div className="dob">
                <label>Date of Birth</label>
                <DatePicker 
                    className='date'
                    selected={formData.birthDate}
                    onChange={(date) => onUpdateFormData({...formData, birthDate: date})}
                />
            </div>
            <div className="gender">
                <label>Gender</label>
                <label className='input-radio'>
                    <input
                        type="radio"
                        title="Male"
                        value="Male"
                        checked={formData.selectedOption === 'Male'}
                        onChange={onValueChange}
                        style={{marginRight:'.5rem'}}
                    />
                    Male
                </label>
                
                <label className='input-radio'>
                    <input
                        type="radio"
                        title="Female"
                        value="Female"
                        checked={formData.selectedOption === 'Female'}
                        onChange={onValueChange}
                        style={{marginRight:'.5rem'}}
                    />
                    Female
                </label>
            </div>
            {/* <Inputs 
                type='text'
                title='Nationality'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your nationality"
            /> */}
            
        </div>
    </main>
  )
}

export default ProfileForm
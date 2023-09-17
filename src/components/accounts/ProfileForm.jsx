
import React, {useState} from 'react';
import Inputs from './Inputs';
import './inputs.scss';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ProfileForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [birthDate, setBirthDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState('');
    const [country, setCountry] = useState('');
    

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const onValueChange = (e) => {
        setSelectedOption(e.target.value);
      }

  return (
    <main>
        <div className="left">
            <Inputs 
                type='text'
                title='Full Name'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
            />
            <Inputs 
                type='email'
                title='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
            />
            <div className="phone ">
                <label>Phone</label>
                <PhoneInput
                    inputStyle={{backgroundColor: '#fbfbfb', border: 'none', margin: '0.75rem 0', 
                    padding:'0.8rem 0.5rem', minWidth:'16.2rem', fontSize:'.9rem', opacity:'.5', 
                    borderTopRightRadius:'0.37rem', borderBottomRightRadius:'0.37rem'}}
                    defaultCountry="ng"
                    value={phone}
                    onChange={setPhone}
                    required 
                />
            </div>
            <div className="password-input">
                <Inputs 
                    type={showPassword ? 'text' : 'password'}
                    title='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*******"
                />
                <span 
                onClick={() => setShowPassword(!showPassword)}
                className='pass-toggle'
                >
                {showPassword ? (
                    <BsEye onClick={handleShowPassword}/>
                    ) : (
                    <BsEyeSlash onClick={handleShowPassword}/>
                    )
                }
                </span>
            </div>
            <div className="password-input">
                <Inputs 
                    type={showConfirmPassword ? 'text' : 'password'}
                    title='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="*******"
                />
                <span 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='pass-toggle'
                >
                {showConfirmPassword ? (
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
                    selected={birthDate}
                    onChange={(date) => setBirthDate(date)}
                />
            </div>
            <div className="gender">
                <label>Gender</label>
                <label className='input-radio'>
                    <input
                        type="radio"
                        title="Male"
                        value="Male"
                        checked={selectedOption === 'Male'}
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
                        checked={selectedOption === 'Female'}
                        onChange={onValueChange}
                        style={{marginRight:'.5rem'}}
                    />
                    Female
                </label>
            </div>
            <Inputs 
                type='text'
                title='Nationality'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your nationality"
            />
            
        </div>
    </main>
  )
}

export default ProfileForm
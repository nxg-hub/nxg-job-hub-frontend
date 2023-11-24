import React, { useState, useMemo } from 'react';
import Inputs from '../../../../../components/accounts/Inputs';
import { PhoneInput } from 'react-international-phone';
import Select from 'react-select';
import countryList from 'react-select-country-list';

function MultiStepForm1() {
    const [countryCode, setCountryCode] = useState("")
    const options = useMemo(() => {
        const countryOptions = countryList().getData();
        // Modify options to include both label and value (country code)
        const modifiedOptions = countryOptions.map((country) => ({
          label: `${country.label}`,
          value:` ${country.value}`,
        }));
        return modifiedOptions;
    }, []);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "",
        zipCode: "",
        address: "",
        qualification: "",
        certification:"",
        level:"",
        levelExperience:"",
        jobType:""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value
        });
    };
    const handleCode = (selectedOption) => {
        setCountryCode(selectedOption.value);
    };
  return (
    <div>
        <form className="tech-pro-form">
            <div className='rep-fullname'>
                <Inputs
                type='text'
                name="firstName"
                title='First Name*'
                value={data.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                errormessage='First name must be filled!'
                required
                />
                <Inputs
                type='text'
                name="lastName"
                title='Last Name*'
                value={data.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                errormessage='Last name must be filled!'
                required
                />
            </div>
            <div className="email">
                <Inputs
                type='email'
                name="email"
                title='E-mail Address'
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                errormessage='Email must include special characters like @ and .!'
                required
                />
            </div>
            <div className="tech-pro-phone">
                <label>Phone Number</label>
                <PhoneInput
                    inputStyle={{ backgroundColor: '#ffffff', border: '1px solid #c9c9c9', margin: '0.55rem  0 0 0', padding: '20px 24px', width: '100%', maxWidth:'900px', height: '48px', fontSize: '16px', fontWeight: "400", fontFamily: "Manrope", borderTopRightRadius: '10px', borderBottomRightRadius: '10px', color: "#c9c9c9" }}
                    name="phone"
                    aria-label="tel"
                    defaultCountry="ng"
                    value={data.phone}
                    onChange={(value) => {
                        const e = { target: { name: "phone", value } };
                        handleChange(e);
                    }}
                    required
                />
            </div>
            <div className="tech-pro-countrycode">
                <label>Country Code*</label>
                <Select options={options} placeholder="Select" value={countryCode ? { label: countryCode, value: countryCode } : null} onChange={handleCode}/>
            </div>
            <div className="tech-pro-location">
                <Inputs
                type='text'
                name="Current Location*"
                title='Current Location'
                value={data.zipCode}
                onChange={handleChange}
                placeholder="Enter your zip code"
                />
            </div>
            <div className="tech-pro-address">
                <Inputs
                type='text'
                name="address"
                title='Residential Address'
                value={data.address}
                onChange={handleChange}
                placeholder="Enter your home address"
                />
            </div>
        </form>
    </div>
  )
}

export default MultiStepForm1
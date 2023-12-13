import React, { useMemo, useEffect } from 'react';
import Inputs from '../../../../../components/accounts/Inputs';
import { PhoneInput } from 'react-international-phone';
import Select from 'react-select';
import countryList from 'react-select-country-list';


function MultiStepForm1({formData, setFormData, onComplete}) {
    const countryOptions = useMemo(() => {
        return countryList().getData().map((country) => ({
          label: country.label,
          value: country.value,
        }));
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };
    const handleCode = (selectedOption) => {
        setFormData({
            ...formData,
            countryCode: selectedOption.value,
        })
    };

    useEffect(() => {
        const submitForm = () => {
          // Make sure the form data is valid before calling onComplete
          if (formData.firstName && formData.lastName && formData.email && formData.countryCode) {
            onComplete(formData);
          }
        };
    
        submitForm(); // Call the submitForm function directly within useEffect
    
        // You can include other dependencies if needed
      }, [formData, onComplete]);
    


  return (
    <div>
        <form className="tech-pro-form" >
            <div className='rep-fullname'>
                <Inputs
                type='text'
                name="firstName"
                title='First Name*'
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                errormessage='First name must be filled!'
                required
                />
                <Inputs
                type='text'
                name="lastName"
                title='Last Name*'
                value={formData.lastName}
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
                value={formData.email}
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
                    value={formData.phone}
                    onChange={(value) => {
                        const e = { target: { name: "phone", value } };
                        handleChange(e);
                    }}
                    required
                />
            </div>
            <div className="tech-pro-countrycode">
                <label>Country Code*</label>
                <Select options={countryOptions} placeholder="Select" value={formData.countryCode ? { label: formData.countryCode, value: formData.countryCode } : null} onChange={handleCode}/>
            </div>
            <div className="tech-pro-location">
                <Inputs
                    type='text'
                    name="zipCode"
                    title='Current Location*'
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your zip code"
                />
            </div>
            <div className="tech-pro-address">
                <Inputs
                type='text'
                name="residentialAddress"
                title='Residential Address'
                value={formData.residentialAddress}
                onChange={handleChange}
                placeholder="Enter your home address"
                />
            </div>
        </form>
    </div>
  )
}

export default MultiStepForm1
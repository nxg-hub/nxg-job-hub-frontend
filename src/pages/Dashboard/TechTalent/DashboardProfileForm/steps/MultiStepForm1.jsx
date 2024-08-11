// import React, { useMemo, useEffect, useState } from "react";
// import Inputs from "../../../../../components/accounts/Inputs";
// import { PhoneInput } from "react-international-phone";
// import Select from "react-select";
// import countryList from "react-select-country-list";
// import axios from "axios";
// import { API_HOST_URL } from "../../../../../utils/api/API_HOST";
//
// function MultiStepForm1({ formData, setFormData, onComplete }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const countryOptions = useMemo(() => {
//     return countryList()
//       .getData()
//       .map((country) => ({
//         label: country.label,
//         value: country.value,
//       }));
//   }, []);
//   console.log(countryList());
//   const [formDataCompleted, setFormDataCompleted] = useState(false);
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleCode = (selectedOption) => {
//     setFormData({
//       ...formData,
//       countryCode: selectedOption.value,
//     });
//   };
//
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const loginKey =
//           window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
//           window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
//         if (!loginKey) {
//           console.error("Authentication key not available.");
//           return;
//         }
//         const { authKey } = JSON.parse(loginKey);
//         if (!authKey) {
//           console.error("Auth key not available.");
//           return;
//         }
//
//         const response = await axios.get(
//           `${API_HOST_URL}/api/v1/auth/get-user`,
//           {
//             headers: {
//               authorization: authKey,
//             },
//           }
//         );
//         const userData = response.data;
//         setFirstName(userData.firstName);
//         setLastName(userData.lastName);
//         setEmail(userData.email);
//         setPhoneNumber(userData.phoneNumber);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData(); // Invoke the fetchUserData function
//   }, []);
//
//   useEffect(() => {
//     const submitForm = () => {
//       // Make sure the form data is valid before calling onComplete
//       if (
//         formData.countryCode &&
//         formData.zipCode &&
//         formData.residentialAddress &&
//         !formDataCompleted
//       ) {
//         setFormDataCompleted(true);
//         onComplete(formData);
//       }
//     };
//
//     submitForm(); // Call the submitForm function directly within useEffect
//
//     // You can include other dependencies if needed
//   }, [formData, onComplete, formDataCompleted]);
//
//   return (
//     <div>
//       <form className="tech-pro-form">
//         <div className="rep-fullname">
//           <Inputs
//             type="text"
//             name="firstName"
//             title="First Name*"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="Enter your first name"
//           />
//           <Inputs
//             type="text"
//             name="lastName"
//             title="Last Name*"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Enter your last name"
//           />
//         </div>
//         <div className="email">
//           <Inputs
//             type="email"
//             name="email"
//             title="E-mail Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email address"
//           />
//         </div>
//         <div className="tech-pro-phone">
//           <label>Phone Number</label>
//           <PhoneInput
//             inputStyle={{
//               backgroundColor: "#ffffff",
//               border: "1px solid #c9c9c9",
//               margin: "0.55rem  0 0 0",
//               padding: "20px 24px",
//               width: "100%",
//               maxWidth: "900px",
//               height: "48px",
//               fontSize: "16px",
//               fontWeight: "400",
//               fontFamily: "Manrope",
//               borderTopRightRadius: "10px",
//               borderBottomRightRadius: "10px",
//               color: "#c9c9c9",
//             }}
//             name="phone"
//             aria-label="tel"
//             defaultCountry="ng"
//             value={phoneNumber}
//             onChange={(value) => setPhoneNumber(value)}
//           />
//         </div>
//         <div className="tech-pro-countrycode">
//           <label>Country Code*</label>
//           <Select
//             options={countryOptions}
//             placeholder="Select"
//             value={
//               formData.countryCode
//                 ? { label: formData.countryCode, value: formData.countryCode }
//                 : null
//             }
//             onChange={handleCode}
//           />
//         </div>
//         <div className="tech-pro-location">
//           <Inputs
//             type="text"
//             name="zipCode"
//             title="Current Location*"
//             value={formData.zipCode}
//             onChange={handleChange}
//             placeholder="Enter your zip code"
//           />
//         </div>
//         <div className="tech-pro-address">
//           <Inputs
//             type="text"
//             name="residentialAddress"
//             title="Residential Address"
//             value={formData.residentialAddress}
//             onChange={handleChange}
//             placeholder="Enter your home address"
//           />
//         </div>
//         <div className="tech-pro-address">
//           <Inputs
//             type="text"
//             name="state"
//             title="State"
//             value={formData.state}
//             onChange={handleChange}
//             placeholder="Enter the state you stay"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }
//
// export default MultiStepForm1;

import React, { useMemo, useEffect, useState } from 'react';
import Inputs from '../../../../../components/accounts/Inputs';
import { PhoneInput } from 'react-international-phone';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios';
import { API_HOST_URL } from '../../../../../utils/api/API_HOST';

function MultiStepForm1({ formData = {}, setFormData, onComplete }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const countryOptions = useMemo(() => {
    return countryList().getData().map((country) => ({
      label: country.label,
      value: country.value,
    }));
  }, []);

  const [formDataCompleted, setFormDataCompleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCode = (selectedOption) => {
    setFormData({
      ...formData,
      countryCode: selectedOption ? selectedOption.value : '',
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loginKey = window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') || window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
        if (!loginKey) {
          console.error('Authentication key not available.');
          return;
        }
        const { authKey } = JSON.parse(loginKey);
        if (!authKey) {
          console.error('Auth key not available.');
          return;
        }

        const response = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
          headers: {
            authorization: authKey,
          },
        });

        const userData = response.data;
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setPhoneNumber(userData.phoneNumber || '');

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const submitForm = () => {
      if (formData.countryCode && formData.zipCode && formData.residentialAddress && !formDataCompleted) {
        setFormDataCompleted(true);
        if (typeof onComplete === 'function') {
          onComplete(formData);
        } else {
          console.error('onComplete is not a function');
        }
      }
    };

    submitForm();
  }, [formData, onComplete, formDataCompleted]);

  return (
      <div>
        <form className="tech-pro-form">
          <div className='rep-fullname'>
            <Inputs
                type='text'
                name="firstName"
                title='First Name*'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
            />
            <Inputs
                type='text'
                name="lastName"
                title='Last Name*'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
            />
          </div>
          <div className="email">
            <Inputs
                type='email'
                name="email"
                title='E-mail Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
            />
          </div>
          <div className="tech-pro-phone">
            <label>Phone Number</label>
            <PhoneInput
                inputStyle={{ backgroundColor: '#ffffff', border: '1px solid #c9c9c9', margin: '0.55rem 0 0 0', padding: '20px 24px', width: '100%', maxWidth: '900px', height: '48px', fontSize: '16px', fontWeight: "400", fontFamily: "Manrope", borderTopRightRadius: '10px', borderBottomRightRadius: '10px', color: "#c9c9c9" }}
                name="phone"
                aria-label="tel"
                defaultCountry="ng"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
            />
          </div>
          <div className="tech-pro-countrycode">
            <label>Country Code*</label>
            <Select
                options={countryOptions}
                placeholder="Select"
                value={formData.countryCode ? { label: formData.countryCode, value: formData.countryCode } : null}
                onChange={handleCode}
            />
          </div>
          <div className="tech-pro-location">
            <Inputs
                type='text'
                name="zipCode"
                title='Current Location*'
                value={formData.zipCode || ''}
                onChange={handleChange}
                placeholder="Enter your State"
            />
          </div>
          <div className="tech-pro-address">
            <Inputs
                type='text'
                name="residentialAddress"
                title='Residential Address'
                value={formData.residentialAddress || ''}
                onChange={handleChange}
                placeholder="Enter your home address"
            />
          </div>
        </form>
      </div>
  );
}

export default MultiStepForm1;


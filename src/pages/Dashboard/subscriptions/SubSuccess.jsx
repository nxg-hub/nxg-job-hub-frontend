import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '..';
import { useSearchParams } from 'react-router-dom';
import { API_HOST_URL } from '../../../utils/api/API_HOST';
import axios from 'axios';
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";

export const SubSuccess = ({ planType }) => {
    const user = useContext(UserContext);
    const [subMessage, setSubMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const verifyTransaction = async () => {
            if (searchParams.has("reference")) {
                const transactionReference = searchParams.get("reference");

                try {
                    const response = await axios.post(`${API_HOST_URL}/api/subscriptions/verify-transaction`, null, {
                        params: { reference: transactionReference },
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    // console.log(response);
                    console.log(response.data.data.status);

                    if (response.data.data.status === "success") {
                        setSubMessage(`subscription is successful!`);
                        setIsSuccess(true)
                        // Delay of 5 seconds before redirecting to the dashboard
                        setTimeout(() => {
                            // Redirect to the dashboard
                            window.location.href = "/dashboard";

                            // Clear query parameters from the URL
                            window.history.replaceState({}, document.title, "/dashboard");
                        }, 5000); // 5000 milliseconds = 5 seconds
                    } else {
                        setSubMessage("There was an issue verifying your subscription. Payment Not Confirmed. Please contact support.");
                        setIsSuccess(false)

                        // Delay of 5 seconds before redirecting to the dashboard
                        setTimeout(() => {
                            // Redirect to the dashboard
                            window.location.href = "/dashboard";

                            // Clear query parameters from the URL
                            window.history.replaceState({}, document.title, "/dashboard");
                        }, 5000); // 5000 milliseconds = 5 seconds
                    }

                    console.log('Transaction verified successfully.', response.data);
                } catch (error) {
                    setSubMessage("Error verifying transaction. Please try again.");
                    console.error('Error verifying transaction:', error.message);
                }
            }
        };

        verifyTransaction().catch(error => {
            console.error('Error in verifyTransaction:', error);
        });
    }, [searchParams]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {isSuccess === null ? (
                <p>Loading...</p> // Show a loading message or spinner while awaiting response
            ) : isSuccess ? (
                <>
                    <div style={{ fontSize: '100px', color: 'green' }}>✔</div>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'green' }}>{subMessage}</p>
                </>
            ) : (
                <>
                    <div style={{ fontSize: '100px', color: 'red' }}>✘</div>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'red' }}>{subMessage}</p>
                </>
            )}
        </div>
    );
};


// import React, { useEffect, useState,  useContext } from 'react';
// import { UserContext } from '..'
// import { useSearchParams } from 'react-router-dom';
// import { API_HOST_URL } from '../../../utils/api/API_HOST';
// import axios from 'axios';
//
// export const SubSuccess = ({ planType }) => {
//     const user = useContext(UserContext);
//
//     const [sub, setSub] = useState("");
//     const [searchParams] = useSearchParams();
//
//     useEffect(() => {
//         if (searchParams.has("reference")) {
//             const subReference = searchParams.get("reference");
//
//             async function verifyCustomer() {
//                 // try {
//                 //     const subscriptionData = { email:user.email,
//                 //       account_number:user.account_number,
//                 //       bvn:user.bvn,
//                 //       bank_code:user.bank_code,
//                 //       customer_code: user.customer_code,
//                 //     };
//                     const form = new FormData(subscriptionData);
//                     form.append("reference", subReference);
//
//                     const response = await axios.post(`${API_HOST_URL}/api/subscriptions/verify-transaction`, form, {
//                         headers: {
//                             "Content-Type": "application/json",
//                         }
//                     });
//
//                     setSub(response.data);
//                     console.log('Customer verified successfully.', response.data);
//                 }
//                 // catch (error) {
//                 //     console.error('Error verifying customer:', error.message);
//                 // }
//             // };
//
//             verifyCustomer();
//         }
//     }, [searchParams, user.firstName, planType]);
//
//     return (
//         <div>{{sub}`${user.firstName} your ${planType} subscription is successful`}</div>
//     );
// }



// import React, { useEffect, useState } from 'react'
// import { useContext } from 'react'
// import { UserContext } from '..'
// import { useSearchParams } from 'react-router-dom';
// import { API_HOST_URL } from '../../../utils/api/API_HOST';
// import axios from 'axios';

// export const SubSuccess = ({planType}) => {
//   const user = useContext(UserContext);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [sub, setSub] = useState("");

//   useEffect(()=>{
//     if(searchParams.has("reference")) {
//       const subReference = searchParams.get("reference")
//       alert(subReference)
//       async function verifyCustomer(){
//         try {
//             const  subscriptionData = { email, account_number, bvn, bank_code, customer_code };
//             const form = new FormData(subscriptionData);
//             form.append("reference", subReference)
//             await axios.post(`${API_HOST_URL}/api/subscriptions/verify-customer`, form,{
//               headers: {
//                 "Content-Type": "application/json",
//               }
//             });
//             setSub(form.data);
//             console.log('Customer verified successfully.', form.data);
//         } catch (error) {
//             console.error('Error verifying customer:', error.message);
//         }
//     };
//     verifyCustomer()
//     }
//   }, [searchParams])

//   return (
//     <div>{sub `${user.firstName} your ${planType}subscription is successful`}</div>
//   )
// }
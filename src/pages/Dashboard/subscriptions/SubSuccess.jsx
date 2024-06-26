import React, { useEffect, useState,  useContext } from 'react';
import { UserContext } from '..'
import { useSearchParams } from 'react-router-dom';
import { API_HOST_URL } from '../../../utils/api/API_HOST';
import axios from 'axios';

export const SubSuccess = ({ planType }) => {
    const user = useContext(UserContext);

    const [sub, setSub] = useState("");
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has("reference")) {
            const subReference = searchParams.get("reference");

            async function verifyCustomer() {
                try {
                    const subscriptionData = { email:user.email, 
                      account_number:user.account_number, 
                      bvn:user.bvn, 
                      bank_code:user.bank_code, 
                      customer_code: user.customer_code,
                    };
                    const form = new FormData(subscriptionData);
                    form.append("reference", subReference);

                    const response = await axios.post(`${API_HOST_URL}/api/subscriptions/verify-customer`, form, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                    setSub(response.data);
                    console.log('Customer verified successfully.', response.data);
                } catch (error) {
                    console.error('Error verifying customer:', error.message);
                }
            };

            verifyCustomer();
        }
    }, [searchParams, user.account_number, user.bvn, user.customer_code, user.bank_code, user.email]);

    return (
        <div>{{sub}`${user.firstName} your ${planType} subscription is successful`}</div>
    );
}



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
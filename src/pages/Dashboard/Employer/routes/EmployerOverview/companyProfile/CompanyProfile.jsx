import React from 'react';
import { FaSquareFull } from 'react-icons/fa';

export default function CompanyProfile() {
  return (
    <div className='company-profil'>
        <h3>Company Profile</h3>
        <div className='company-contents'>
            <p className='company-contents-text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
            </p>
            <button>View Company Website</button>
        </div>
    </div>
  )
};
export const CompanyServices = () => {
    const services = ["Product Service", "Project Management", "Web Development", "DevOp"]
  return (
    <div className='company-services'>
        <h3>Services</h3>
        <div className='service-lists'>
           {services.map((service, index) => (
            <div className='service-list' key={index}>
                <FaSquareFull fontSize={14} style={{color:'#2596BE'}}/>
                <p>
                    {service}
                </p>
            </div>
           ))}
        </div>
    </div>
  )
}

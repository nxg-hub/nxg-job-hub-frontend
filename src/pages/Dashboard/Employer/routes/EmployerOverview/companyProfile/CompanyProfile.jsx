import React, { useEffect, useState } from 'react';
import { FaSquareFull } from 'react-icons/fa';
import axios from 'axios';
import { API_HOST_URL } from '../../../../../../utils/api/API_HOST';
import { Link } from 'react-router-dom';

export default function CompanyProfile() {
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  // const [employerData, setEmployerData] = useState(null);
  const [employerDataLoaded, setEmployerDataLoaded] = useState(false);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const loginKey = window.localStorage.getItem('NXGJOBHUBLOGINKEYV1') || window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
        if (!loginKey) {
          console.error('Authentication key not available.');
          return;
        }
        const { authKey, id } = JSON.parse(loginKey);
        if (!authKey || !id) {
          console.error('Auth key or user id not available.');
          return;
        }

        const response = await axios.get(`${API_HOST_URL}/api/employers/get-employer`, {
          headers: {
            'Content-Type' : 'application/json',
            authorization: authKey,
          },
        });
        const employerData = response.data;
        
        setCompanyDescription(employerData.companyDescription || "");
        setCompanyWebsite(employerData.companyWebsite || "");
        setEmployerDataLoaded(true);
      } catch (error) {
        console.error('Error fetching talent data:', error);
      }
    };
    fetchEmployerData();
  }, []);

  return (
    <div className='company-profil'>
      <h3>Company Profile</h3>
      {employerDataLoaded ? (
        <>
          {companyDescription ? (
            <div className='company-contents'>
              <p className="company-contents-text">{companyDescription}</p>
              <Link to={companyWebsite}>View Company Website</Link>
            </div>
          ) : (
            <div className='company-contents'>
              <p className='company-contents-text'>
                Try <strong>Completing and Updating Your Profile</strong> to ensure having your company profile here.
              </p>
              <Link to="/employerprofile">Complete Your Profile</Link>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export const CompanyServices = () => {
  const services = ["Product Service", "Project Management", "Web Development", "DevOp"];
  return (
    <div className='company-services'>
      <h3>Services</h3>
      <div className='service-lists'>
        {services.map((service, index) => (
          <div className='service-list' key={index}>
            <FaSquareFull fontSize={14} style={{ color:'#2596BE' }}/>
            <p>{service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
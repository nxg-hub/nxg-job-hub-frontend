import React, { createContext, useContext, useState } from 'react';

const VerificationContext = createContext();

export const VerificationProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(() => {
    // Check if there is a stored value in local storage
    const storedStatus = window.localStorage.getItem('verificationStatus') || window.sessionStorage.getItem('verificationStatus');
    return storedStatus ? JSON.parse(storedStatus) : false;
  });

  const setVerificationStatus = (status) => {
    setIsVerified(status);
    // Store the status in local storage
    localStorage.setItem('verificationStatus', JSON.stringify(status));
  };

  return (
    <VerificationContext.Provider value={{ isVerified, setVerificationStatus }}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};

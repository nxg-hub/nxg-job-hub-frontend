import React from 'react'
import Statistics from './statistics/Statistics'
import CompanyProfile, { CompanyServices } from './companyProfile/CompanyProfile'

const EmployerOverview = () => {
  return (
    <div>
      EmployerOverview
      <div className="employer-stats">
        <Statistics />
        <CompanyProfile />
        <CompanyServices />
      </div>
    </div>
  )
}

export default EmployerOverview
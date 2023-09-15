import React from 'react'
import ProfileForm from '../components/accounts/ProfileForm'
import JobForm from '../components/accounts/JobForm'

export const TechTalent = () => {
  return (
    <main className='tech-main-container'>
        <h1>Create Account As A Tech Talent</h1>
        <form>
            <ProfileForm />
            <JobForm />
        </form>
        
    </main>
  )
}

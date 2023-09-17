import React from 'react'
import { Link } from 'react-router-dom'
import ProfileForm from '../components/accounts/ProfileForm'
import JobForm from '../components/accounts/JobForm'
import { JobForms } from '../components/accounts/JobForms'

export const TechTalent = () => {
  return (
    <main className='tech-main-container'>
        <h1>Create Account As A Tech Talent</h1>
        <form>
            <div className="forms">
              <ProfileForm />
              <JobForm />
              <JobForms />
            </div>
            <div className="terms" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <input type="checkbox" />
              <label style={{fontSize:'.8rem', marginLeft:'.4rem'}}>By clicking on this box, you agree to accept our <b>Terms and Conditions</b></label>
            </div>
            <button style={{background:'blue', color:'#fafafa', border:'none', 
              padding:'.6rem', width:'30%', fontSize:'1rem', 
              fontWeight:'600', borderRadius:'.37rem', cursor:'pointer', margin:'.6rem 0'}}>
                Register As a Tech-Talent
              </button>
            <p 
              style={{textAlign:'center', fontSize: '.9rem'}}>
                Already have an account? <Link to="/register/employer" style={{color:'blue', fontWeight:'700'}}>Login</Link>
            </p>
        </form>
        
    </main>
  )
}

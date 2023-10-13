import React from 'react'
import './footer.scss'

const Footer = () => {
  return (
    <div style={{position:"relative"}}>
      <div className="first-dash-bg"></div>
      <div className="news-letter">
        <div className="news-content">
          <h5>Subscribe To Our Newsletter</h5>
          <p>Subscribe to get job notifications and other useful updates  in your inbox.</p>
        </div>
        <form>
          <input type="email" name="email" id="email" placeholder='Email address' />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="first-dash-bg second-dash"></div>
      <div className='footer-main-container'>
          
          
      </div>
    </div>
  )
}

export default Footer
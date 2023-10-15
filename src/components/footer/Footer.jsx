import React from 'react'
import './footer.scss'
import { NavLink, Link } from 'react-router-dom'
import { BiLogoFacebook, BiLogoGoogle, BiLogoLinkedin, BiLogoTwitter,  } from 'react-icons/bi'
import { TiSocialInstagram } from 'react-icons/ti'

const Footer = () => {
  const CompanyFooterLinks = [
    { title: "About us", href: "/about" },
    { title: "Our services", href: "/services" },
    { title: "Privacy policy", href: "/privacy" },
    { title: "Terms and conditions", href: "/terms" },
    { title: "Our alliances", href: "/terms" }
  ];
  const HelpFooterLinks = [
    { title: "FAQs", href: "/faqs" },
    { title: "Send us a message", href: "/footmessage" }
  ];
  const QuickFooterLinks = [
    { title: "Get started", href: "/register" },
    { title: "Post a job", href: "/jobpost" },
    { title: "Find a job", href: "/findjob" }
  ];

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
        <div className="footer-contents">
          <div className="footer-nav-section">
            <div className="company">
              <h6>Company</h6>
              <div className="foot-links">
              {CompanyFooterLinks.map((companylink) => {
                  return (
                    <NavLink
                      key={companylink.title}
                      to={companylink.href}
                    >
                      {companylink.title}
                    </NavLink>
                  )
                })}
              </div>
            </div>
            <div className="get-help">
              <h6>Get Help</h6>
              <div className="foot-links">
              {HelpFooterLinks.map((helplink) => {
                  return (
                    <NavLink
                      key={helplink.title}
                      to={helplink.href}
                    >
                      {helplink.title}
                    </NavLink>
                  )
                })}
              </div>
            </div>
            <div className="quick-links">
              <h6>Quick Links</h6>
              <div className="foot-links">
              {QuickFooterLinks.map((quicklink) => {
                  return (
                    <NavLink
                      key={quicklink.title}
                      to={quicklink.href}
                    >
                      {quicklink.title}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="footer-social-acct">
            <h6>Follow us</h6>
            <div className="media-handles">
              <div className="facebk">
                <Link>
                  <BiLogoFacebook style={{width:"1.1rem", height:"1.1rem", color:"#2596be", marginTop:".3rem"}}/>
                </Link>
              </div>
              <div className="google">
                <Link>
                  <BiLogoGoogle style={{width:"1.1rem", height:"1.1rem", color:"#2596be", marginTop:".3rem"}}/>
                </Link>
              </div>
              <div className="linkedin">
                <Link>
                  <BiLogoLinkedin style={{width:"1.1rem", height:"1.1rem", color:"#2596be", marginTop:".2rem"}}/>
                </Link>
              </div>
              <div className="twit">
                <Link>
                  <BiLogoTwitter style={{width:"1.1rem", height:"1.1rem", color:"#2596be", marginTop:".3rem"}}/>
                </Link>
              </div>
              <div className="insta">
                <Link>
                  <TiSocialInstagram style={{width:"1.1rem", height:"1.1rem", color:"#2596be", marginTop:".3rem"}}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
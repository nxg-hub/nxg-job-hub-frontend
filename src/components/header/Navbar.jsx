import React from 'react'
import { NavLink } from 'react-router-dom';
import '../header/header.scss';

// const LOGIN = "Log In"
// const SIGNUP = "Sign Up"

const Navbar = () => {
    const NavLinks = [
        {title:"Home", href:"/"},
        {title:"Services", href:"/services"},
        {title:"About", href:"/about"},
        {title:"Contact Us", href:"/contact"},
        // {title:"Log In", href:"/logtalent"}, //Will change this route to join our community of professionals page which will later be linked to different login pages
        // {title:"Sign Up", href:"/techtalent"} //Will change this route to join our community of professionals page which will later be linked to different sign up pages
    ];

  return (
    <div className='navbar'>
        {NavLinks.map((link) => {
           return (
                <NavLink
                    key={link.title}
                    to={link.href}
                    className={({isActive}) => 
                        [
                            isActive ? "active" : "plain",
                           
                        ].join(" ")
                    }
                >
                    {link.title}
                </NavLink>
           )
        })}
        
    </div>
  )
}

export default Navbar
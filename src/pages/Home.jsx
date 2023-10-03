import React from 'react'
import { NavLink } from 'react-router-dom'


const Home = () => {
  return (
    <div>Home
      <hr />
      <h3>Available routes:</h3>
      <NavLink to={"/register"}>
        Create Account
      </NavLink> <br />
      <NavLink to={"/login"}>
        Sign In
      </NavLink>
    </div>
  )
}

export default Home
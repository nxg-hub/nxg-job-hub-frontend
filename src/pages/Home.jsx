import React from 'react'
import { NavLink } from 'react-router-dom'


const Home = () => {
  return (
    <div>Home
      <hr />
      <h3>Available routes:</h3>
      <NavLink to={"/register"}>
        Create Account
      </NavLink>
    </div>
  )
}

export default Home
import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h2>Available routes</h2>
      <NavLink to="./employer">Login As Employer</NavLink>
    </div>
  )
}

export default Login
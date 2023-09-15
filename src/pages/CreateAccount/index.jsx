import React from "react";
import { NavLink } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div>
      Create Account
      <hr />
      <h3>Available routes:</h3>
      <NavLink to={"employer"}>As Employer</NavLink>

    </div>
  );
};

export default CreateAccount;

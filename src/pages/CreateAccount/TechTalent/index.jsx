import React from "react";
import ProfileForm from "./ProfileForm";
import JobForm from "./JobForm";

const TechTalent = () => {
  return (
    <main className="tech-main-container">
      <h1>Create Account As A Tech Talent</h1>
      <form>
        <ProfileForm />
        <JobForm />
      </form>
    </main>
  );
};
export default TechTalent;

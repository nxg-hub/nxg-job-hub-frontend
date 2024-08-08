import React from "react";
import SaveJob from "../../../../static/icons/carbon_bookmark.svg?react";
// import g from "../../../../static"/

const saveBtn = ({ jobID }) => {
  const saveJob = () => {
    console.log(jobID);
  };
  return (
    <p className="float-right" onClick={saveJob}>
      <SaveJob title="Save job" />
    </p>
  );
};

export default saveBtn;

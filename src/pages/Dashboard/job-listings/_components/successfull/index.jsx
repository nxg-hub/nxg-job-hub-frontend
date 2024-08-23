import React from "react";

const Successfull = ({ onClose }) => {
  return (
    <div className="bg-white z-30 absolute top-[150px] left-[10%] md:left-[15%] w-[80%] md:w-[60%] m-auto  rounded-[24px] text-base font-medium px-10 py-5">
      <div className="flex items-center gap-y-3 text-center justify-center flex-col">
        <div className="flex items-center gap-x-1">
          <span className="text-xl">Job application was successful</span>
        </div>
        <span>
          You can track your application status in the{" "}
          <span className="text-lg font-semibold">“My Applications”</span>
        </span>
        <span>Check your email for more details about your application</span>
        <button
          className="w-1/2 py-2  bg-[#2596BE] text-white"
          onClick={onClose}>
          Go to email
        </button>
      </div>
    </div>
  );
};

export default Successfull;

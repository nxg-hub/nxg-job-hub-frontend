import React from "react";
import { useDispatch } from "react-redux";
import { closeErrorModal } from "../../../../redux/TalentApplicationSlice";

const AppErrorMessage = ({ onClose }) => {
  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeErrorModal());
  };
  return (
    <div
      className={` bg-white z-30 absolute top-[150px] left-[15%] md:left-[25%] w-[80%] md:w-[60%] m-auto  rounded-[24px] text-base font-medium px-10 py-5`}>
      <div className="flex items-center gap-y-3 text-center justify-center flex-col">
        <div className="flex items-center gap-x-1">
          <span className="text-xl">Ooops!!, Something went wrong!!</span>
        </div>
        <span>
          Make sure you have updated your skills on your profile page,<br></br>
          Check internet connection and try again.
          <br />
          {/* If you have done the above task, please kindly check back while we
          verify you. */}
          {/* <span className="text-lg font-semibold">“My Applications”</span> */}
        </span>
        <button
          onClick={onClose}
          className="w-1/2 py-2  bg-[#2596BE] text-white">
          Close
        </button>
      </div>
    </div>
  );
};

export default AppErrorMessage;

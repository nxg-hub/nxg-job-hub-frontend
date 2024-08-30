import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeErrorModal } from "../../../../redux/TalentApplicationSlice";

const AppErrorMessage = ({ onClose }) => {
  const multiApp = useSelector(
    (state) => state.TalentApplicationSlice.multiApp
  );
  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeErrorModal());
  };
  return (
    <div
      className={` bg-white z-30 absolute top-[150px] left-[15%] md:left-[25%] w-[80%] md:w-[60%] m-auto  rounded-[24px] text-base font-medium px-10 py-5`}>
      <div className="flex items-center gap-y-3 text-center justify-center flex-col">
        {!multiApp && (
          <>
            <div className="flex items-center gap-x-1">
              <span className="text-xl">Ooops!!, Something went wrong!!</span>
            </div>
            <span>
              Make sure you have updated your skills on your profile page,
              <br></br>
              Check internet connection and try again.
              <br />
            </span>
          </>
        )}
        {multiApp ===
          "You have already applied to this job. Multiple applications are not allowed." && (
          <div className="flex items-center gap-x-1">
            <span className="text-xl">
              You have already applied to this job. Multiple applications are
              not allowed.
            </span>
          </div>
        )}
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

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PostJobModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSignup = () => {
    // Logic to redirect to the signup page
    navigate("/register");
    handleClose();
  };

  const handleOneOffPosting = () => {
    // Logic to proceed with one-off job posting
    handleClose();
  };

  return (
    <div>
      {/* <button
        className="bg-blue-500 text-white px-4 py-2 rounded md:px-6 md:py-3"
        onClick={handleOpen}>
        Post a Job
      </button> */}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 md:p-8 w-11/12 md:w-96">
            <h2 className="text-lg font-bold mb-2 text-center">
              Enjoy 1 Month Unlimited Free Job Posting!
            </h2>
            <p className="mb-4 text-center">
              Sign up now to enjoy unlimited job postings for one month, or you
              can proceed with a one-off job posting for N5,000.
            </p>
            <div className="flex flex-col md:flex-row justify-center md:justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2"
                onClick={handleSignup}>
                Sign Up Now
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleOneOffPosting}>
                Proceed with One-Off Posting
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={handleClose}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJobModal;

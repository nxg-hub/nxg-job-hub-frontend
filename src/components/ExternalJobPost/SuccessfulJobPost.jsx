import React from "react";
import Header from "../header/Header";
import success from "../../static/images/sucess.png";

const SuccessfulJobPost = () => {
  return (
    <>
      {/* Header */}
      <div className="bg-[#2B749A]">
        <Header />
      </div>

      {/* Main Content */}
      <div className="mt-12 mb-12">
        <article className="w-[90%] md:w-[60%] lg:w-[50%] mx-auto text-center border rounded-2xl shadow-lg p-8 md:p-12 bg-white">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#2B749A] mb-6">
            Job Post Successful
          </h2>

          {/* Success Image */}
          <img
            className="mx-auto mb-6 md:mb-8 w-32 md:w-40"
            src={success}
            alt="Success"
          />

          {/* Message */}
          <p className="text-md md:text-lg mb-4">
            Congratulations, your job post was{" "}
            <span className="font-bold text-green-700">Successful</span>.
          </p>

          {/* Info Text */}
          <div className="text-sm md:text-base text-gray-700 space-y-3">
            <p>
              Thank you for submitting your job posting! All posted jobs will be
              reviewed by our admin team. Once accepted, they will be visible to
              potential candidates.
            </p>
            <p>
              We appreciate your patience during this process, and we’ll keep
              you updated on the status of your submissions. If you have any
              questions, feel free to reach out.
            </p>
          </div>
        </article>
      </div>
    </>
  );
};

export default SuccessfulJobPost;

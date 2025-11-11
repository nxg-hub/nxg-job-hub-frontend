import React from "react";
import Header from "../header/Header";
import success from "../../static/images/sucess.png";

const SuccessfulJobPost = () => {
  return (
    <>
      <div className="bg-black">
        <Header />
      </div>
      <div className="mt-11 b ">
        <article className="w-[80%] m-auto text-center  border-2  md:h-[500px] rounded-lg shadow-xl shadow-gray pt-10 mb-4">
          <h2 className="capitalize md:text-lg text-secondary font-bold">
            Job Post Successful
          </h2>
          <img className="m-auto mt-5" src={success} alt="congrats-img" />
          <div className="w-f[90%] m-auto">
            <p className="mt-11 md:text-md">
              Congratulations, your Job Post was
              <span className="font-bold text-[#1e7a1e]"> Successful.</span>
            </p>
            <div className="w-[90%] m-auto pb-5 md:text-md">
              <p>
                Thank you for submitting your job postings! We want to inform
                you that all posted jobs will be reviewed by our admin team.
                Once the postings are accepted, they will be made visible to
                potential candidates. We appreciate your patience during this
                process, and we’ll keep you updated on the status of your
                submissions. If you have any questions, feel free to reach out.
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default SuccessfulJobPost;

import React from "react";

const ObjectiveCard = ({ num, title, content }) => {
  return (
    <div
      className="
        bg-gray-200 w-full m-auto p-6 rounded-2xl my-4
        text-left shadow-sm
        hover:shadow-xl hover:-translate-y-1 
        transition-all duration-300 
        sm:w-[80%] md:w-[300px] lg:w-full
      ">
      {/* Number */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#006A90]">
        {num}
      </h1>

      {/* Title */}
      <h2 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug">
        {title}
      </h2>

      {/* Content */}
      <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default ObjectiveCard;

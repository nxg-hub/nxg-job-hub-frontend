import React from "react";

const ObjectiveCard = ({ num, title, content }) => {
  return (
    <div className="bg-[#D9D9D9] w-[100%] m-auto text-justify p-5 rounded-2xl  my-2 sm:w-[80%] md:w-[300px] md:h-[500px] lg:w-[100%]  xl:h-[400px] ">
      <h1 className="text-[30px] sm:text-[40px] lg:text-[60px] text-[#006A90] font-extrabold">
        {num}
      </h1>
      <h2 className="font-extrabold sm:text-xl lg:text-2xl mb-3">{title}</h2>
      <p className="sm:text-xl lg:text-xl tracking-tight">{content}</p>
    </div>
  );
};

export default ObjectiveCard;

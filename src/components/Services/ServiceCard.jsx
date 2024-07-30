import React, { useState } from "react";

const ServiceCard = ({
  img,
  title,
  content,
  extraContent1,
  extraContent2,
  extraContent3,
}) => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(() => !visible);
  };
  return (
    <div className="w-full md:w-[40%] shadow-xl my-5  rounded-md pb-6 hover:scale-105 transition-all duration-300">
      <img
        className="w-[100px] h-[100px] md:h-[150px] md:w-[150px] m-auto"
        src={img}
        alt="logo"
      />
      <article className="text-center w-[80%] m-auto space-y-3 mt-3 text-sm md:text-xl">
        <h2 className="font-extrabold">{title}</h2>
        <p>{content}</p>
        <div
          className={`${
            !visible ? "hidden" : "block"
          } w-full text-justify mt-3 space-y-4 `}>
          <div>
            <span className="pr-2">&#8226;</span>
            <span>{extraContent1}</span>
          </div>
          <div>
            <span className="pr-2">&#8226;</span>
            <span>{extraContent2}</span>
          </div>
          <div>
            <span className="pr-2">&#8226;</span>
            <span>{extraContent3}</span>
          </div>
        </div>
      </article>
      <button
        onClick={handleClick}
        className="float-right mr-5 text-blue-800 underline text-sm ">
        {!visible ? "See More" : "See Less"}
      </button>
    </div>
  );
};

export default ServiceCard;

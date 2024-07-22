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
    <div className="w-full md:w-[40%] shadow-xl my-5  rounded-md pb-6">
      <img
        className="w-[100px] h-[100px] md:h-[150px] md:w-[150px] m-auto"
        src={img}
        alt="logo"
      />
      <article className="text-center w-[80%] m-auto space-y-3 mt-3 text-sm md:text-[20px]">
        <h2 className="font-extrabold">{title}</h2>
        <p>{content}</p>
        <div
          className={`${
            !visible ? "hidden" : "block"
          } w-full text-justify mt-3 space-y-4`}>
          <p>*{extraContent1}</p>
          <p>*{extraContent2}</p>
          <p>*{extraContent3}</p>
        </div>
      </article>
      <button
        onClick={handleClick}
        className="float-right mr-5 text-blue-800 underline ">
        {!visible ? "See More" : "See Less"}
      </button>
    </div>
  );
};

export default ServiceCard;

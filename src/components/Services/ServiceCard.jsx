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

  return (
    <div
      className="
      w-full md:w-[40%] bg-white rounded-xl shadow-lg p-6 
      hover:shadow-2xl hover:-translate-y-1 
      transition-all duration-300 border border-gray-100
    ">
      {/* Image */}
      <div className="flex justify-center">
        <img
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
          src={img}
          alt="service icon"
        />
      </div>

      {/* Text Area */}
      <article className="text-center mt-5 space-y-3">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {content}
        </p>

        {/* Expandable Content */}
        <div
          className={`
            overflow-hidden transition-all duration-300 
            ${visible ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"}
          `}>
          <ul className="mt-4 text-left space-y-3 text-gray-600 text-sm md:text-base">
            {[extraContent1, extraContent2, extraContent3].map(
              (item, i) =>
                item && (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 text-lg">&#8226;</span>
                    <span>{item}</span>
                  </li>
                )
            )}
          </ul>
        </div>
      </article>

      {/* Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setVisible(!visible)}
          className="text-blue-700 font-medium text-sm ">
          {visible ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

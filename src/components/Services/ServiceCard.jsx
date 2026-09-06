import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiChevronDown } from "react-icons/fi";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ServiceCard = ({
  img,
  title,
  content,
  extraContent1,
  extraContent2,
  extraContent3,
}) => {
  const [visible, setVisible] = useState(false);
  const features = [extraContent1, extraContent2, extraContent3].filter(
    Boolean
  );

  return (
    <motion.div
      variants={itemVariants}
      className="group w-full h-full bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 p-6 flex flex-col">
      {/* Icon */}
      <div className="w-16 h-16 rounded-xl bg-[#f0f9ff] border-[#e0f2fe] flex items-center justify-center mb-5 group-hover:bg-[#e0f2fe] transition-colors">
        <img
          className="w-10 h-10 object-contain"
          src={img}
          alt={`${title} icon`}
        />
      </div>

      {/* Text */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{content}</p>

      {/* Feature checklist - expandable */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          visible
            ? "max-h-[400px] opacity-100 mt-5 pt-5 border-t border-gray-100"
            : "max-h-0 opacity-0"
        }`}>
        <ul className="space-y-3">
          {features.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="w-5 h-5 rounded-full bg-[#f0f9ff] flex items-center justify-center shrink-0 mt-px">
                <FiCheck className="w-3 h-3 text-[#0284c7]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* See More toggle */}
      <button
        onClick={() => setVisible(!visible)}
        className="mt-auto pt-5 self-start inline-flex items-center gap-1.5 text-[#0284c7] hover:text-[#1d7a9c] font-semibold text-sm transition-colors">
        {visible ? "See Less" : "See More"}
        <FiChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            visible ? "rotate-180" : ""
          }`}
        />
      </button>
    </motion.div>
  );
};

export default ServiceCard;

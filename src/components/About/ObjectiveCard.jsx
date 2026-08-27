import React from "react";
import { motion } from "framer-motion";

const ObjectiveCard = ({ num, title, content, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative w-full bg-white p-6 md:p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-sky-200 transition-all duration-300 overflow-hidden">
      {/* Number watermark */}
      <span className="absolute -top-3 right-4 text-6xl font-extrabold text-sky-50 group-hover:text-sky-100 select-none transition-colors">
        {num}
      </span>

      {/* Icon */}
      {Icon && (
        <span className="relative inline-flex w-12 h-12 rounded-xl bg-gradient-to-tr from-[#215E7D] to-[#2B749A] text-white items-center justify-center shadow-md shadow-sky-500/20 mb-5">
          <Icon className="w-5 h-5" />
        </span>
      )}

      <h3 className="relative text-lg md:text-xl font-bold text-gray-800 leading-snug mb-3">
        {title}
      </h3>

      <p className="relative text-sm text-gray-600 leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
};

export default ObjectiveCard;

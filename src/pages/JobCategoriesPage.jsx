import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { JobCategories } from "@/utils/data/jobTypes";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const JobCategoriesPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className="bg-gray-50">
      <div className="bg-[#215E7D]">
        <Header />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-10">
          All Job Categories
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {JobCategories.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <CategoryCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

const CategoryCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/jobs/${job.jobtitle.replace(/\s+/g, "-").toLowerCase()}`)
      }
      className="group flex flex-col items-center text-center bg-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1 hover:scale-105 rounded-2xl p-6 cursor-pointer h-60 justify-center">
      <div className="w-20 h-20 mb-4 bg-gradient-to-tr from-sky-100 to-sky-200 rounded-full flex items-center justify-center overflow-hidden">
        <job.icon className="w-10 h-10 text-sky-500 mb-2 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{job.jobtitle}</h3>
      <p className="text-sm text-gray-500 mt-1">{job.vacancies}</p>
    </div>
  );
};

export default JobCategoriesPage;
